import { View, Text, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { useRouter } from 'expo-router';

const RecipeCard = ({recipe}: any) => {
    const router = useRouter()

  return (
    <TouchableOpacity
    onPress={()=>router.push({
        pathname: '/recipe-detail',
        params: {
            recipeData: JSON.stringify(recipe)
        }
    })} 
    style={{
        margin: 5
    }}>
      <Image source={{uri: recipe?.recipeImage}} 
        style={{
            width: '100%',
            height: 220,
            borderRadius: 20
        }}
      />

      <LinearGradient
        // Background Linear Gradient
        colors={['transparent','rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
        style={{
        position: 'absolute',
        bottom: 0,
        padding: 10,
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
      }}
      >

      <View>
        <Text style={{
            fontFamily: 'outfit-regular',
            color: '#FFFFFF',
            fontSize: 16
        }}>{recipe?.recipeName}</Text>
      </View>
</LinearGradient>

    </TouchableOpacity>
  )
}

export default RecipeCard