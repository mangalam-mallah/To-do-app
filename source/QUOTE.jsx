import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
const QUOTE = () => {
  return (
    <View style = {{alignItems : 'center'}}>
      <Image 
      source={require('./assets/Quote.jpg')}
      style = {{height : 550, width : 300}}
      />
      <Text style = {{fontSize : 24, fontWeight : '900'}}>Don’t wait, start listing your tasks!</Text>
    </View>
  )
}

export default QUOTE

const styles = StyleSheet.create({})