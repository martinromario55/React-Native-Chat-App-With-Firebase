import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import ChatRoomHeader from '../../components/ChatRoomHeader'
import MessageList from '../../components/MessageList'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { Feather } from '@expo/vector-icons'
import CustomKeyboardView from '../../components/CustomKeyboardView'

export default function ChatRoom() {
  const item = useLocalSearchParams()
  const [messages, setMessages] = useState([])
  // console.log('got items data:', item)
  return (
    <CustomKeyboardView inChat={true}>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View className="h-3 border-b border-neutral-300" />

        <View className="flex-1 justify-betwee overflow-visible">
          <View className="flex-1">
            <MessageList messages={messages} />
          </View>
        </View>

        <View style={{ marginBottom: hp(1.7) }} className="pt-2">
          <View className="flex-row mx-2 justify-between p-2 border border-neutral-300 rounded-3xl pl-5">
            <TextInput
              placeholder="Type message..."
              className="flex-1"
              style={{ fontSize: hp(2) }}
            />

            <TouchableOpacity className="bg-neutral-200 p-2 mr-[1px] rounded-full">
              <Feather name="send" size={hp(2.7)} color="#737373" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  )
}
