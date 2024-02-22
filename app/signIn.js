import { View, Text, Image, TextInput, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { StatusBar } from 'expo-status-bar'
import { Feather, Entypo } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { router } from 'expo-router'
import Loading from '../components/Loading'
import CustomKeyboardView from '../components/CustomKeyboardView'
import { useAuth } from '../context/authContext'

export default function SignIn() {
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    // Empty values
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign In', 'Please fill all the fields!')
      return
    }
    // login process
    try {
      setLoading(true)
      const response = await login(emailRef.current, passwordRef.current)
      setLoading(false)
      if (!response.success) {
        Alert.alert('Sign In', response.msg)
      }
    } catch (error) {
      Alert.alert('Sign In', error.message)
    }
    setLoading(false)
  }

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />

      <View
        style={{ paddingTop: hp(8), paddingBottom: wp(5) }}
        className="flex-1 gap-2"
      >
        {/* SignIn Image */}
        <View className="items-center">
          <Image
            style={{ height: hp(25) }}
            resizeMode="contain"
            source={require('../assets/images/login.jpg')}
          />
        </View>

        <View className="gap-2">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Sign In
          </Text>

          {/* Form */}
          <View className="gap-x-1 gap-y-3 mx-2">
            <View>
              <View
                style={{ height: hp(7) }}
                className="flex-row px-4  bg-neutral-100 items-center rounded-xl"
              >
                <Feather name="mail" size={hp(2.7)} color="gray" />

                <TextInput
                  onChangeText={value => (emailRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700 px-2 text-neutral-500"
                  placeholder="Email address"
                  placeholderTextColor="gray"
                />
              </View>
            </View>

            <View>
              <View
                style={{ height: hp(7) }}
                className="flex-row px-4 bg-neutral-100 items-center rounded-xl"
              >
                <Feather name="lock" size={hp(2.7)} color="gray" />

                <TextInput
                  onChangeText={value => (passwordRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold px-2"
                  placeholder="Password"
                  placeholderTextColor="gray"
                  secureTextEntry
                />
              </View>
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-right text-neutral-700 pt-2"
              >
                Forgot password?
              </Text>
            </View>

            {/* Submit */}
            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(10)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleLogin}
                  className="bg-indigo-500 rounded-xl justify-center items-center"
                  style={{ height: hp(6.5) }}
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-white font-bold tracking-wider"
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Sign Up Text */}
            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-500"
              >
                Don't have an account?{' '}
              </Text>
              <Pressable onPress={() => router.push('signUp')}>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-indigo-500"
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  )
}
