import prisma from "@/lib/get-prisma";
import {Recipe} from "@/lib/recipes";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default async function Page(props: {
    params: {
        id: string
    }
}) {
    const {
        params
    } = props

    const recipeInDb = await prisma.recipe.findFirst({
        where: {
            id: parseInt(params.id)
        }
    })

    console.log(recipeInDb)

    if (!recipeInDb) {
        return {
            notFound: true
        }
    }

    const recipe: Recipe = {
        id: recipeInDb.id,
        title: recipeInDb.name,
        description: recipeInDb.description,
        ingredients: recipeInDb.ingredients,
        steps: recipeInDb.steps,
        people: recipeInDb.people,
        dietaryRestrictions: recipeInDb.diet,
        foodSaved: recipeInDb.foodSaved
    }

    return (
        <div className="mx-auto max-w-3xl space-y-4 pt-10">
            <div className="rounded-md border shadow-md bg-white p-4 space-y-2">
                <div>
                    <h1 className="font-semibold tracking-tight text-xl">
                        {recipe.title}
                    </h1>

                    <p className="text-sm">
                        {recipe.description}
                    </p>
                </div>

                <Separator/>

                <h2 className="font-semibold tracking-tight text-lg">
                    Ingredients
                </h2>
                <div className="text-sm">
                    {recipe.ingredients.split("\n").map((ingredient, index) => (
                        <div key={index}>
                            {ingredient}
                        </div>
                    ))}
                </div>

                <h2 className="font-semibold tracking-tight text-lg">
                    Steps
                </h2>
                <div className="text-sm">
                    {recipe.steps.split("\n").map((step, index) => (
                        <div key={index}>
                            {step}
                        </div>
                    ))}
                </div>
            </div>

            <Button className="mx-auto flex">
                <Link href="/recipes">
                    Generate another recipe!
                </Link>
            </Button>
        </div>
    )
}
