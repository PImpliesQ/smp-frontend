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
        <div className={cn("bg-white ease-in-out duration-150 border shadow-sm hover:shadow-md hover:-translate-y-0.5",
            "overflow-hidden sm:rounded-lg", {
                "bg-green-400/75": entry.position === 1,
                "bg-yellow-400/75": entry.position === 2,
            }
        )}>
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {entry.position}. {entry.username}
                </h3>
                <h3 className="text-md leading-6 text-gray-700">
                    {entry.accommodation}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {(entry.score / 1000).toFixed(2)} kg saved
                </p>
            </div>
        </div>
    )
}
