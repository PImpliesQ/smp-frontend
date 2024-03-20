import OnboardingForm from "@/components/onboarding/OnboardingForm";
import RecipeCreator from "@/components/create/RecipeCreator";

export default async function Page() {
    return (
        <div className="mx-auto max-w-3xl space-y-4 pt-10">
            <h1 className="text-center text-3xl tracking-tight font-semibold">
                We can&apos;t wait to get to know you!
            </h1>

            <OnboardingForm/>
        </div>
    )
}
