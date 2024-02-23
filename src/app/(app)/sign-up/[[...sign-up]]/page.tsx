import {SignUp} from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="mt-16 w-full flex">
            <div
                className="m-auto"
            >
                <SignUp/>
            </div>
        </div>
    )
}
