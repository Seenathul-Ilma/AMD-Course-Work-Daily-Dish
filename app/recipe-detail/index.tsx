import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import RecipeIntro from '@/components/RecipeIntro'
import Ingredient from '@/components/Ingredient'

const RecipeDetail = () => {
    const {recipeData} = useLocalSearchParams()
    const recipe = JSON.parse(recipeData as string)
    const router = useRouter()
    console.log('----', recipe)
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
        
        <TouchableOpacity
          className="py-1 px-2 rounded-full"
          /* style={{
            backgroundColor: "#E5D3B7",
            alignItems: "center",
          }} */
          //onPress={() => handleShare()}
        >
          <View
            //className="rounded-full"
            //style={{ backgroundColor: "#E5D3B7" }}
          >
            <Ionicons name="share" size={24} color="#4A3428" />
          </View>
        </TouchableOpacity>
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
    </View>
        }
    />
  )
}

export default RecipeDetail