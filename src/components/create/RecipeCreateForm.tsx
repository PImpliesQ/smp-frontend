"use client"

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Slider} from "@/components/ui/slider";
import {SliderThumb} from "@radix-ui/react-slider";
import {Button} from "@/components/ui/button";
import {RefreshCw, Wand2} from "lucide-react";
import React from "react";

export const formSchema = z.object({
    ingredients: z.string(),
    people: z.array(z.number().min(1).max(16)),
    dietaryRestrictions: z.string().optional()
})

function Loading() {
    return (
        <>
            <RefreshCw size={16} className="animate-spin mr-2"/>
            Generating...
        </>
    )
}

function CreateRecipe() {
    return (
        <>
            Generate me a recipe!
            <Wand2 size={16} className="ml-2"/>
        </>
    )
}

export default function RecipeCreateForm(props: {
    isLoading: boolean,
    onSubmit: (data: z.infer<typeof formSchema>) => void
}) {
    const {
        isLoading,
        onSubmit
    } = props

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            people: [2]
        }
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                <FormField
                    control={form.control}
                    name="ingredients"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>What have you got available?</FormLabel>
                            <FormControl>
                                <Input placeholder="Pasta, Tomatoes, Garlic..." {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="people"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>How many people are you cooking for?</FormLabel>
                            <FormControl>
                                <Slider {...field} min={1} max={16} onValueChange={field.onChange}>
                                    <SliderThumb/>
                                </Slider>
                            </FormControl>
                            <FormDescription>
                                {field.value} People
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dietaryRestrictions"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Any dietary restrictions?</FormLabel>
                            <FormControl>
                                <Input placeholder="Vegan, Low-Sugar..." {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isLoading}>
                    {
                        isLoading ?
                            <Loading/> : <CreateRecipe/>
                    }
                </Button>
            </form>
        </Form>
    )
}
