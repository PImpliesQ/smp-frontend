import {getRecipes} from "@/lib/recipes";
import RecipeCard from "@/components/recipe/RecipeCard";

export default async function Page() {
    const recipes = await getRecipes()

    return (
        <div className="space-y-4 mt-5">
            <h1 className="text-3xl font-semibold tracking-tight">
                Recipes
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe}/>
                ))}
            </div>
        </div>
    )
}
