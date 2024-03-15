import React, {Suspense} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import {countFoodSavedKg} from "@/lib/recipe-actions";

export default async function FoodSaved() {
    const foodSaved = countFoodSavedKg()

    return (
        <Link href="/about">
            <Button
                className="mb-1 h-7 rounded-lg group bg-opacity-50 group"
                variant="secondary"
            >
                <p>
                    &#x1F96C;&nbsp;&nbsp;
                </p>
                <Suspense fallback={
                    <p>
                        0
                    </p>
                }>
                    <p>
                        {foodSaved}
                    </p>
                </Suspense>
                <p>
                    kg of food saved
                </p>
                &nbsp;<ArrowRight size={16} className="group-hover:translate-x-0.5 h-4 transition-all duration-15"/>
            </Button>
        </Link>
    )
}
