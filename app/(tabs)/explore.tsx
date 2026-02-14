import RecipeCard from "@/components/recipe/RecipeCard";
import { useAppNotification } from "@/hooks/useAppNotification";
import { getAllRecipes } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

const Explore = () => {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const { showError } = useAppNotification();
  //console.log("Category Name: ", categoryName)

  useEffect(() => {
    GetAllRecipes();
  }, []);

  const GetAllRecipes = async () => {
    setLoading(true);
    try {
      let recipes: Recipe[] = [];
      recipes = await getAllRecipes();
      setRecipeList(recipes);
      //console.log(recipes)
    } catch (error: any) {
      showError("Error", error?.message || "Something went wrong");
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }

    /* try {
          let cats: Category[] = [];
          cats = await getAllCategories();
          setCategories(cats);
        } catch (error) {
          showError("Error", "Error fetching tasks");
          //console.error('Error fetching categories:', error)
        } finally {
          hideLoader();
        } */
  };

  return (
    <View
      style={{
        padding: 20,
        //paddingTop: insets.top + 60, // safe area + header height
        backgroundColor: "#FFF8F3",
        height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-semibold",
          fontSize: 25,
          color: "#4A3428",
        }}
      >
        Explore
      </Text>

      <FlatList
        data={recipeList}
        numColumns={2}
        refreshing={loading}
        onRefresh={GetAllRecipes}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              marginTop: 5,
            }}
          >
            <RecipeCard recipe={item} />
          </View>
        )}
      />
    </View>
  );
};

export default Explore;
