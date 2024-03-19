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
            food_saved: true
        },
        _count: true
    })

    if (!entries._sum.food_saved) {
        return []
    }

    const leaderboard = await prisma.recipe.groupBy({
        by: ["user_id"],
        _sum: {
            food_saved: true
        },
    })

    const mapped = leaderboard.map(e => {
        return {
            userId: e.user_id,
            foodSaved: e._sum.food_saved!
        }
    }).sort((a, b) => b.foodSaved - a.foodSaved)

    async function mapEntryToLeaderboardEntry(entry: {
        userId: string
        foodSaved: number
    }, index: number) {
        let username = "Unknown"
        try {
            const clerkUser = await clerkClient.users.getUser(entry.userId)

            username = clerkUser.username ?? "Unknown"
        } catch (e) {
            // Ignore, this is due to test users or deleted users
        }

        return {
            position: index + 1,
            username: username,
            score: entry.foodSaved
        }
    }

    return Promise.all(mapped.map(mapEntryToLeaderboardEntry))
}
