import OpenAI from "openai";
import "dotenv/config";

// Using OpenAI SDK pointed at OpenRouter as a drop-in replacement.
// Shows that OpenRouter can be used with the OpenAI SDK without any changes to your code.
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

try {
  const response = await client.responses.create({
    model: "openrouter/free",
    input: "Write a one-sentence bedtime story about a unicorn.",
  });

  console.log(response);
  console.log(response.output_text);
} catch (error) {
  console.error("OpenRouter OpenAI SDK call failed:", error);
}
