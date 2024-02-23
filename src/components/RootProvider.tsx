"use client";

import React from "react";
import {CssVarsProvider, extendTheme} from "@mui/joy";
import {ClerkProvider} from "@clerk/nextjs";

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    50: "#f1f8e9",
                    100: "#dcedc8",
                    200: "#c5e1a5",
                    300: "#aed581",
                    400: "#9ccc65",
                    500: "#8bc34a",
                    600: "#7cb342",
                    700: "#689f38",
                    800: "#558b2f",
                    900: "#33691e",
                },
            }
        }
    }
})

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
            <CssVarsProvider
                theme={theme}
            >
                {children}
            </CssVarsProvider>
        </ClerkProvider>
    )
}
