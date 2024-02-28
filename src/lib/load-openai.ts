import OpenAI from "openai/index";

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
})
