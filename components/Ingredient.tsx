import { View, Text, FlatList } from 'react-native'
import React from 'react'

const Ingredient = ({ ingredients }: any) => {
  return (
    <View style={{
        marginTop: 15
    }}>
      <View style={{
        display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
      }}>
        <Text style={{
          fontFamily: "outfit-bold",
          fontSize: 18,
          color: "#4A3428"
        }}>
            Ingredients
        </Text>
        <Text style={{
            fontFamily: "outfit-regular",
          fontSize: 15,
          color: "#4A3428"
        }}>{ingredients?.length} Items</Text>
      </View>

        <FlatList 
        data={ingredients}
        renderItem={({item,index}) => (
            <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 7,
                    padding: 6
                }}>
                    <Text style={{
                        fontSize: 17,
                        padding: 5,
                        backgroundColor: '#E5D3B7',
                        borderRadius: 99
                    }}>{item?.icon}</Text>

                    <Text style={{
                        fontFamily: 'outfit-regular',
                        fontSize: 16,
                        color: '#4A3428'
                    }}>{item?.ingredient}</Text>
                </View>
                <Text style={{
                    fontFamily: 'outfit-regular',
                    fontSize: 15,
                    color: 'gray'
                }}>{item?.quantity}</Text>
            </View>
        )}
        />

    </View>
  )
}

export default Ingredient