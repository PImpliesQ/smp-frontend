import {getRecipes} from "@/lib/recipes";
import RecipeCard from "@/components/recipe/RecipeCard";
import FadeIn from "@/components/FadeIn";

export default async function Page() {
    // Workaround for SSR
    console.log(process.env.RUNNING_DOCKER_BUILD)
    const recipes = process.env.RUNNING_DOCKER_BUILD ? [] : await getRecipes()

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
