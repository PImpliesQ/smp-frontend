"use client"

import Link from "next/link";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {RefreshCw} from "lucide-react";

function Loading() {
    return (
        <>
            <RefreshCw size={16} className="animate-spin mr-2"/>
            Loading...
        </>
    )
}

function CreateRecipe() {
    return (
        <>
            Create a Recipe
        </>
    )
}

export default function CreateButton() {
    const [loading, setLoading] = useState(false)

    return (
        <Link href="/recipes">
            <Button
                onClick={() => setLoading(true)}
                disabled={loading}
            >
                {
                    loading ?
                        <Loading/> : <CreateRecipe/>
                }
            </Button>
        </Link>
    )
}

