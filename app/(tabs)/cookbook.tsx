import RecipeCard from "@/components/recipe/RecipeCard";
import { useAppNotification } from "@/hooks/useAppNotification";
import { getUserCreatedRecipes } from "@/services/recipeService";
import { getAllFavourites } from "@/services/userFavouriteService";
import { Recipe } from "@/types/recipe";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Cookbook = () => {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const { showError } = useAppNotification();

  useEffect(() => {
    GetUserCreatedRecipes();
    //UserFavouriteRecipeList();
  }, []);

  const GetUserCreatedRecipes = async () => {
    setLoading(true);
    try {
      let recipes: Recipe[] = [];
      recipes = await getUserCreatedRecipes();
      setRecipeList(recipes);
      //console.log(recipes)
    } catch (error: any) {
      showError("Error", error?.message || "Something went wrong");
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const UserFavouriteRecipeList = async () => {
    setLoading(true);
    try {
      const data = await getAllFavourites();
      setRecipeList(data);
    } catch (error: any) {
      showError("Error", error?.message || "Failed to load favourites.");
      console.log("Favourite fetch error:", error);
    } finally {
      setLoading(false);
    }
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
        Cravings
      </Text>

      <View
        style={{
          marginBottom: 6,
          marginTop: 8,
          gap: 10,
          justifyContent: "space-around",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#E5D3B7",
          borderRadius: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setActiveTab(1);
            GetUserCreatedRecipes();
          }}
          style={[styles.tabContainer, { opacity: activeTab == 1 ? 1 : 0.4 }]}
        >
          <Ionicons name="sparkles" size={20} color="#4A3428" />
          <Text style={styles.tabText}>My Kitchen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setActiveTab(2);
            UserFavouriteRecipeList();
          }}
          style={[styles.tabContainer, { opacity: activeTab == 2 ? 1 : 0.4 }]}
        >
          <Ionicons name="heart" size={20} color="#4A3428" />
          <Text style={styles.tabText}>My Cravings</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={recipeList}
        numColumns={2}
        refreshing={loading}
        //{ opacity: activeTab == 1 ? 1 : 0.4 }
        onRefresh={
          activeTab == 1 ? GetUserCreatedRecipes : UserFavouriteRecipeList
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
            }}
          >
            <RecipeCard recipe={item} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 10,
    borderRadius: 10,
  },
  tabText: {
    fontFamily: "outfit-regular",
    fontSize: 18,
    color: "#4A3428",
  },
});

export default Cookbook;
