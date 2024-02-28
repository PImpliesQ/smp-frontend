"use client";

import React from "react";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Header() {
    return (
        <div className="py-4 px-10 md:px-20 backdrop-blur flex w-full border-b sticky top-0"
             suppressHydrationWarning
        >
            <div className="place-self-center">
                <h1
                    className="text-lg tracking-tight cursor-pointer flex flex-col"
                >
                    <Link href="/">
                        Sustain-A-Meal
                    </Link>
                </h1>
            </div>

            <div className="ml-auto place-self-center justify-center">
                <Button variant="link">
                    <Link href="/recipes">
                        Recipes
                    </Link>
                </Button>
            </div>

            <div className="place-self-center w-8">
                <SignedIn>
                    <UserButton afterSignOutUrl="/">
                        <UserButton.UserProfilePage label="account"/>
                        <UserButton.UserProfilePage label="security"/>
                    </UserButton>
                </SignedIn>
                <SignedOut>
                    <SignInButton>
                        <Button size="xs">
                            Sign In
                        </Button>
                    </SignInButton>
                </SignedOut>
            </div>
        </div>
    )
}
