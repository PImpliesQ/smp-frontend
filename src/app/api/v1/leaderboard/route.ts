import {getLeaderboard} from "@/lib/leaderboard";

/*
The route is marked as dynamic to ensure that the latest data is always shown to users.
 */
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
    return Response.json({
        leaderboard: await getLeaderboard()
    })
}
