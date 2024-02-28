import React from "react";

export function BentoGrid(props: {
    children: React.ReactNode
}) {
    const {
        children
    } = props

    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
            {children}
        </div>
    )
}

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
        <p className="text-lg font-semibold tracking-tight">
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
    Grid: BentoGrid,
    Card: BentoCard,
    Title: BentoTitle,
    Content: BentoContent,
    Description: BentoDescription
}

export default Bento
