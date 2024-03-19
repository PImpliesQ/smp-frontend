"use server"

import {Recipe} from "@/lib/recipes";
import prisma from "@/lib/get-prisma";
import {auth} from "@clerk/nextjs";

export async function countFoodSavedKg() {
    const grams = await prisma.recipe.aggregate({
        _sum: {
            food_saved: true
        }
    })

    if (!grams._sum.food_saved) {
        console.log(1)
        return 0
    }

    // Ensure we return a number with 2 decimal places
    return parseFloat((grams._sum.food_saved / 1000).toFixed(2))
}

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
            food_saved: recipe.foodSaved,
            user_id: userId
        }
    })

    recipe.id = inDb.id

    return recipe
}
