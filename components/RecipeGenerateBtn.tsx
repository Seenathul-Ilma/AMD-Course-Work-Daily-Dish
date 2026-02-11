import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons"

const RecipeGenerateBtn = ({label, onPress, isLoading=false}:any) => {
    
  return (
    <TouchableOpacity
                onPress={onPress}
                style={{
                    backgroundColor: '#8B593E',
                    padding: 10,
                    borderRadius: 15,
                    marginTop: 20,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    justifyContent: 'center'
                }}
              >
                {isLoading ? <ActivityIndicator  size={24} color="#FFFFFF" /> : <Ionicons name="sparkles" size={24} color="#FFFFFF" />}
                <Text style={{
                fontFamily: "outfit-semibold"
              }} className="text-white text-lg text-center">
                  {label}
                </Text>
              </TouchableOpacity>
  )
}

export default RecipeGenerateBtn