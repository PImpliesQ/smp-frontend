"use server"

import prisma from "@/lib/get-prisma";
import {clerkClient} from "@clerk/nextjs";

export type LeaderboardEntry = {
    position: number
    username: string
    score: number
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
    const entries = await prisma.recipe.aggregate({
        _sum: {
            foodSaved: true
        },
        _count: true
    })

    if (!entries._sum.foodSaved) {
        return []
    }

    const leaderboard = await prisma.recipe.groupBy({
        by: ["userId"],
        _sum: {
            foodSaved: true
        },
    })

    const mapped = leaderboard.map(e => {
        return {
            userId: e.userId,
            foodSaved: e._sum.foodSaved!
        }
    })

    async function mapEntryToLeaderboardEntry(entry: {
        userId: string
        foodSaved: number
    }, index: number) {
        let username = ""
        try {
            username = (await clerkClient.users.getUser(entry.userId)).username ?? "Unknown"
        } catch (e) {
            console.error(e)
        }

        return {
            position: index + 1,
            username: username,
            score: entry.foodSaved
        }
    }

    return Promise.all(mapped.map(mapEntryToLeaderboardEntry))
}
