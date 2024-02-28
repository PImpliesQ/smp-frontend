import RecipeCreator from "@/components/create/RecipeCreator";

export default function Page() {
    return (
        <div className="mx-auto max-w-3xl space-y-4 pt-10">
            <h1 className="text-center text-3xl tracking-tight font-semibold">
                Let&apos;s save some food!
            </h1>

            <RecipeCreator/>
        </div>
    )
}
