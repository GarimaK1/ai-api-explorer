import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

// Refer: https://ai.google.dev/gemini-api/docs/get-started

// // REST API returns the full Interaction resource containing metadata, usage statistics, and the step-by-step history of the turn.
// // SDKs expose the full response + provide convenience properties like interaction.output_text and interaction.output_image to access final outputs directly.
// const interaction = await ai.interactions.create({
//   model: "gemini-3.5-flash",
//   input: "Explain how AI works in a few words",
// });
// console.log(interaction.output_text);

// // Count tokens before sending
// const prompt = "The quick brown fox jumps over the lazy dog.";
// const countResponse = await ai.models.countTokens({
//   model: "gemini-3.5-flash",
//   contents: prompt,
// });
// console.log(countResponse.totalTokens);

// Count tokens across conversation history using previous_interaction_id:
// First interaction
// const interaction1 = await ai.interactions.create({
//   model: "gemini-2.5-flash-lite",
//   input: "Hi, my name is Bob",
// });

// // Second interaction continues the conversation
// const interaction2 = await ai.interactions.create({
//   model: "gemini-2.5-flash-lite",
//   input: "What's my name?",
//   previous_interaction_id: interaction1.id,
// });

// console.log(`Input tokens: ${interaction2?.usage?.total_input_tokens}`);
// console.log(`Output tokens: ${interaction2?.usage?.total_output_tokens}`);
// console.log(interaction2?.usage?.input_tokens_by_modality);
// console.log(interaction2);

// const interaction3 = await ai.interactions.create({
//   model: "gemini-2.5-flash-lite",
//   input: "Hello!",
//   system_instruction: "You are a helpful assistant who speaks like a pirate.",
// });
// console.log(interaction3);
// console.log(`Input tokens: ${interaction3?.usage?.total_input_tokens}`);

// Streaming the response as it is generated. It is a stream of Server-Side Events (SSE).
// const stream = await ai.interactions.create({
//   model: "gemini-2.5-flash-lite",
//   input: "Count from 1 to 25.",
//   stream: true,
// });

// for await (const event of stream) {
//   console.log(event);
// }

// // Multi-turn conversations
// // Server-side state (recommended)
// const interaction4 = await ai.interactions.create({
//   model: "gemini-2.5-flash-lite",
//   input: "I have 2 dogs in my house.",
// });
// console.log("Response 1: ", interaction4.output_text);

// const interaction5 = await ai.interactions.create({
//   model: "gemini-2.5-flash-lite",
//   input: "How many paws are there in my house?",
//   previous_interaction_id: interaction4.id,
// });
// console.log("Response 2: ", interaction5.output_text);

// Structured Output Example
import * as z from "zod";

const recipeJsonSchema = {
  type: "object",
  properties: {
    recipe_name: {
      type: "string",
      description: "The name of the recipe.",
    },
    prep_time_minutes: {
      type: "integer",
      description: "Optional time in minutes to prepare the recipe.",
    },
    ingredients: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string", description: "Name of the ingredient." },
          quantity: {
            type: "string",
            description: "Quantity of the ingredient, including units.",
          },
        },
        required: ["name", "quantity"],
      },
    },
    instructions: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["recipe_name", "ingredients", "instructions"],
} as const satisfies Parameters<typeof z.fromJSONSchema>[0];

const recipeSchema = z.fromJSONSchema(recipeJsonSchema);

const prompt = `
Analyze the following cooking-related text and identify any recipe information it contains.
A batch of chocolate chip cookies can be made using 2¼ cups of plain flour, 1 teaspoon baking soda, 1 teaspoon salt, 1 cup softened unsalted butter, ¾ cup white sugar, ¾ cup packed brown sugar, 1 teaspoon vanilla extract, 2 eggs, and 2 cups semisweet chocolate chips.

Begin by heating the oven to 375°F (190°C). Combine the flour, baking soda, and salt in a bowl and set aside. In a separate large bowl, beat the butter together with both sugars until the mixture becomes smooth and airy. Mix in the vanilla, then add the eggs one after the other, blending well after each addition.

Slowly incorporate the dry ingredients into the butter mixture, stirring only until everything is evenly mixed. Fold in the chocolate chips. Scoop spoonfuls of dough onto baking trays without greasing them, leaving some space between each cookie. Bake for approximately 9–11 minutes, or until the edges begin to turn golden.
`;

try {
  const structuredOutputInteraction = await ai.interactions.create({
    model: "gemini-3.1-flash-lite",
    input: prompt,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: recipeJsonSchema,
    },
  });

  if (structuredOutputInteraction && structuredOutputInteraction.output_text) {
    const recipe = recipeSchema.parse(
      JSON.parse(structuredOutputInteraction.output_text),
    );
    console.log(recipe);
  }
} catch (error) {
  console.error("Gemini API call failed:", error);
}
