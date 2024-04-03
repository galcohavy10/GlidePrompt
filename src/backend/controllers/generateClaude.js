const fetch = require('node-fetch');
const apiUrl = 'https://api.anthropic.com/v1/messages';

// Function to send a message to Claude
async function chatWithClaude(model, messages, maxTokens) {
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
        model: model,
        max_tokens: maxTokens,
        messages: messages,
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
