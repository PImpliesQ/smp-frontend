"use server"

import {auth, clerkClient} from "@clerk/nextjs/server"
import {onboardingFormSchema} from "@/components/onboarding/OnboardingForm";
import {z} from "zod";

export const completeOnboarding = async (formData: z.infer<typeof onboardingFormSchema>) => {
    const {userId} = auth()

    if (!userId) {
        return {message: "No Logged In User"}
    }

    try {
        const res = await clerkClient.users.updateUser(userId, {
            publicMetadata: {
                onboardingComplete: true,
                accommodation: formData.accommodation,
            },
        })
        return {message: res.publicMetadata}
    } catch (err) {
        return {error: "There was an error updating the user metadata."}
    }
}
