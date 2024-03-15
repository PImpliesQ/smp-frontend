"use server"

import prisma from "@/lib/get-prisma";

export async function countUsers() {
    const users = await prisma.recipe.findMany({
        distinct: ['userId']
    })

    return users.length
}
