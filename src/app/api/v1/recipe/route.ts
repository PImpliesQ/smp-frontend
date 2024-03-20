import {getRecipes, Recipe} from "@/lib/recipes";
import {auth} from "@clerk/nextjs";
import {apiEndpoint} from "@/lib/config";

export async function GET(request: Request) {
    return Response.json({
        recipes: await getRecipes()
    })
}

export async function POST(request: Request) {
    const {userId} = auth()

    if (!userId) {
        throw new Error("Not authenticated")
    }

    const json = await request.json()

    const recipe = await json.recipe as Recipe

    if (!recipe) {
        throw new Error("No recipe provided")
    }

    const res = await fetch(`${apiEndpoint}/create_recipe/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: recipe.title,
            description: recipe.description,
            ingredients: recipe.ingredients,
            steps: recipe.steps,
            people: recipe.people,
            diet: recipe.dietaryRestrictions,
            food_saved: recipe.foodSaved,
            user_id: userId
        })
    })

    if (!res.ok) {
        return Response.json({
            error: "Failed to create recipe"
        }, {
            status: 500
        })
    }

    const responseJson = await res.json()

    recipe.id = responseJson.id

    return Response.json({
        recipe
    })
}
