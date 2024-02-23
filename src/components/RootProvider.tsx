"use client";

import React from "react";
import {ClerkProvider} from "@clerk/nextjs";

export default function RootProvider({children,}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider
            // ULTRA JANK SOLUTION TO ULTRA JANK PROBLEM
            publishableKey={
                process.env.NODE_ENV !== 'production' ?
                    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY :
                    `pk_live_Y2xlcmsud2lsbGZwLmNvbSQ`
            }
        >
            {children}
        </ClerkProvider>
    )
}
