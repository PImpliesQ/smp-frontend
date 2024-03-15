"use server"

import {Recipe} from "@/lib/recipes";
import prisma from "@/lib/get-prisma";
import {auth} from "@clerk/nextjs";

export async function postRecipe(recipe: Recipe): Promise<Recipe> {
    const {userId} = auth()

    if (!userId) {
        throw new Error("Not authenticated")
    }

    const inDb = await prisma.recipe.create({
        data: {
            name: recipe.title,
            description: recipe.description,
            ingredients: recipe.ingredients,
            steps: recipe.steps,
            people: recipe.people,
            diet: recipe.dietaryRestrictions,
            foodSaved: recipe.foodSaved,
            userId: userId
        }
    })

    recipe.id = inDb.id

    return recipe
}
