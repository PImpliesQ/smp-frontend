import {getLeaderboard} from "@/lib/leaderboard";

export const dynamic = true;

export async function GET(request: Request) {
    return Response.json({
        leaderboard: await getLeaderboard()
    })
}
