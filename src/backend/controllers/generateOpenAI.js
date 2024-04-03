const { Configuration, OpenAIApi } = require('openai');

// Function to initialize OpenAI with the API key from environment variables
function initializeOpenAI() {
  require('dotenv').config({ path: './.env' });
  const apiKey = process.env.OPENAI_API_KEY;
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  return new OpenAIApi(configuration);
}

// Function to chat with OpenAI
async function chatWithOpenAI(systemMessage, model, messages) {
  const openai = initializeOpenAI();
  
  try {
    const completion = await openai.chat.completions.create({
      model: model || "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        ...messages,
      ],
    });

    console.log("openai response: " + completion.choices[0].message.content);
    return completion.choices[0].message.content;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error: Unable to chat with OpenAI");
  }
}
