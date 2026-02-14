import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { addToFavourite, removeFromFavouriteByRecipeId } from "@/services/userFavouriteService";

const RecipeIntro = ({ recipe }: any) => {
    const [addRecipeToFavourite, setAddRecipeToFavourite] = useState(recipe?.isSaved || false);

   const AddToFavourites = async () => {
    console.log(recipe?.id)
  try {
    if (!recipe?.id) {
        //console.log(recipe.id)
      Alert.alert("Error", "Recipe ID not found.");
      return;
    }

    await addToFavourite(recipe.id);
    Alert.alert("Added to your cravings..!");
    setAddRecipeToFavourite(true)
  } catch (error: any) {
    Alert.alert("Error", error.message || "Failed to add to favourites.");
  }
};

 const RemoveRecipeFromFavourites = async () => {
    console.log(recipe?.id)
  try {
    if (!recipe?.id) {
        //console.log(recipe.id)
      Alert.alert("Error", "Recipe ID not found.");
      return;
    }

    await removeFromFavouriteByRecipeId(recipe.id);
    setAddRecipeToFavourite(false)
  } catch (error: any) {
    Alert.alert("Error", error.message || "Failed to add to favourites.");
  }
};

  return (
    <View>

        
            <View>
            <Image
        source={{
          uri: recipe?.recipeImage.replace(
            "ai-guru-lab-images/",
            "ai-guru-lab-images%2f",
          ),
        }}
        style={{
          width: "100%",
          height: 240,
          borderRadius: 20,
        }}
      />
      <LinearGradient 
                colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
                style={{
                    position: 'absolute',
                    width: 50,
                    borderRadius: 50,
                    padding: 7,
                    right: 10,
                    bottom: 10
                }}
        >
            <TouchableOpacity
                      onPress={()=> !addRecipeToFavourite ? AddToFavourites() : RemoveRecipeFromFavourites()}
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {!addRecipeToFavourite ? <Ionicons
                        name="heart"
                        size={30}
                        color="#FFFFFF"
                      /> : <Ionicons
                        name="heart"
                        size={30}
                        color="#ed1b2e"
                      />}
                    </TouchableOpacity>
        </LinearGradient>
            
        </View>



      <Text
        style={{
          width: "100%",
          fontFamily: "outfit-semibold",
          fontSize: 25,
          marginTop: 7,
          color: "#4A3428",
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {recipe?.recipeName}
      </Text>

      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 18,
          marginTop: 10,
          color: "#4A3428",
        }}
      >
        Description
      </Text>
      <Text
        style={{
          fontFamily: "outfit-regular",
          fontSize: 17,
          marginTop: 3,
          color: "gray",
        }}
      >
        {recipe?.description}
      </Text>

      <View
        style={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <View style={styles.featureContainer}>
          <Ionicons name="leaf" size={18} color="#8B593E" />
          <View>
            <Text
              style={styles.mainText}
            >
              {recipe?.calories} Cal
            </Text>
            {/* <Text style={styles.subText}>Calories</Text> */}
          </View>
        </View>

        <View style={styles.featureContainer}>
          <Ionicons name="timer" size={18} color="#8B593E" />
          <View>
            <Text
              style={styles.mainText}
            >
              {recipe?.cookTime} Mins
            </Text>
            {/* <Text style={styles.subText}>Time</Text> */}
          </View>
        </View>

        <View style={styles.featureContainer}>
          <Ionicons name="people" size={18} color="#8B593E" />
          <View>
            <Text
              style={styles.mainText}
            >
              {recipe?.serveTo} Pax
            </Text>
            {/* <Text style={styles.subText}>Serve</Text> */}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  featureContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    padding: 13,
    backgroundColor: "#E5D3B7",
    borderRadius: 15,
  },
  mainText: {
                fontFamily: "outfit-regular",
                fontSize: 16,
                color: "#8B593E",
              },
              subText: {
                fontFamily: "outfit-regular",
                fontSize: 14,
                color: "gray",
                textAlign: 'center'
              }
});

export default RecipeIntro;
