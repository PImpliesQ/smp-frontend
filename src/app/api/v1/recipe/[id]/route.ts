import {getRecipeById} from "@/lib/recipes";
import {notFound} from "next/navigation";

export async function GET(request: Request, {params}: {
    params: {id: string}
}) {
    const recipe = await getRecipeById(params.id)

    if (!recipe) {
        return notFound()
    }

    return Response.json(recipe)
}
