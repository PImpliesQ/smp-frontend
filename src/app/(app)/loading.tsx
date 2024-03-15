import {RefreshCw} from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function Loading() {
    return (
        <FadeIn className="h-max w-full mt-16">
            <RefreshCw className="animate-spin justify-center self-center flex mx-auto my-auto"/>
        </FadeIn>
    )
}
