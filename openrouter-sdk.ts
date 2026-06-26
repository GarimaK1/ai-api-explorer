import "dotenv/config";
import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

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
        content: "Explain quantum computing in one sentence.",
      },
    ],
  },
});

console.log(response);
console.log(response?.choices[0]?.message.content);
