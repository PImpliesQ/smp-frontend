import {getLeaderboard} from "@/lib/leaderboard";

export async function GET(request: Request) {
    return Response.json({
        leaderboard: await getLeaderboard()
    })
}
