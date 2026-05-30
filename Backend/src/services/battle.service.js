import { ChatGroq } from "@langchain/groq"
import { ChatMistralAI } from "@langchain/mistralai"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

 export const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY
});


export const groqModel = new ChatGroq({
    model: "llama-3.1-8b-instant",
    apiKey: process.env.GROQ_API_KEY
})

export const mistralModel = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: process.env.MISTRAL_API_KEY
})


