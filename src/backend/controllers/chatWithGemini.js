import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLEAI_API_KEY);

export async function chatWithGemini(systemMessage, modelName, messages) {
    // Convert messages format from frontend to match Google AI's expected format
    const history = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }],
    }));

    try {
        console.log("Chatting with Gemini with the following history: ", JSON.stringify(history));
        // For text-only input, use the model specified in the payload
        const model = genAI.getGenerativeModel({ model: modelName });

        // Start a chat session with the history provided
        const chat = model.startChat({
            history: history,
            generationConfig: {
                maxOutputTokens: 1000, // Adjust this value based on your needs
            },
        });

        // Since the last message is already added, just proceed to get a response
        // This assumes the API automatically responds to the last message
        const response = await chat.sendMessage; // Adjust based on how the API is expected to be called
        console.log("Gemini response: ", response);

        // Assuming the 'response' method or property directly gives the final text response
        const text = await response.text();
        console.log("Gemini response: ", text);
        return text;
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error: Unable to chat with Gemini");
    }
}
