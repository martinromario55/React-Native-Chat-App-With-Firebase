import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'

export default function StartPage() {
  return (
    <View className="bg-rose-500 flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="gray" />
    </View>
  )
}
