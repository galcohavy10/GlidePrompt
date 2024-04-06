// Use dynamic import for fetch
let fetch; // Declare fetch variable at the top

// Function to send a message to Claude
export async function chatWithClaude(systemMessage, modelName, messages) {
  if (!fetch) { // Import fetch dynamically if not already imported
    fetch = (await import('node-fetch')).default;
  }
  
  const apiUrl = 'https://api.anthropic.com/v1/messages';
  const apiKey = process.env.ANTHROPIC_API_KEY; // Ensure your API key is stored in environment variables

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: modelName,
        max_tokens: 100,
        messages: messages,
        system_message: systemMessage,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log("claude response: ", data.content);
    return data.content;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error: Unable to chat with Claude");
  }
}
