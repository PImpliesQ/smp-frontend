"use client"

import {useEffect, useRef, useState} from "react";
import {useInView} from "framer-motion";
import useCountUp from "@/lib/count-up";
import {countUsers} from "@/lib/user-actions";


export default function UsersCounter() {
    const [users, setUsers] = useState(0)

    const ref = useRef(null)
    const isInView = useInView(ref)

    const {count, setStart} = useCountUp(users, 2500)

    useEffect(() => {
        countUsers()
            .then(setUsers)
    }, [setUsers]);

    useEffect(() => {
        if (isInView) {
            setStart(true)
        }
    }, [isInView, setStart]);

    return (
        <div className="text-center" ref={ref}>
            <h2 className="text-xl tracking-tight font-semibold">
                {count.toFixed(0)}
            </h2>
            <p>
                people helped
            </p>
        </div>
    )
}
