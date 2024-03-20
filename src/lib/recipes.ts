import {z} from "zod";
import {formSchema} from "@/components/create/RecipeCreateForm";
import {apiEndpoint} from "@/lib/config";

export type Recipe = {
    id: number,
    title: string
    description: string
    people: number
    dietaryRestrictions: string
    ingredients: string
    steps: string
    foodSaved: number,
    userId: string,
}

export function generatePrompt(data: z.infer<typeof formSchema>) {
    return `
    You are powering a new recipe creation tool that will help people cook with the ingredients they have at home.
    Create a unique, interesting recipe based on the ingredients and dietary preferences provided.
    
    Include detailed instructions with estimated cooking times for each step.
    Assume that the user has various herbs and spices available to use, as well as basic cooking
    ingredients like oil, salt, and pepper. Feel free to use these even if not specified in the input ingredients list.
    However, do not add any other ingredients to the recipe, especially large ingredients like meat or vegetables.
    
    You will also have to generate a total estimate (in grams) of the amount of food saved from being wasted.
    This is calculated based on the ingredients used in the recipe. It should be a rough estimate, but try to be as accurate as possible.
    
    The user has the following ingredients available: ${data.ingredients}
    The user has the following dietary restrictions: ${data.dietaryRestrictions}
    You are generating a recipe to feed ${data.people} people.
    
    You must return a JSON response that will be parsed directly, fitting this schema:
    
    {
      "title": /* A short, creative title, as a string */,
      "description":  /* A brief description for the recipe, as a string */,
      "people":  /* How many people will be fed by this recipe, as a number */,
      "dietaryRestrictions":  /* Any dietary restrictions required, as a string */,
      "ingredients":  /* The ingredients required for the recipe, including additional ingredients used besides the input, as a string (with newlines) */,
      "steps":  /* The steps to make the recipe, as a string (with newlines) */,
      "foodSaved":  /* The estimated amount of food saved from being wasted in grams, as a number */
    }
    
    Do not generate anything other than the JSON object.
    Do not add any extra text or information, just return the complete JSON object.
  `
}

export async function getRecipeById(id: string | number): Promise<Recipe | null> {
    const res = await fetch(`${apiEndpoint}/get_recipe/${id}`, {
        cache: "no-cache"
    })

    if (!res.ok) {
        return null
    }

    const json = await res.json()

    if (!json.name) {
        return null
    }

    return {
        id: parseInt(id.toString()),
        title: json.name,
        description: json.description,
        people: json.people,
        dietaryRestrictions: json.diet,
        ingredients: json.ingredients,
        steps: json.steps,
        foodSaved: json.food_saved,
        userId: json.user_id
    }
}

export async function getRecipes(): Promise<Recipe[]> {
    const res = await fetch(`${apiEndpoint}/get_all_recipe_ids`, {
        next: {
            revalidate: 5
        }
    })

    if (!res.ok) {
        return []
    }

    const json = await res.json()

    if (!json.ids) {
        return []
    }

    const ids = json.ids as number[]

    const recipes = await Promise.all(ids.map(async (id) => {
        return await getRecipeById(id)
    }))

    return recipes.filter((recipe) => recipe !== null) as Recipe[]
}
