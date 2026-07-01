import "dotenv/config";

// First API call to OpenRouter REST API
async function callOpenRouterAPI() {
  try {
    const queryDate =
      process.env.QUERY_DATE ??
      new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

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
              content: `Provide a list of free AI models available on OpenRouter on ${queryDate}.`,
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const res = await response.json();

    console.log(res);
    console.log(res.choices[0].message.content);
  } catch (error) {
    console.error("OpenRouter REST API call failed:", error);
  }
}

callOpenRouterAPI();
