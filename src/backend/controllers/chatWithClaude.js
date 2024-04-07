import Anthropic from '@anthropic-ai/sdk';

// Function to send a message to Claude
export async function chatWithClaude(systemMessage, modelName, messages) {
  // Ensure your API key is stored in environment variables
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("API key is not set in environment variables.");
  }

  // Initialize the Anthropic client with your API key
  const client = new Anthropic({apiKey: apiKey});

  try {
    // Use the SDK's method to send a message
    const response = await client.messages.create({
      model: modelName,
      max_tokens: 100,
      messages: messages,
    })

    // Assuming the 'chat' method returns the response directly
    console.log("Claude response: ", response.content);
    return response.content;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error: Unable to chat with Claude");
  }
}
