import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { Image } from 'expo-image'
import { blurhash } from '../constants/Common'

export default function ChatItem({ item, index, router, noBorder }) {
  const openChatRoom = () => {
    router.push({
      pathname: '/chatRoom',
      params: item,
    })
  }
  return (
    <TouchableOpacity
      onPress={openChatRoom}
      className={`flex-row justify-between items-center mx-2 gap-3 mb-4 pb-2 ${
        noBorder ? '' : 'border-b border-b-neutral-200'
      }`}
    >
      {/* <Image
        source={{ uri: item?.profileUrl }}
        style={{ height: hp(6), aspectRatio: 1, width: hp(6) }}
        className="rounded-full"
      /> */}

      <Image
        style={{
          height: hp(6),
          aspectRatio: 1,
          width: wp(10),
          borderRadius: 18,
        }}
        source={item?.profileUrl}
        placeholder={blurhash}
        transition={500}
      />

      {/* Name and Last Message */}
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-semibold text-neutral-800"
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            Time
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          Last Message
        </Text>
      </View>
    </TouchableOpacity>
  )
}
