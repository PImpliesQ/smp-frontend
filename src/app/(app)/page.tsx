import React from "react";
import FadeIn from "@/components/FadeIn";
import {Metadata} from "next";
import FoodSaved from "@/components/landing/FoodSaved";
import CreateButton from "@/components/landing/CreateButton";

export const metadata: Metadata = {
    title: {
        absolute: "Sustain-A-Meal",
    },
}

export default function Page() {
    const gradient = "animate-gradient bg-gradient-to-r bg-clip-text text-transparent"

    return (
        <div>
            <FadeIn className="px-10 md:px-20 pt-10 mb-8 space-y-16 mx-auto max-w-5xl">
                <div className="space-y-8 text-center">
                    <div className="space-y-2 mb-4">
                        <FoodSaved/>

                        <h1
                            className="text-4xl md:text-5xl font-bold"
                        >
                                <span>
                                    Wave goodbye to&nbsp;
                                </span>
                            <span className={`${gradient} from-lime-400 via-light-green-500 to-green-400`}>
                                    food waste&nbsp;
                                </span>
                            <span>
                                    with Sustain-A-Meal
                                </span>
                        </h1>

                        <div className="max-w-xl mx-auto">
                            <p className="text-md text-slate-600">
                                Free-to-use recipes generated from your leftover ingredients.
                            </p>
                        </div>
                    </div>

                    <CreateButton/>
                </div>
            </FadeIn>
        </div>
    )
}
