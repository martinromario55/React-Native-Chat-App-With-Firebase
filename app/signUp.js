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

export default function SignUp() {
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const usernameRef = useRef('')
  const profileRef = useRef('https://rb.gy/pr08ha')
  const { register } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    // Empty values
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !profileRef.current
    ) {
      Alert.alert('Sign Up', 'Please fill all the fields!')
      return
    }
    // register process
    setLoading(true)
    const response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current
    )
    setLoading(false)
    if (response.success) {
      Alert.alert(
        'Sign Up',
        'Your account has been created! Please login to continue.',
        [
          {
            text: 'Login',
            onPress: () => {
              router.push('signIn')
            },
          },
        ]
      )
    } else {
      Alert.alert('Sign Up', response.msg)
    }
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
            source={require('../assets/images/register.jpg')}
          />
        </View>

        <View className="gap-2">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Sign Up
          </Text>

          {/* Form */}
          <View className="gap-x-1 gap-y-3 mx-2">
            <View
              style={{ height: hp(7) }}
              className="flex-row px-4  bg-neutral-100 items-center rounded-xl"
            >
              <Feather name="user" size={hp(2.7)} color="gray" />

              <TextInput
                onChangeText={value => (usernameRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700 px-2 text-neutral-500"
                placeholder="username"
                placeholderTextColor="gray"
              />
            </View>

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

            <View
              style={{ height: hp(7) }}
              className="flex-row px-4  bg-neutral-100 items-center rounded-xl"
            >
              <Feather name="image" size={hp(2.7)} color="gray" />

              <TextInput
                onChangeText={value => (profileRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700 px-2 text-neutral-500"
                placeholder="Profile url"
                placeholderTextColor="gray"
              />
            </View>

            {/* Submit */}
            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(10)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleRegister}
                  className="bg-indigo-500 rounded-xl justify-center items-center"
                  style={{ height: hp(6.5) }}
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-white font-bold tracking-wider"
                  >
                    Sign Up
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
                Already have an account?{' '}
              </Text>
              <Pressable onPress={() => router.push('signIn')}>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-indigo-500"
                >
                  Sign In
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  )
}
