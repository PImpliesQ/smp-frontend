"use client"

import {useCompletion} from "ai/react";
import {z} from "zod";
import RecipeCreateForm, {formSchema} from "@/components/create/RecipeCreateForm";
import {generatePrompt, Recipe} from "@/lib/recipes";
import {postRecipe} from "@/lib/recipe-actions";
import {useRouter} from "next/navigation";

export default function RecipeCreator() {
    const {complete, isLoading} = useCompletion({
        api: "/api/v1/recipe"
    })

    const router = useRouter()

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const prompt = generatePrompt(data)
        const json = await complete(prompt)
        if (!json) {
            throw new Error("No response from the server")
        }
        const recipe = await postRecipe(JSON.parse(json))

        router.push(`/recipes/${recipe.id}`)
    }

    return (
        <div className="mx-auto max-w-2xl">
            <RecipeCreateForm onSubmit={onSubmit} isLoading={isLoading}/>
        </div>
    )
}
