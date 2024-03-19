import {z} from "zod";
import {OpenAIStream, StreamingTextResponse} from "ai";
import OpenAI from "openai";
import prisma from "@/lib/get-prisma";
import {getRecipeById, Recipe} from "@/lib/recipes";

const requestSchema = z.object({
    prompt: z.string()
})

export async function GET(request: Request) {
    const ids = await prisma.recipe.findMany({
        select: {
            id: true
        }
    })

    const recipes = await Promise.all(ids.map(async (id) => {
        return await getRecipeById(id.id)
    }))

    const filtered = recipes.filter((recipe) => recipe !== null) as Recipe[]

    return Response.json({
        recipes: filtered
    })
}

export async function POST(request: Request) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY!,
    })

    const {prompt} = requestSchema.parse(await request.json())

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
