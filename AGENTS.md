# AI API Explorer — Agents Guide

## Quick start

```bash
npm install
# Copy .env.example → .env and add API keys
```

## Running scripts

All scripts are standalone `.ts` files run via `tsx` (no build step):

| Script                     | Command                               | Env var(s) needed                    |
| -------------------------- | ------------------------------------- | ------------------------------------ |
| `gemini.ts`                | `npm run start:gemini`                | `GEMINI_API_KEY` or `GOOGLE_API_KEY` |
| `openrouter-rest-api.ts`   | `npm run start:openrouter-rest`       | `OPENROUTER_API_KEY`                 |
| `openrouter-sdk.ts`        | `npm run start:openrouter-sdk`        | `OPENROUTER_API_KEY`                 |
| `openrouter-openai-sdk.ts` | `npm run start:openrouter-openai-sdk` | `OPENROUTER_API_KEY`                 |
| *typecheck*               | `npm run typecheck`                   | —                                    |

`gemini.ts` is the only file with active (uncommented) code — it demonstrates structured output with Zod. All other scripts have fully active code.

## Environment

- `.env` is gitignored; `.env.example` only shows `OPENROUTER_API_KEY`. Gemini keys must be added manually.
- `gemini.ts` does **not** import `dotenv` — the `@google/genai` SDK reads `GEMINI_API_KEY` / `GOOGLE_API_KEY` directly from the environment.
- OpenRouter scripts all `import "dotenv/config"` at the top.
- Gemini key precedence: `GOOGLE_API_KEY` > `GEMINI_API_KEY`.

## TypeScript quirks

- ESM (`"type": "module"`), `module: "nodenext"`, `target: "esnext"`.
- `verbatimModuleSyntax: true` — use `import type` for type-only imports.
- `exactOptionalPropertyTypes: true` — be explicit with `undefined` vs omitted.
- TypeScript 6, Node 24.

## OpenRouter notes

- Use model `"openrouter/free"` to auto-select free models.
- The `openrouter-openai-sdk.ts` script uses the OpenAI **v2 Responses API** (`client.responses.create`), not the older `chat.completions` API.

## Output artifacts

`*.txt` files at the root are captured terminal output from past runs, not source code.

## Type-checking

Run `npm run typecheck` (`tsc --noEmit`) to verify types. Scripts are executed via `tsx`, which does **not** type-check, so run this before committing.

## Project structure

Flat — all source `.ts` files are at the repo root. No `src/`, no subdirectories.
