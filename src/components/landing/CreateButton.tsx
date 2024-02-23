"use client"

import Link from "next/link";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";

export default function CreateButton() {
    const [hover, setHover] = useState(false)

    return (
        <Link href="/recipes">
            <Button
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                Create a Recipe
            </Button>
        </Link>
    )
}

