import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Share,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import RecipeIntro from "@/components/RecipeIntro";
import Ingredient from "@/components/Ingredient";
import RecipeSteps from "@/components/RecipeSteps";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import CreateRecipe from "@/components/CreateRecipe";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const generateRecipeHTML = (recipe: any) => {
  const ingredientsHtml = recipe.ingredients
    .map(
      (ing: any) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #F0E6D8; font-size: 14px;">${ing.icon}</td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #F0E6D8; color: #4A3428; font-weight: 500; font-size: 14px;">${ing.ingredient}</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #F0E6D8; text-align: right; color: #8B593E; font-size: 14px;">${ing.quantity}</td>
      </tr>
    `,
    )
    .join("");

  const stepsHtml = recipe.steps
    .map(
      (step: any) => `
      <div style="margin-bottom: 14px; padding: 12px; background-color: #FFF8F3; border-left: 4px solid #E58C4F; border-radius: 4px; page-break-inside: avoid;">
        <span style="background-color: #E5D3B7; color: #4A3428; font-weight: bold; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 10px; font-size: 14px; vertical-align: top;">
          ${step.step}
        </span>
        <span style="color: #666; line-height: 1.6; font-size: 14px; display: inline-block; width: calc(100% - 50px);">${step.instruction}</span>
      </div>
    `,
    )
    .join("");

  const recipeImage = recipe.recipeImage.replace(
    "ai-guru-lab-images/",
    "ai-guru-lab-images%2f",
  );

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${recipe.recipeName}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { margin: 0; padding: 0; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: #4A3428;
            line-height: 1.5;
            background: white;
          }
          
          @page { 
            size: A4;
            margin: 12mm;
          }
          
          .page {
            width: 100%;
            page-break-after: always;
            margin: 0;
            padding: 0;
          }
          
          .page:last-child {
            page-break-after: avoid;
          }
          
          .header {
            background-color: #8B593E;
            color: white;
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            page-break-inside: avoid;
          }
            
          .header h1 { font-size: 28px; font-weight: 700; margin: 0; }
          
          .recipe-image {
            width: 100%;
            height: 700px;  
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 12px;
            page-break-inside: avoid;
            display: block;
            flex: 1;  
           }
          
          .stats {
            display: flex;
            justify-content: space-around;
            padding: 12px;
            background-color: #F9F5F0;
            border-radius: 8px;
            margin-bottom: 12px;
            gap: 10px;
            page-break-inside: avoid;
          }
          .stat-item {
            text-align: center;
            flex: 1;
          }
          .stat-value {
            font-size: 18px;
            display: block;
            margin-bottom: 3px;
          }
          .stat-label {
            font-size: 11px;
            color: #8B593E;
            text-transform: uppercase;
            font-weight: 600;
          }
          
          .section {
            margin-bottom: 16px;
            page-break-inside: avoid;
          }
          .section h2 {
            font-size: 18px;
            color: #E58C4F;
            margin-bottom: 10px;
            padding-bottom: 8px;
            border-bottom: 2px solid #E5D3B7;
            font-weight: 600;
          }
          
          .description {
            background-color: #FFF8F3;
            padding: 12px;
            border-radius: 6px;
            border-left: 4px solid #E58C4F;
            font-size: 14px;
            line-height: 1.6;
            color: #555;
          }
          
          .ingredients-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 6px;
          }
          .ingredients-table th {
            background-color: #E5D3B7;
            color: #4A3428;
            padding: 10px;
            text-align: left;
            font-weight: 600;
            font-size: 13px;
            border: none;
            page-break-inside: avoid;
          }
          .ingredients-table tbody {
            page-break-inside: avoid;
          }
          .ingredients-table td {
            padding: 10px;
            border-bottom: 1px solid #F0E6D8;
            font-size: 14px;
          }
          
          .steps-container { 
            margin-top: 0;
          }
          
          .footer {
            text-align: center;
            padding: 12px 0;
            border-top: 2px solid #E5D3B7;
            font-size: 12px;
            color: #8B593E;
            margin-top: 16px;
            font-weight: 500;
            page-break-inside: avoid;
          }
          
          @media print {
            body { margin: 0; padding: 0; background: white; orphans: 1; widows: 1; }
            .page { page-break-after: always; }
            .page:last-child { page-break-after: avoid; }
          }
        </style>
      </head>
      <body>
        <!-- PAGE 1: Header, Image, Stats, Description -->
        <div class="page">
          <div class="header">
            <h1>${recipe.recipeName}</h1>
          </div>
          
          <img src="${recipeImage}" alt="${recipe.recipeName}" class="recipe-image" />
          
          <div class="stats">
            <div class="stat-item">
              <span class="stat-value">🍃</span>
              <span class="stat-label">${recipe.calories} Cal</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">⏱️</span>
              <span class="stat-label">${recipe.cookTime} min</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">👥</span>
              <span class="stat-label">Serves ${recipe.serveTo}</span>
            </div>
          </div>
          
          <div class="section">
            <h2>About This Recipe</h2>
            <div class="description">${recipe.description}</div>
          </div>
        </div>
        
        <!-- PAGE 2: Ingredients -->
        <div class="page">
          <div class="header">
            <h1>Ingredients</h1>
          </div>
          
          <div class="section">
            <table class="ingredients-table">
              <thead>
                <tr>
                  <th style="width: 30px;"></th>
                  <th>Item</th>
                  <th style="width: 100px; text-align: right;">Quantity</th>
                </tr>
              </thead>
              <tbody>${ingredientsHtml}</tbody>
            </table>
          </div>
        </div>
        
        <!-- PAGE 3: Instructions & Footer -->
        <div class="page">
          <div class="header">
            <h1>Instructions</h1>
          </div>
          
          <div class="steps-container">
            ${stepsHtml}
          </div>
          
          <div class="footer">
            <p>🍴 Enjoy this delicious recipe!</p>
            <p style="font-size: 10px; margin-top: 4px; color: #A0A0A0;">Generated from DailyDish</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

const RecipeDetail = () => {
  const { recipeData } = useLocalSearchParams();
  const recipe = JSON.parse(recipeData as string);
  const router = useRouter();

  console.log("----", recipe);

  // 1. Share simple text to social media
  const handleShareText = async () => {
    try {
      const ingredientsList = recipe.ingredients
        .map((i: any) => `  • ${i.icon} ${i.ingredient} - ${i.quantity}`)
        .join("\n");

      const stepsList = recipe.steps
        .map((s: any) => `  ${s.step}. ${s.instruction}`)
        .join("\n\n");

      const message = `
*${recipe.recipeName}*

*Description*
${recipe.description}

*Recipe Details*
  🍃 Calories: ${recipe.calories}
  ⏱️ Time: ${recipe.cookTime} minutes
  👥 Servings: ${recipe.serveTo} people

*Ingredients*
${ingredientsList}

*Cooking Instructions*
${stepsList}

Try this delicious recipe!
Made with ❤️ from DailyDish
    `.trim();

      await Share.share({
        message,
        title: `Check out: ${recipe.recipeName}`,
        url: recipe.recipeImage,
      });
    } catch (error: any) {
      if (error?.message !== "User did not share") {
        console.error("Error sharing text:", error);
      }
    }
  };

  // 2. Open system print dialog
  const handlePrint = async () => {
    const html = generateRecipeHTML(recipe);
    await Print.printAsync({ html });
  };

  // 3. Generate PDF and share it (e.g., via WhatsApp/Email)
  const handleSharePDF = async () => {
    const html = generateRecipeHTML(recipe);
    const { uri } = await Print.printToFileAsync({ html });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View
          style={{
            padding: 20,
            //paddingTop: insets.top + 60, // safe area + header height
            backgroundColor: "#FFF8F3",
            height: "100%",
          }}
        >
          <View className="flex-row items-center justify-between mb-5">
            <TouchableOpacity
              className="flex-row items-center py-1 px-2 rounded-full"
              style={{
                backgroundColor: "#E5D3B7",
                alignItems: "center",
              }}
              onPress={() => router.back()}
            >
              <View
                className="mr-2 rounded-full"
                style={{ backgroundColor: "#E5D3B7" }}
              >
                <Ionicons name="chevron-back" size={24} color="#4A3428" />
              </View>
              <Text
                style={{
                  fontFamily: "outfit-regular",
                  color: "#4A3428",
                  fontSize: 15,
                  paddingRight: 8,
                }}
              >
                Go Back
              </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", gap: 10 }}>
              {/* Print Button */}
              <TouchableOpacity
                onPress={handlePrint}
                style={{
                  backgroundColor: "#E5D3B7",
                  padding: 8,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="print-outline" size={22} color="#4A3428" />
              </TouchableOpacity>

              {/* Share PDF Button */}
              <TouchableOpacity
                onPress={handleSharePDF}
                style={{
                  backgroundColor: "#E5D3B7",
                  padding: 8,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="share-social-outline"
                  size={22}
                  color="#4A3428"
                />
              </TouchableOpacity>

              {/* Quick Text Share Button */}
              <TouchableOpacity
                onPress={handleShareText}
                style={{
                  backgroundColor: "#E5D3B7",
                  padding: 8,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="chatbox-ellipses-outline"
                  size={22}
                  color="#4A3428"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* <Text
        style={{
          fontFamily: "outfit-semibold",
          fontSize: 25,
          color: "#4A3428",
        }}
      >
        Dish Secrets
      </Text> */}

          <RecipeIntro recipe={recipe} />
          <Ingredient ingredients={recipe?.ingredients} />
          <RecipeSteps steps={recipe?.steps} />

            <Text style={{
                marginTop: 15,
                fontFamily: 'outfit-regular',
                fontSize: 16,
                textAlign: 'center',
                color: 'gray'
            }}>Ready to try another recipe?</Text>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <KeyboardAwareScrollView
              keyboardDismissMode="on-drag"
              showsVerticalScrollIndicator={false}
            >
              <CreateRecipe containerBg="#FFFFFF" inputBg="#FFF8F3" />
            </KeyboardAwareScrollView>
          </TouchableWithoutFeedback>
        </View>
      }
    />
  );
};

export default RecipeDetail;
