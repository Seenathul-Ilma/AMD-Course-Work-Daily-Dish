import axios from "axios";
import React, { useRef, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
//import OpenAI from "openai"
import RecipeGenerateBtn from "./RecipeGenerateBtn";

import prompt from "@/services/generateRecipePrompts";
import { RecipeOption } from "@/types/recipeOption";
import { useLoader } from "@/hooks/useLoader";

import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet"


//dotenv.config();

const EXPO_PUBLIC_GEMINI_API_KEY = process.env
  .EXPO_PUBLIC_GEMINI_API_KEY as string;

const CreateRecipe = () => {
  const [userInputText, setUserInputText] = useState<string>();
  const { showLoader, hideLoader, isLoading } = useLoader();

  const [generatedRecipeOptions, setGeneratedRecipeOptions] = useState()
  const actionSheetRef = useRef<ActionSheetRef>(null);


  const onGenerateRecipe = async () => {

    const GENERATE_OPTION_PROMPT = prompt.GENERATE_OPTION_PROMPT

    if (!userInputText || userInputText.trim() == "") {
      Alert.alert("Please enter your ingredients..!");
      return;
    }

    if (isLoading) {
      return;
    }

    showLoader();

    try {
      // Call Gemini API
      const aiResponse = await axios.post(
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
        "No description generated";

      console.log("Original: " + generatedContent);
      console.log("Trimmed: " + generatedContent.trim());

      if (!generatedContent) {
        Alert.alert("No recipe generated.");
        return;
      }

      const parsedData: RecipeOption[] = JSON.parse(generatedContent);
      console.log("Parsed JSON: ", parsedData);

    } catch (error: any) {
      if (error.response?.status === 429) {
        Alert.alert("Too many requests. Please wait a moment and try again.");
      } else {
        Alert.alert("Something went wrong. Please try again.");
      }

      console.log("API Error:", error.response?.data || error.message);
    } finally {
        hideLoader()
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/images/fryingpan.png")}
        style={styles.panImage}
      />
      <Text style={styles.heading}>
        Warm up your stove, and let's get cooking.!
      </Text>
      <Text style={styles.subheading}>Make something for your LOVE</Text>

      <TextInput
        style={styles.textInput}
        multiline={true}
        numberOfLines={3}
        placeholder="What you want to cook? Add ingredients etc.."
        onChangeText={(value) => setUserInputText(value)}
      />

      <RecipeGenerateBtn
        //label={"Generate Recipe"}
        label={isLoading ? "Generating..." : "Generate Recipe"}
        onPress={() => onGenerateRecipe()}
        isLoading={isLoading}
        //disabled={isLoading}
      />

      <ActionSheet ref={actionSheetRef}>
        <View>
          
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
  },
});

export default CreateRecipe;
