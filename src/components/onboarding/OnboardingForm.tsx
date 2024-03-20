"use client"

import * as React from "react"
import {useState} from "react"
import {useUser} from "@clerk/nextjs"
import {useRouter} from "next/navigation"
import {completeOnboarding} from "@/lib/onboarding";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {RefreshCw} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


export const onboardingFormSchema = z.object({
    accommodation: z.string(),
})

const accommodations = [
    "Birks Grange Village",
    "Duryard",
    "East Park",
    "Holland Hall",
    "Lafrowda",
    "Mardon Hall",
    "Moberly",
    "Nash Grove",
    "Northfield",
    "Pennsylvania Court",
    "Ransom Pickard",
    "Rowe House",
    "St. David's",
    "St. German's"
];

function Loading() {
    return (
        <>
            <RefreshCw size={16} className="animate-spin mr-2"/>
            Loading...
        </>
    )
}

function LetsGo() {
    return (
        <>
            Let&apos;s go!
        </>
    )
}


export default function OnboardingForm() {
    const form = useForm<z.infer<typeof onboardingFormSchema>>({
        resolver: zodResolver(onboardingFormSchema),
    })

    const [isLoading, setLoading] = useState(false)

    const {user} = useUser()
    const router = useRouter()

    const onSubmit = async (formData: z.infer<typeof onboardingFormSchema>) => {
        setLoading(true)
        const res = await completeOnboarding(formData)
        if (res?.message) {
            await user?.reload()
            router.push("/")
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                <FormField
                    control={form.control}
                    name="accommodation"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>What accommodation are you in?</FormLabel>
                            <FormControl>
                                <Select {...field} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Accommodation"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            accommodations.map(accommodation => (
                                                <SelectItem key={accommodation}
                                                            value={accommodation}>{accommodation}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />


                <Button type="submit" disabled={isLoading} variant="default">
                    {
                        isLoading ?
                            <Loading/> : <LetsGo/>
                    }
                </Button>
            </form>
        </Form>
    )
}
