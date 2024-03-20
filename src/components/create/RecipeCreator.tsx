"use client"

import {useCompletion} from "ai/react";
import {z} from "zod";
import RecipeCreateForm, {formSchema} from "@/components/create/RecipeCreateForm";
import {generatePrompt} from "@/lib/recipes";
import {useRouter} from "next/navigation";
import {useAuth} from "@clerk/nextjs";

export default function RecipeCreator() {
    const {getToken} = useAuth()

    const {complete, isLoading} = useCompletion({
        api: "/api/v1/recipe/generate"
    })

    const router = useRouter()

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const prompt = generatePrompt(data)
        const json = await complete(prompt)
        if (!json) {
            throw new Error("No response from the server")
        }

        // Add the recipe to the database
        const res = await fetch(`/api/v1/recipe`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${await getToken()}`
            },
            body: JSON.stringify({
                recipe: JSON.parse(json)
            })
        }).then(res => res.json()).then(json => json.recipe)

        router.push(`/recipes/${res.id}`)
    }

    return (
        <div className="mx-auto max-w-2xl">
            <RecipeCreateForm onSubmit={onSubmit} isLoading={isLoading}/>
        </div>
    )
}
