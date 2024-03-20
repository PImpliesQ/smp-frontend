import FadeIn from "@/components/FadeIn";
import {LeaderboardEntry} from "@/lib/leaderboard";
import {LeaderboardCard} from "@/components/leaderboard/LeaderboardCard";
import {server} from "@/lib/config";

/*
This page is marked as dynamic in order to opt-out of static prerendering,
however the API server is inaccessible during the build process.
 */
export const dynamic = "force-dynamic"

export default async function Page() {
    // No cache in order to get the latest leaderboard
    const res = await fetch(`${server}/api/v1/leaderboard`, {
        cache: "no-store"
    }).then(res => res.json())

    const leaderboard = res.leaderboard as LeaderboardEntry[]

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight">
                Leaderboard
            </h1>

            <FadeIn className="grid grid-cols-1 gap-4 auto-rows-max">
                {leaderboard.map((pos) => (
                    <LeaderboardCard key={pos.username} entry={pos}/>
                ))}
            </FadeIn>
        </div>
    )
}
