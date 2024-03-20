"use server"

import {clerkClient} from "@clerk/nextjs";
import {getRecipes} from "@/lib/recipes";

export type LeaderboardEntry = {
    position: number
    username: string
    score: number
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

    // Function to get the username for a user ID
    async function getUsername(userId: string) {
        try {
            const user = await clerkClient.users.getUser(userId)
            return user.username ?? "Unknown"
        } catch (e) {
            return "Unknown"
        }
    }

    // Construct the leaderboard entries
    const leaderboard: LeaderboardEntry[] = []
    for (let i = 0; i < sortedScores.length; i++) {
        const [userId, score] = sortedScores[i]
        leaderboard.push({
            position: i + 1,
            username: await getUsername(userId),
            score
        })
    }

    return leaderboard
}
