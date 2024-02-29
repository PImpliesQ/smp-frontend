import {Recipe} from "@/lib/recipes";
import Link from "next/link";

export default function RecipeCard(props: {
    recipe: Recipe
}) {
    const {
        recipe
    } = props

    return (
        <div className="rounded-md shadow-sm hover:shadow-md hover:-translate-y-0.5 ease-in-out duration-150 w-full border bg-white">
            <Link href={`/recipes/${recipe.id}`}>
                <div className="p-4">
                    <h1 className="text-xl font-semibold tracking-tight">
                        {recipe.title}
                    </h1>

                    <p className="text-sm">
                        {recipe.description}
                    </p>
                </div>
            </Link>
        </div>
    )
}
