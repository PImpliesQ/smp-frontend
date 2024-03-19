import {authMiddleware} from "@clerk/nextjs";

const protectedPaths = [
    "/recipes",
]

export default authMiddleware({
    publicRoutes: (req) => {
        const url = req.url
        return !protectedPaths.some(path => url.includes(path)) || url.includes("/api")
    }
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
