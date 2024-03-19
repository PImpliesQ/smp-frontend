import FadeIn from "@/components/FadeIn";
import {LeaderboardEntry} from "@/lib/leaderboard";
import {LeaderboardCard} from "@/components/leaderboard/LeaderboardCard";
import {server} from "@/lib/config";

export default async function Page() {
    const res = await fetch(`${server}/api/v1/leaderboard`).then(res => res.json())
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
