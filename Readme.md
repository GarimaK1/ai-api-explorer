# Garima Notes

## Gemini API

Note: If you hit the rate limit, change the Gemini model and try again. Check rate limit on Google AI Studio.

Refer link for full details: https://ai.google.dev/gemini-api/docs/api-key#setup-environment

The API keys can be set in 2 ways: using environment variables or setting the key explicitly in code.

- Name the keys GEMINI_API_KEY or GOOGLE_API_KEY
- If both are set, GOOGLE_API_KEY takes precedence
- The Gemini API client libraries automatically detect and use these variables.

  OR

- const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });
- const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY or process.env.GOOGLE_API_KEY });

## OpenRouter

Use model name "openrouter/free" to always get routed to free models available on OpenRouter.

Pay attention to the model name in each response for OpenRouter. It is randomly chosen an may be different each time.

According to them:
Using "openrouter/free" is the simplest way to get free inference. openrouter/free is a router that selects free models at random from the models available on OpenRouter. The router smartly filters for models that support features needed for your request such as image understanding, tool calling, structured outputs and more.

Syntax mismatch in examples. Refer https://openrouter.ai/docs/api/reference/overview for hopefully latest API specifications.

Using OpenAI SDK pointed at OpenRouter as a drop-in replacement is useful if we have existing code built on the OpenAI SDK and want to access OpenRouter’s model catalog without changing the code structure.
