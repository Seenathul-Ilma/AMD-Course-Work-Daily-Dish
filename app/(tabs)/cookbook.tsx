import { View, Text, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import RecipeCard from '@/components/RecipeCard'
import { Recipe } from '@/types/recipe';
import { getAllRecipes, getUserCreatedRecipes } from '@/services/recipeService';

const Cookbook = () => {
    const [recipeList, setRecipeList] = useState<Recipe[]>([])
    const [loading, setLoading] = useState(false)
    //console.log("Category Name: ", categoryName)
  
    useEffect(() => {
      GetUserCreatedRecipes()
    }, [])
  
    const GetUserCreatedRecipes = async () => {
      setLoading(true)
      try{
        let recipes: Recipe[] = [];
        recipes = await getUserCreatedRecipes();
        setRecipeList(recipes)
        //console.log(recipes)
      } catch (error: any) {
  Alert.alert("Error", error?.message || "Something went wrong");
            console.error('Error fetching recipes:', error)
          } finally {
            setLoading(false)
          }
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
      <Text
        style={{
          fontFamily: "outfit-semibold",
          fontSize: 25,
          color: "#4A3428",
        }}
      >
        Cravings
      </Text>

      <FlatList data={recipeList}
      numColumns={2}
      refreshing={loading}
      onRefresh={GetUserCreatedRecipes}
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
  )
}

export default Cookbook