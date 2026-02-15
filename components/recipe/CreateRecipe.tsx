import { useAppNotification } from "@/hooks/useAppNotification";
import axios from "axios";
import React, { useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
//import OpenAI from "openai"
import RecipeGenerateBtn from "./RecipeGenerateBtn";

import { useLoader } from "@/hooks/useLoader";
import recipePrompt from "@/services/generateRecipePrompts";
import { Recipe } from "@/types/recipe";
import { RecipeOption } from "@/types/recipeOption";

import { addRecipe } from "@/services/recipeService";
import { useRouter } from "expo-router";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import LoadingDialog from "./LoadingDialog";

//dotenv.config();

const EXPO_PUBLIC_GEMINI_API_KEY = process.env
  .EXPO_PUBLIC_GEMINI_API_KEY as string;

const EXPO_PUBLIC_AIGURULAB_API_KEY = process.env
  .EXPO_PUBLIC_AIGURULAB_API_KEY as string;

const AIGURULAB_BASE_URL = "https://aigurulab.tech";

//const CreateRecipe = () => {
type CreateRecipeProps = {
  containerBg?: string;
  inputBg?: string;
};

const CreateRecipe = ({
  containerBg = "#FFF8F3",
  inputBg = "#FFFFFF",
}: CreateRecipeProps) => {
  const router = useRouter();
  const [userInputText, setUserInputText] = useState<string>();
  const [isGenerating, setIsGenerating] = useState(false);
  const { showLoader, hideLoader, isLoading } = useLoader();
  const [openLoading, setOpenLoading] = useState(false);
  const [generatedRecipeOptions, setGeneratedRecipeOptions] = useState<any>([]);
  const { showSuccess, showError } = useAppNotification();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const onGenerateRecipe = async () => {
    const GENERATE_OPTION_PROMPT = recipePrompt.GENERATE_OPTION_PROMPT;

    if (!userInputText || userInputText.trim() == "") {
      showError("Input Required", "Please enter your ingredients..!");
      return;
    }

    if (isGenerating) {
      return;
    }

    setIsGenerating(true);

    try {
      // Call Gemini API
      /* const aiResponse = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent",
        {
          contents: [
            {
              parts: [{ text: userInputText + GENERATE_OPTION_PROMPT }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 500,
            response_mime_type: "application/json",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": EXPO_PUBLIC_GEMINI_API_KEY,
          },
        },
      );

      const generatedContent =
        aiResponse.data?.candidates?.[0]?.content?.[0]?.text ||
        aiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No description generated"; */

        const generatedContent = `[
  {
    "recipeName": "Spicy Garlic Chicken 🍗",
    "description": "A quick and tasty chicken recipe with garlic and chili. Perfect for dinner in under 30 minutes.",
    "ingredients": ["chicken", "garlic", "chili flakes", "olive oil", "soy sauce"]
  },
  {
    "recipeName": "Creamy Mushroom Pasta 🍄",
    "description": "Rich and creamy pasta with mushrooms and herbs. Ideal for a cozy meal at home.",
    "ingredients": ["pasta", "mushrooms", "cream", "parmesan", "garlic"]
  },
  {
    "recipeName": "Vegetable Stir-Fry Delight 🥦",
    "description": "A colorful stir-fry with fresh veggies and soy sauce. Quick and healthy for lunch or dinner.",
    "ingredients": ["broccoli", "bell peppers", "carrots", "soy sauce", "sesame seeds"]
  }
]
`

      //console.log("Original: " + generatedContent);
      //console.log("Trimmed: " + generatedContent.trim());

      if (!generatedContent) {
        showError("Generation Failed", "No recipe generated.");
        return;
      }

      const parsedData: RecipeOption[] = JSON.parse(generatedContent);
      //console.log("Parsed JSON: ", parsedData);

      generatedContent && setGeneratedRecipeOptions(parsedData);
      actionSheetRef.current?.show();
    } catch (error: any) {
      if (error.response?.status === 429) {
        showError(
          "Limit Reached",
          "Too many requests. Please wait a moment and try again.",
        );
      } else {
        showError("Error", "Something went wrong. Please try again.");
      }

      console.log("API Error:", error.response?.data || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const GenerateCompleteRecipe = async (option: any) => {
    actionSheetRef.current?.hide();
    setOpenLoading(true);

    const GENERATE_COMPLETE_RECIPE = recipePrompt.GENERATE_COMPLETE_RECIPE;

    try {
      /* // Call Gemini API
      const aiResponse = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent",
        {
          contents: [
            {
              parts: [
                {
                  text:
                    "RecipeName:" +
                    option?.recipeName +
                    "Description:" +
                    option?.description +
                    GENERATE_COMPLETE_RECIPE,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 1500,
            response_mime_type: "application/json",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": EXPO_PUBLIC_GEMINI_API_KEY,
          },
        },
      );

      const generatedContent: any =
        aiResponse.data?.candidates?.[0]?.content?.[0]?.text ||
        aiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No description generated"; */

        const generatedContent = `{
  "recipeName": "Spicy Garlic Chicken 🍗",
  "description": "A quick and tasty chicken recipe with garlic and chili. Perfect for dinner in under 30 minutes.",
  "category": ["Dinner"],
  "ingredients": [
    {"icon":"🍗","ingredient":"chicken","quantity":"500g"},
    {"icon":"🧄","ingredient":"garlic","quantity":"3 cloves"},
    {"icon":"🌶️","ingredient":"chili flakes","quantity":"1 tsp"},
    {"icon":"🫒","ingredient":"olive oil","quantity":"2 tbsp"},
    {"icon":"🥢","ingredient":"soy sauce","quantity":"2 tbsp"}
  ],
  "steps": [
    {"step":1,"instruction":"Cut the chicken into bite-sized pieces."},
    {"step":2,"instruction":"Heat olive oil in a pan and sauté garlic until fragrant."},
    {"step":3,"instruction":"Add chicken and cook until lightly browned."},
    {"step":4,"instruction":"Sprinkle chili flakes and pour soy sauce. Stir well."},
    {"step":5,"instruction":"Cook until chicken is fully done and serve hot."}
  ],
  "calories": 450,
  "cookTime": 25,
  "serveTo": 2,
  "imagePrompt": "A professional food photo of Spicy Garlic Chicken, plated elegantly on a white plate with fresh herbs garnish, rich colors, glistening chicken, overhead camera angle, soft natural lighting, kitchen background."
}
`

      console.log("Original: " + generatedContent);
      //console.log("Trimmed: " + generatedContent.trim());

      if (!generatedContent) {
        showError("Generation Failed", "No recipe generated.");
        return;
      }

      const parsedContent: Recipe = JSON.parse(generatedContent);
      console.log("Parsed JSON: ", parsedContent);

      console.log(parsedContent?.imagePrompt);
      const imageUrl = await GenerateAiImage(parsedContent?.imagePrompt);

      const insertedRecordResult = await SaveToDb(parsedContent, imageUrl);

      router.push({
        pathname: "/recipe-detail",
        params: {
          recipeData: JSON.stringify(insertedRecordResult),
        },
      });
    } catch (error: any) {
      if (error.response?.status === 429) {
        showError(
          "Limit Reached",
          "Too many requests. Please wait a moment and try again.",
        );
      } else {
        showError("Error", "Something went wrong. Please try again.");
      }

      console.log("API Error:", error.response?.data || error.message);
    } finally {
      setOpenLoading(false);
    }
  };

  const GenerateRecipeImageByAiGurulab = async (imagePrompt: string) =>
    await axios.post(
      AIGURULAB_BASE_URL + "/api/generate-image",
      {
        width: 1024,
        height: 1024,
        input: imagePrompt,
        model: "sdxl", //'flux'
        aspectRatio: "1:1", //Applicable to Flux model only
      },
      {
        headers: {
          "x-api-key": EXPO_PUBLIC_AIGURULAB_API_KEY, // API Key
          "Content-Type": "application/json", // Content Type
        },
      },
    );

  const GenerateAiImage = async (imagePrompt: string) => {
    const result = await GenerateRecipeImageByAiGurulab(imagePrompt);
    console.log(result.data.image); //Output Result: Base 64 Image
    return result.data.image;
  };

  const SaveToDb = async (content: Recipe, imageUrl: string) => {
    const result = await addRecipe(content, imageUrl);
    showSuccess("Success", "Recipe added successfully");
    return {
      ...content,
      recipeImage: imageUrl,
    }; // return the full object to pass to next page
  };

  return (
    <View style={[styles.container, { backgroundColor: containerBg }]}>
      <Image
        source={require("./../../assets/images/fryingpan.png")}
        style={styles.panImage}
      />
      <Text style={styles.heading}>
        Warm up your stove, and let's get cooking.!
      </Text>
      <Text style={styles.subheading}>Make something for your LOVE</Text>

      <TextInput
        style={[styles.textInput, { backgroundColor: inputBg }]}
        multiline={true}
        numberOfLines={3}
        placeholder="What you want to cook? Add ingredients etc.."
        onChangeText={(value) => setUserInputText(value)}
      />

      <RecipeGenerateBtn
        //label={"Generate Recipe"}
        label={isGenerating ? "Generating..." : "Generate Recipe"}
        onPress={() => onGenerateRecipe()}
        isLoading={isGenerating}
        icon={"sparkles"}
        //disabled={isLoading}
      />

      <LoadingDialog visible={openLoading} />
      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetContainer}>
          <Text style={styles.heading}>Select a recipe</Text>
          <View>
            {generatedRecipeOptions.map((recipe: any, index: any) => (
              <TouchableOpacity
                onPress={() => GenerateCompleteRecipe(recipe)}
                key={index}
                style={styles.recipeOptionContainer}
              >
                <Text
                  style={{
                    fontFamily: "outfit-bold",
                    fontSize: 15,
                    color: "#4A3428",
                  }}
                >
                  {recipe?.recipeName || "Classic Watalappan 🍮"}
                </Text>
                <Text
                  style={{
                    fontFamily: "outfit-regular",
                    color: "gray",
                  }}
                >
                  {recipe?.description ||
                    "A rich and creamy Sri Lankan dessert made with coconut milk and jaggery. It's infused with cardamom and nutmeg for a warm, aromatic flavor."}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ActionSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#FFF8F3",
    borderRadius: 25,
    display: "flex",
    alignItems: "center",
  },
  panImage: {
    marginTop: -5,
    width: 100,
    height: 100,
    marginBottom: 10,
    transform: [{ scaleX: -1 }, { rotate: "320deg" }],
  },
  heading: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    textAlign: "center",
    color: "#4A3428",
  },
  subheading: {
    fontFamily: "outfit-regular",
    fontSize: 16,
    color: "#4A3428",
    marginTop: 6,
  },
  textInput: {
    fontFamily: "outfit-regular",
    fontSize: 15,
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 15,
    height: 120,
    marginTop: 8,
    padding: 10,
    textAlignVertical: "top",
    color: "#4A3428",
  },
  actionSheetContainer: {
    padding: 25,
  },
  recipeOptionContainer: {
    padding: 15,
    borderWidth: 0.2,
    borderRadius: 15,
    marginTop: 15,
  },
});

export default CreateRecipe;
