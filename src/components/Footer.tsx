import Link from "next/link";
import React from "react";

export default function Footer() {
    return (
        <footer className="py-6">
            <div className="flex justify-center items-center gap-4 text-slate-700">
                <p className="text-sm">
                    Sustain-A-Meal
                </p>

                <p className="text-sm">
                    &copy; 2024 Sustain-A-Meal
                </p>

                <p className="text-sm transition-all ease-out hover:underline hover:text-green-500">
                    Contact
                </p>

                <Link href="/terms">
                    <p className="text-sm transition-all ease-out hover:underline hover:text-green-500">
                        Terms
                    </p>
                </Link>
            </div>
        </footer>
    )
}
