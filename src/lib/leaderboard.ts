"use server"

import {clerkClient} from "@clerk/nextjs";
import {getRecipes} from "@/lib/recipes";

export type LeaderboardEntry = {
    position: number
    score: number
} & UserInfo

type UserInfo = {
    username: string
    accommodation: string
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
    const recipes = await getRecipes()

    // Construct a map of user IDs to the total food saved
    const userScores = new Map<string, number>()
    for (const recipe of recipes) {
        const currentScore = userScores.get(recipe.userId) ?? 0
        userScores.set(recipe.userId, currentScore + recipe.foodSaved)
    }

    // Sort the user scores in descending order
    const sortedScores = Array.from(userScores.entries())
        .sort((a, b) => b[1] - a[1])

    // Function to get the user info for a user ID
    async function getUserInfo(userId: string): Promise<UserInfo> {
        try {
            const user = await clerkClient.users.getUser(userId)
            return {
                username: user.username ?? "No username",
                accommodation: (user.publicMetadata as any).accommodation ?? "No accommodation"
            }
        } catch (e) {
            return {
                username: "Unknown user",
                accommodation: "Unknown accommodation"
            }
        }
    }

    // Construct the leaderboard entries
    const leaderboardPromises: Promise<LeaderboardEntry>[] = sortedScores.map(async ([userId, score], i) => {
        const info = await getUserInfo(userId)
        return {
            position: i + 1,
            score,
            ...info
        }
    })

    const leaderboard: LeaderboardEntry[] = await Promise.all(leaderboardPromises)

    return leaderboard.sort((a, b) => a.position - b.position)
}
