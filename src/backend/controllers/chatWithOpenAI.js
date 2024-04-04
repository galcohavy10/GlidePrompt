import OpenAI from "openai";
import dotenv from 'dotenv';

// Initialize dotenv to read .env file
dotenv.config();

// Initialize the OpenAI client with the API key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Updated to use ESM export syntax.
export async function chatWithOpenAI(systemMessage, model, messages) {
  try {
    const completion = await openai.chat.completions.create({
      model: model || "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        ...messages,
      ],
    });

    console.log("OpenAI response: ", completion.choices[0].message.content);
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    throw new Error("Internal Server Error: Unable to chat with OpenAI");
  }
};
