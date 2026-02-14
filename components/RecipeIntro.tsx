import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const RecipeIntro = ({ recipe }: any) => {
  return (
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
          fontSize: 17,
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
