import React from "react";
import FadeIn from "@/components/FadeIn";
import {Metadata} from "next";
import FoodSaved from "@/components/landing/FoodSaved";
import CreateButton from "@/components/landing/CreateButton";
import Bento from "@/components/landing/Bento";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FoodSavedCounter from "@/components/landing/FoodSavedCounter";
import UsersCounter from "@/components/landing/UsersCounter";

export const metadata: Metadata = {
    title: {
        absolute: "Sustain-A-Meal",
    },
}

export default function Page() {
    const gradient = "animate-gradient bg-gradient-to-r bg-clip-text text-transparent"

    return (
        <div className="bg-[url('/background.jpg')] bg-cover bg-clip-content bg-fixed bg-no-repeat">
            <Header/>

            <FadeIn className="px-10 md:px-20 pt-10 mb-8 space-y-16 mx-auto max-w-5xl min-h-screen">
                <div className="space-y-8 text-center">
                    <div className="space-y-2 mb-4">
                        <FoodSaved/>

                        <h1
                            className="text-4xl md:text-5xl font-bold leading-tighter tracking-tight"
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

                    <div className="w-full text-left justify-center items-center mx-auto">
                        <Bento.Grid>
                            <Bento.Card>
                                <Bento.Title>
                                    Reduce Food Waste
                                </Bento.Title>

                                <Bento.Description>
                                    Ever bought too many ingredients and not known what to do with it? Sustain-A-Meal
                                    helps you
                                    generate recipes from your leftover ingredients, reducing food waste and saving you
                                    money.
                                </Bento.Description>
                            </Bento.Card>

                            <Bento.Card>
                                <Bento.Title>
                                    Powered by ChatGPT
                                </Bento.Title>

                                <Bento.Description>
                                    Sustain-A-Meal uses OpenAI&apos;s ChatGPT to generate recipes from your leftover
                                    ingredients,
                                    helping you make the most of your food. It&apos;s like having a personal chef in
                                    your pocket.
                                </Bento.Description>
                            </Bento.Card>

                            <Bento.Card>
                                <Bento.Title>
                                    Caters to your Diet
                                </Bento.Title>

                                <Bento.Description>
                                    If you&apos;re vegan or vegetarian, Sustain-A-Meal has you covered. We&apos;ll
                                    generate
                                    recipes with any dietary requirements you have. Gluten-free? No problem.
                                </Bento.Description>
                            </Bento.Card>
                        </Bento.Grid>
                    </div>

                    <div className="flex flex-row space-x-4 mx-auto self-center justify-center">
                        <FoodSavedCounter/>
                        <UsersCounter/>
                    </div>
                </div>
            </FadeIn>

            <Footer/>
        </div>
    )
}
