import "dotenv/config";
import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

try {
  const response = await client.chat.send({
    chatRequest: {
      model: "openrouter/free",
      // model: "openrouter/free",
      // openai/gpt-oss-20b:free
      // openai/gpt-oss-120b:free
      // google/gemma-3-27b-it:free
      messages: [
        {
          role: "user",
          content: "Write a one-sentence bedtime story about a dog and a wolf.",
        },
      ],
    },
  });

  console.log(response);
  console.log(response?.choices[0]?.message.content);
} catch (error) {
  console.error("OpenRouter SDK call failed:", error);
}
