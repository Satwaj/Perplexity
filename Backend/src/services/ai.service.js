import { initChatModel } from "langchain";

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is missing. Set it in your .env file.");
}

const model = await initChatModel("google-genai:gemini-2.5-flash-lite");

export async function generateResponse() {
    
  const response = await model.invoke("What is the capital of india?");
  console.log(response.text);
  return response?.text ?? "";
}