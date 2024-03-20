import {getLeaderboard} from "@/lib/leaderboard";

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
    return Response.json({
        leaderboard: await getLeaderboard()
    })
}
