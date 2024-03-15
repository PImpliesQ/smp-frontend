"use client"

import {useEffect, useRef, useState} from "react";
import {useInView} from "framer-motion";
import {countFoodSavedKg} from "@/lib/recipe-actions";
import useCountUp from "@/lib/count-up";


export default function FoodSavedCounter() {
    const [saved, setSaved] = useState(0)

    const ref = useRef(null)
    const isInView = useInView(ref)

    const {count, setStart} = useCountUp(saved, 2500)

    useEffect(() => {
        countFoodSavedKg()
            .then(setSaved)
    }, [setSaved]);

    useEffect(() => {
        if (isInView) {
            setStart(true)
        }
    }, [isInView, setStart]);

    return (
        <div className="text-center" ref={ref}>
            <h2 className="text-xl tracking-tight font-semibold">
                {count.toFixed(2)}kg
            </h2>
            <p>
                of food saved
            </p>
        </div>
    )
}
