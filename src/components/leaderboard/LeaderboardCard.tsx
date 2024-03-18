"use client"

import {LeaderboardEntry} from "@/lib/leaderboard";
import {cn} from "@/lib/utils";

export async function LeaderboardCard(props: {
    entry: LeaderboardEntry
}) {
    const {
        entry
    } = props


    return (
        <div className={cn("bg-white shadow overflow-hidden sm:rounded-lg", {
                "bg-green-400": entry.position === 1,
                "bg-yellow-400": entry.position === 2,
            }
        )}>
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {entry.position}. {entry.username}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {(entry.score / 1000).toFixed(2)} kg saved
                </p>
            </div>
        </div>
    )
}
