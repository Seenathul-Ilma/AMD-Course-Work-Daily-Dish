import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'

const RecipeSteps = ({ steps }: any) => {
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
                Steps
            </Text>
        
          </View>
    
            <FlatList 
            data={steps}
            renderItem={({item,index}) => (
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 7,
                    alignItems: 'center',
                    marginTop: 10,
                    padding: 10,
                    borderRadius: 15,
                    borderWidth: 0.2,
                    flex: 1
                }}>
                    <Text style={[styles.text,{
                        padding: 10,
                        backgroundColor: '#E5D3B7',
                        width: 40,
                        textAlign: 'center',
                        borderRadius: 7
                    }]}>{item.step}</Text>
                    <Text style={[styles.text, {flex: 1}]}>{item.instruction}</Text>
                </View>
            )}
            />
    
        </View>
  )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'outfit-regular',
        fontSize: 17,
        color: '#4A3428',
        //flex: 1
    }
})

export default RecipeSteps