export default {
  GENERATE_OPTION_PROMPT: `
        Based on the user instruction, generate exactly 3 different recipe variants.

        Return response in STRICT JSON format only.
        Do NOT include explanations, markdown, or extra text.

        JSON structure:
        [
        {
            "recipeName": "Recipe name with one emoji",
            "description": "Exactly 2 short sentences.",
            "ingredients": ["ingredient1", "ingredient2", "ingredient3"]
        }
        ]

        Rules:
        - ingredients should NOT include quantity or size.
        - description must be only 2 lines.
        - Generate recipes in strict JSON format only.
        - Do not add any text outside the JSON array.
        - Return only valid JSON array.
    `,

  GENERATE_COMPLETE_RECIPE: `
        Based on the given recipe name and description, generate a complete recipe.

        Return response in STRICT JSON format only.
        Do NOT include explanations, markdown, or extra text.

        JSON structure:
        {
            "recipeName": "recipe name",
            "description": "description",
            "category": ["Breakfast", "Dinner"],
            "ingredients": [
                {
                    "icon": "emoji representing ingredient",
                    "ingredient": "ingredient name",
                    "quantity": "exact quantity with measurement"
                }
            ],
            "steps": [
                {
                    "step": 1,
                    "instruction": ""
                },
                {
                    "step": 2,
                    "instruction": ""
                }
            ],
            "calories": number,
            "cookTime": number,
            "serveTo": number,
            "imagePrompt": "A highly realistic food photography prompt that visually describes the final dish exactly as prepared in this recipe. Include color, texture, plating style, garnish, lighting, camera angle, background setting, and serving style. The image should match the actual ingredients and cooking method."
        }

        Rules:
        - emoji icons for each ingredient as icon, quantity as quantity, along with step by step recipe as steps  
        - Total Calories as calories must be number only.
        - Minutes to cook as cookTime must be total minutes as number.
        - Serving number as serveTo must be number only.
        - steps must be clear and sequential (each step with step number and instruction).
        - Image prompt must describe the exact final dish realistically (like a professional food photography prompt).
        - category must be an array of one or more values selected ONLY from: [Breakfast, Lunch, Dinner, Salad, Dessert, Fastfood, Drink, Cake]
        - Do not create new categories.
        - Ensure valid JSON. Do not add trailing commas.
        - Return only valid JSON.
    `,
};
