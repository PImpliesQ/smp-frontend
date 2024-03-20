import {auth, clerkClient} from "@clerk/nextjs/server";

export async function POST(request: Request) {
    const {userId} = auth()

    if (!userId) {
        return Response.json({
            message: "No Logged In User"
        }, {
            status: 401
        })
    }

    const formData = await request.json()

    try {
        const res = await clerkClient.users.updateUser(userId, {
            publicMetadata: {
                onboardingComplete: true,
                accommodation: formData.accommodation,
            },
        })
        return Response.json({message: res.publicMetadata})
    } catch (err) {
        return Response.json({error: "There was an error updating the user metadata."}, {
            status: 500
        })
    }
}
