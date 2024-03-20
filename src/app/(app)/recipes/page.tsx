import {Recipe} from "@/lib/recipes";
import RecipeCard from "@/components/recipe/RecipeCard";
import FadeIn from "@/components/FadeIn";
import {server} from "@/lib/config";

export default async function Page() {
    // No cache in order to get the latest information, useful for demo
    const res = await fetch(`${server}/api/v1/recipe`, {
        cache: "no-cache"
    }).then(res => res.json())

    const recipes = res.recipes as Recipe[]

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight">
                Recipes
            </h1>

            <FadeIn className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe}/>
                ))}
            </FadeIn>
        </div>
    )
}
