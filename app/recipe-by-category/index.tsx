import { View, Text, TouchableOpacity, Alert, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getRecipesByCategory } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import RecipeCard from "@/components/RecipeCard";

const RecipeByCategory = () => {
  const router = useRouter();
  const { categoryName } = useLocalSearchParams();
  const [recipeList, setRecipeList] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  //console.log("Category Name: ", categoryName)

  useEffect(() => {
    GetRecipeListByCategory()
  }, [])

  const GetRecipeListByCategory = async () => {
    setLoading(true)
    try{
      let recipes: Recipe[] = [];
      recipes = await getRecipesByCategory(categoryName as string);
      console.log(`Recipes from ${categoryName} collection: `, recipes.length)
      setRecipeList(recipes)
      //console.log(recipes)
    } catch (error: any) {
Alert.alert("Error", error?.message || "Something went wrong");
          console.error('Error fetching categories:', error)
        } finally {
          setLoading(false)
        }

    /* try {
          let cats: Category[] = [];
          cats = await getAllCategories();
          setCategories(cats);
        } catch (error) {
          Alert.alert("Error", "Error fetching tasks");
          //console.error('Error fetching categories:', error)
        } finally {
          hideLoader();
        } */
  }


  return (
    <View
      style={{
        padding: 20,
        //paddingTop: insets.top + 60, // safe area + header height
        backgroundColor: "#FFF8F3",
        height: "100%",
      }}
    >
      <TouchableOpacity
        className="flex-row items-center mb-5 py-1 px-2 rounded-full self-start"
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
      <Text
        style={{
          fontFamily: "outfit-semibold",
          fontSize: 25,
          color: "#4A3428",
        }}
      >
        Browse {categoryName} Recipes
      </Text>

      <FlatList data={recipeList}
      numColumns={2}
      refreshing={loading}
      onRefresh={GetRecipeListByCategory}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => (
        <View style={{
          flex: 1
        }}>
          <RecipeCard recipe={item} />
        </View>
      )}
      />
    </View>
  );
};

export default RecipeByCategory;
