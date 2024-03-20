"use client";

import React from "react";
import {ClerkProvider} from "@clerk/nextjs";

export default function RootProvider({children,}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider
            // It's a really, really long story why I have to do this
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
