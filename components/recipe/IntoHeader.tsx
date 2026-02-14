import { View, Text, Image, Switch } from 'react-native'
import React, { useContext, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { AuthContext } from '@/context/AuthContext'

const IntoHeader = () => {

    //const auth = getAuth()

    //const user = auth.currentUser

    const {user} = useContext(AuthContext) 
    const [isEnabled, setIsEnabled] = useState(false)
    
    //console.log(currentUser)
    //if (!user) throw new Error('User not authenticated.')


  return (
    <View style={{
            display: 'flex', 
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
        <View style={{
            display: 'flex', 
            flexDirection: "row",
            alignItems: 'center',
            gap: 8
        }}>
      <Image
        source={{ uri: user?.photoURL || "https://via.placeholder.com/100" }}
        style={{
            width: 45,
            height: 45,
            borderRadius: 99,
            borderWidth: 2,
            borderColor: "#E5D3B7"
        }}
      />
      <Text style={{
        fontFamily: 'outfit-semibold',
        fontSize: 20,
        color: '#4A3428'
      }}>
        Hello, {user?.displayName?.split(" ")[0] || "Foodie"}
      </Text>
    </View>

    <View style={{
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    }}>
        <Image 
        source={isEnabled ? require('./../../assets/images/veg.png') : require('./../../assets/images/nonveg.png')}
        style={{
            width: 25,
            height: 25
        }} 
        />
        
      <Switch
    value={isEnabled}
    onValueChange={() => setIsEnabled(!isEnabled)}
    trackColor={{ false: "#d1d5db", true: "#2E7D32" }} // background
    thumbColor={isEnabled ? "#ffffff" : "#ffffff"}   // circle
    />
    </View>

    </View>
  )
}

export default IntoHeader