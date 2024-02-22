import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, Stack, router, useSegments } from 'expo-router'
import { AuthContextProvider, useAuth } from '../context/authContext'
import { MenuProvider } from 'react-native-popup-menu'

const MainLayout = () => {
  const { isAuthenticated } = useAuth()
  const segments = useSegments()

  useEffect(() => {
    // Check if user is authenticated or not
    if (typeof isAuthenticated == 'undefined') return
    const inApp = segments[0] == '(app)'

    if (isAuthenticated && !inApp) {
      // Redirect to home screen
      router.replace('home')
    } else if (isAuthenticated == false) {
      // Redirect to login screen
      router.replace('signIn')
    }
  }, [isAuthenticated])

  return <Slot />
}

export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  )
}
