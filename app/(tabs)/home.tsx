import CategoryList from "@/components/recipe/CategoryList";
import CreateRecipe from "@/components/recipe/CreateRecipe";
import IntoHeader from "@/components/recipe/IntoHeader";
import LatestRecipes from "@/components/recipe/LatestRecipes";
import { useAppNotification } from "@/hooks/useAppNotification";
import { getLatestRecipes } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native";

export default function Home() {
  const [latestRecipes, setLatestRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const { showError } = useAppNotification();
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
      showError("Error", error?.message || "Something went wrong");
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
      console.log(latestRecipes);
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
