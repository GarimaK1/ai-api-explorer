import "dotenv/config";

// First API call to OpenRouter REST API
async function callOpenRouterAPI() {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // model: "openrouter/free",
        // openai/gpt-oss-20b:free
        // openai/gpt-oss-120b:free
        // google/gemma-3-27b-it:free
        model: "openrouter/owl-alpha",
        messages: [
          {
            role: "user",
            content:
              "Provide a list of free AI models available on OpenRouter on 26 June 2026.",
          },
        ],
      }),
    },
  );

  const res = await response.json();

  console.log(res);
  console.log(res.choices[0].message.content);
}

callOpenRouterAPI();
