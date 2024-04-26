import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Async function to interact with a model on Replicate
export async function chatWithReplicate(systemMessage, modelName, messages) {
  try {
    console.log("Sending request with system message:", systemMessage, "and messages:", messages, "to model:", modelName);
    // Prepare the input according to the Replicate model's requirements

      // Concatenate systemMessage and user messages into a single prompt
      const prompt = `System: ${systemMessage}\n` + messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
      const input = {
        prompt: prompt,
        messages: messages.map(msg => `${msg.role}: ${msg.content}`).join('\n'),
        // Add other parameters as needed
        max_new_tokens: 512,  // For example, you may need to adjust this
        temperature: 0.5
      };

    // Using the predict function instead of streaming
    const completion = await replicate.run(modelName, { input: input });
    console.log("Received completion from Replicate's", modelName, completion);
  
    // take the string-array completion and convert it to one big string
    const response = completion.join('');
    console.log("Returning response:", response);
    return response;
  } catch (error) {
    console.error("Error communicating with Replicate:", error);
    throw new Error("Internal Server Error: Unable to communicate with Replicate");
  }
};
