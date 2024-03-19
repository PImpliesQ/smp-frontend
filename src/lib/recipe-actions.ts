"use server"

import prisma from "@/lib/get-prisma";

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
