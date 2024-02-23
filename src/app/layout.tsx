import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import React from "react";
import RootProvider from "@/components/RootProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: {
        absolute: "Sustain-A-Meal",
        default: "Sustain-A-Meal",
        template: "%s • Sustain-A-Meal",
    },
    description: "Sustain-A-Meal lets you generate sustainable meals to feed your family and friends.",
    keywords: [
        "Sustain-A-Meal",
        "Food",
        "Meal Plan",
        "Sustainability",
        "Exeter",
    ]
}

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <RootProvider>
            <body className={inter.className}>{children}</body>
        </RootProvider>
        </html>
    );
}
