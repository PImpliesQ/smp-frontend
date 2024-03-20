"use server"

import {getRecipes} from "@/lib/recipes";

export async function countUsers() {
    const recipes = await getRecipes()

    const userIds = recipes.map(r => r.userId)

    return new Set(userIds).size
}
