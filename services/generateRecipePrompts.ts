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
            "ingredients": [
                {
                    "icon": "emoji",
                    "ingredient": "ingredient name",
                    "quantity": "quantity with unit"
                }
            ],
            "steps": ["Step 1", "Step 2", "Step 3"],
            "calories": number,
            "cookTime": number,
            "serveTo": number
        }

        Rules:
        - calories must be number only.
        - cookTime must be total minutes as number.
        - serveTo must be number only.
        - steps must be clear and sequential.
        - Return only valid JSON.
    `
}