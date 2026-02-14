import { View, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

const LoadingDialog = ({visible=false, text='Loading..'}) => {
  return (
    <Modal transparent visible={visible}>
        <View style={styles.overlay}>
            <View style={{
            padding: 20,
            borderRadius: 15,
            backgroundColor: "#8B593E",
            alignItems: 'center'
        }}>
            <ActivityIndicator size={'large'} color={"#FFFFFF"} />
      <Text style={styles.text}>{text}</Text>
    </View>
    </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    overlay:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000070'
    },
    text: {
        marginTop: 10,
        color: "#FFFFFF",
        fontSize: 16,
        fontFamily: 'outfit-regular'
    }
})

export default LoadingDialog