import { Alert, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import IntoHeader from "@/components/IntoHeader";
import CreateRecipe from "@/components/CreateRecipe";
import CategoryList from "@/components/CategoryList";
import LatestRecipes from "@/components/LatestRecipes";
import { Recipe } from "@/types/recipe";
import { getLatestRecipes } from "@/services/recipeService";

export default function Home() {
  const [latestRecipes, setLatestRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  //console.log("Category Name: ", categoryName)

  useEffect(() => {
    GetLatestRecipes();
  }, []);

  const GetLatestRecipes = async () => {
    setLoading(true);
    try {
      let recipes: Recipe[] = [];
      recipes = await getLatestRecipes(10 as number);
      setLatestRecipes(recipes);
      //console.log(recipes)
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Something went wrong");
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
      console.log(latestRecipes)
    }
  };

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      refreshing={loading}
      onRefresh={GetLatestRecipes}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={
        <ScrollView
          style={{
            height: "100%",
            backgroundColor: "#FFFFFF",
            padding: 20,
          }}
        >
          {/* Intro */}
          <IntoHeader />

          {/* Recipe Generator UI */}
          {/* <CreateRecipe /> */}
          <CreateRecipe containerBg="#FFF8F3" inputBg="#FFFFFF" />

          {/* Category */}
          <CategoryList />

          <LatestRecipes recipes={latestRecipes} />
        </ScrollView>
      }
    />
  );
}

/* const Home = () => {

  return (
    <ScrollView style={{
      height: '100%',
      backgroundColor: '#FFFFFF',
      padding: 20
    }}>

      <IntoHeader />

      <CreateRecipe />
      
      <CategoryList />

    </ScrollView>
  )
}

export default Home */
