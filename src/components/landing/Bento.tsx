import React from "react";

export function BentoCard(props: {
    children: React.ReactNode
}) {
    const {
        children
    } = props

    return (
        <div
            className="bg-slate-50/60 backdrop-blur-6xl border rounded-md p-4 space-y-2 h-full"
        >
            {children}
        </div>
    )
}

export function BentoTitle(props: {
    children: React.ReactNode
}) {
    const {
        children
    } = props

    return (
        <p className="text-lg font-semibold">
            {children}
        </p>
    )
}

export function BentoContent(props: {
    children: React.ReactNode
}) {
    const {
        children
    } = props

    return (
        <div className="space-y-2">
            {children}
        </div>
    )
}

export function BentoDescription(props: {
    children: React.ReactNode
}) {
    const {
        children
    } = props

    return (
        <p className="text-md text-slate-700">
            {children}
        </p>
    )
}

const Bento = {
    Card: BentoCard,
    Title: BentoTitle,
    Content: BentoContent,
    Description: BentoDescription
}

export default Bento
