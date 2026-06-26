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

## Grok API
