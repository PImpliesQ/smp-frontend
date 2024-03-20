"use server"

import {getRecipes} from "@/lib/recipes";

export async function countFoodSavedKg() {
    const recipes = await getRecipes()

    const kgs = recipes.reduce((acc, recipe) => acc + recipe.foodSaved, 0) / 1000
    return parseFloat(kgs.toFixed(2))
}
