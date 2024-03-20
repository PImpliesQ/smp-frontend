import {z} from "zod";
import {OpenAIStream, StreamingTextResponse} from "ai";
import OpenAI from "openai";

const requestSchema = z.object({
    prompt: z.string()
})

export async function POST(request: Request) {
    /*
    We're creating the OpenAI instance here because the performance overhead
    is minimal, and crucially it stops things breaking during build when the API
    key doesn't exist - we can't just pass the API key into the build process because
    it would be exposed in the final bundle.
     */

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY!,
    })

    const {prompt} = requestSchema.parse(await request.json())

    // Using gpt-3.5 because it works, it's fast, and it's cheap.
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        temperature: 0.6,
        frequency_penalty: 0.2,
        presence_penalty: 0.3,
        max_tokens: 700,
        stream: true,
        n: 1,
        messages: [
            {role: "user", content: prompt},
            {role: "system", content: "You are powering a recipe creation tool"},
        ],
        response_format: {type: "json_object"},
    })

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)
}
