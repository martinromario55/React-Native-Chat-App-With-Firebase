import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'

export default function Loading({ size }) {
  const animationRef = useRef()

  useEffect(() => {
    animationRef.current?.play()

    // Or set a specific startFrame and endFrame with:
    // animationRef.current?.play(30, 120)
  }, [])

  return (
    <View style={{ height: size, aspectRatio: 1 }}>
      <LottieView
        style={{ flex: 1 }}
        ref={animation => (animationRef.current = animation)}
        source={require('../assets/images/loading.json')}
        loop={true}
        autoPlay={true}
      />
    </View>
  )
}
