import {z} from "zod";
import {OpenAIStream, StreamingTextResponse} from "ai";
import OpenAI from "openai";
import prisma from "@/lib/get-prisma";
import {getRecipeById, Recipe} from "@/lib/recipes";
import {auth} from "@clerk/nextjs";

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
    const {userId} = auth()

    if (!userId) {
        throw new Error("Not authenticated")
    }

    const json = await request.json()

    const recipe = await json.recipe as Recipe

    if (!recipe) {
        throw new Error("No recipe provided")
    }

    const inDb = await prisma.recipe.create({
        data: {
            name: recipe.title,
            description: recipe.description,
            ingredients: recipe.ingredients,
            steps: recipe.steps,
            people: recipe.people,
            diet: recipe.dietaryRestrictions,
            food_saved: recipe.foodSaved,
            user_id: userId
        }
    })

    recipe.id = inDb.id

    return Response.json({
        recipe
    })
}
