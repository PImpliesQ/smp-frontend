import {RefreshCw} from "lucide-react";

export default function Loading() {
    return (
        <div className="h-max w-full flex">
            <div className="mx-auto my-auto">
                <RefreshCw className="animate-spin"/>
            </div>
        </div>
    )
}
