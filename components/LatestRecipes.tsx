import { View, Text, StyleSheet, Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Recipe } from '@/types/recipe'
import { getLatestRecipes } from '@/services/recipeService'
import RecipeCardHome from './RecipeCardHome'

const LatestRecipes = () => {
  const [latestRecipes, setLatestRecipes] = useState<Recipe[]>([])
      const [loading, setLoading] = useState(false)
      //console.log("Category Name: ", categoryName)
    
      useEffect(() => {
        GetLatestRecipes()
      }, [])
    
      const GetLatestRecipes = async () => {
        setLoading(true)
        try{
          let recipes: Recipe[] = [];
          recipes = await getLatestRecipes(10 as number);
          setLatestRecipes(recipes)
          //console.log(recipes)
        } catch (error: any) {
    Alert.alert("Error", error?.message || "Something went wrong");
              console.error('Error fetching recipes:', error)
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
    <View style={{
      marginTop: 20
    }}>
    
    <Text style={styles.title}>Latest Recipes</Text>

    <FlatList
      data={latestRecipes}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}      
      renderItem={({item, index}) => (
        <View>
          <RecipeCardHome recipe={item} />
        </View>
      )}
      />
    
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "outfit-semibold",
    fontSize: 17,
    color: "#4A3428",
    marginTop: 5
  }
});

export default LatestRecipes