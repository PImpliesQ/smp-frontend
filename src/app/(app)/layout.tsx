import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {auth} from "@clerk/nextjs";
import {redirect} from "@clerk/backend";

export default function Layout(props: {
    children: React.ReactNode
}) {
    const {children} = props

    return (
        <main>
            <div id="container"
                 className="min-h-screen md:h-screen w-screen md:overflow-auto overflow-x-hidden flex flex-col">
                <Header/>

                <div
                    className="px-2 md:p-14 pt-4 md:pt-8 mb-auto w-full"
                >
                    {children}
                </div>

                <Footer/>
            </div>
        </main>
    )
}
