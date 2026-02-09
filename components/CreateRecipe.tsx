import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import RecipeGenerateBtn from './RecipeGenerateBtn'

const CreateRecipe = () => {
    const [userInputText, setUserInputText] = useState<string>()
  return (
    <View style={styles.container}>
        <Image source={require('./../assets/images/fryingpan.png')}
            style={styles.panImage}
        />
        <Text style={styles.heading}>Warm up your stove, and let's get cooking.!</Text>
        <Text style={styles.subheading}>Make something for your LOVE</Text>
    
        <TextInput 
            style={styles.textInput}
            multiline={true}
            numberOfLines={3}
            placeholder='What you want to cook? Add ingredients etc..' 
            onChangeText={(value)=> setUserInputText(value)}
            />
    
        <RecipeGenerateBtn label={'Generate Recipe'} />

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#FFF8F3',
        borderRadius: 25,
        display: 'flex',
        alignItems: 'center'
    },
    panImage: {
        marginTop: -5,
        width: 100,
        height: 100,
        marginBottom: 10,
        transform: [
            { scaleX: -1 },
            { rotate: '320deg' }
        ]
    },
    heading: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#4A3428'
    },
    subheading: {
        fontFamily: 'outfit-regular',
        fontSize: 16,
        color: "#4A3428",
        marginTop: 6
    },
    textInput: {
        fontFamily: 'outfit-regular',
        fontSize: 15,
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderRadius: 15,
        height: 120,
        marginTop: 8,
        padding: 10,
        textAlignVertical: 'top'
    }
})

export default CreateRecipe