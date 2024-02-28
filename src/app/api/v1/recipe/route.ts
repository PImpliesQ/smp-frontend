import OpenAI from "openai";
import {z} from "zod";
import {OpenAIStream, StreamingTextResponse} from "ai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
})

const requestSchema = z.object({
    prompt: z.string()
})

export async function POST(request: Request) {
    const { prompt } = requestSchema.parse(await request.json())

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        temperature: 0.6,
        frequency_penalty: 0.2,
        presence_penalty: 0.3,
        max_tokens: 700,
        stream: true,
        n: 1,
        messages: [
            { role: "user", content: prompt },
            { role: "system", content: "You are powering a recipe creation tool" },
        ],
        response_format: { type: "json_object" },
    })

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)
}
