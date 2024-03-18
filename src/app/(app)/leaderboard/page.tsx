import FadeIn from "@/components/FadeIn";
import {getLeaderboard} from "@/lib/leaderboard";
import {LeaderboardCard} from "@/components/leaderboard/LeaderboardCard";

export default async function Page() {
    // Workaround for SSR
    const leaderboard = process.env.RUNNING_DOCKER_BUILD ? [] : await getLeaderboard()

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
