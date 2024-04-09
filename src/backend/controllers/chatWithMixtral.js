import OpenAI from "openai";
import dotenv from 'dotenv';

// Initialize dotenv to read .env file
dotenv.config();

// Initialize the OpenAI client with the API key for lemonfox.ai, the mixtral model
const openai = new OpenAI({
  apiKey: process.env.LEMONFOX_API_KEY,
  baseURL: "https://api.lemonfox.ai/v1",
});

// Updated to use ESM export syntax.
export async function chatWithMixtral(systemMessage, modelName, messages) {
  try {
    console.log("Sending request with system message: ", systemMessage, " and messages: ", messages, " to model: ", modelName);
    const completion = await openai.chat.completions.create({
      model: "mixtral-chat",
      messages: [
        { role: "system", content: systemMessage },
        ...messages,
      ],
    });

    console.log("Mixtral response: ", completion.choices[0].message.content);
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    throw new Error("Internal Server Error: Unable to chat with OpenAI");
  }
};
