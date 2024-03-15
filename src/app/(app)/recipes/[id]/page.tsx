import {getRecipeById} from "@/lib/recipes";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {notFound} from "next/navigation";

export default async function Page(props: {
    params: {
        id: string
    }
}) {
    const {
        params
    } = props

    const recipe = await getRecipeById(params.id)

    if (!recipe) {
        return notFound()
    }

    return (
        <div className="mx-auto max-w-5xl space-y-4">
            <div className="flex flex-row">
                <div>
                    <h1 className="font-semibold tracking-tight text-3xl">
                        {recipe.title}
                    </h1>

                    <p className="text-sm">
                        {recipe.description}
                    </p>
                    <p className="text-sm">
                        Serves {recipe.people}
                    </p>
                </div>

                <div className="ml-auto mt-auto">
                    <h2 className="text-sm">
                        This recipe saved {recipe.foodSaved}g of food!
                    </h2>
                </div>
            </div>

            <Separator/>

            <h2 className="font-semibold tracking-tight text-lg">
                Ingredients
            </h2>
            <div className="text-sm !mt-0">
                {recipe.ingredients.split("\n").map((ingredient, index) => (
                    <p key={index}>
                        {ingredient}
                    </p>
                ))}
            </div>

            <h2 className="font-semibold tracking-tight text-lg">
                Steps
            </h2>
            <div className="text-sm !mt-0">
                {recipe.steps.split("\n").map((step, index) => (
                    <p key={index}>
                        {step}
                    </p>
                ))}
            </div>

            <Button className="mx-auto flex">
                <Link href="/recipes/create">
                    Generate another recipe!
                </Link>
            </Button>
        </div>
    )
}
