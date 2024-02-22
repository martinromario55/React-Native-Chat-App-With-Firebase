import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
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
import { useAuth } from '../../context/authContext'
import { getRoomId } from '../../constants/Common'
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'
import { db } from '../../firebaseConfig'

export default function ChatRoom() {
  const item = useLocalSearchParams() //Second user
  const { user } = useAuth() //Logged in user
  const [messages, setMessages] = useState([])
  const textRef = useRef('')
  const inputRef = useRef(null)
  const scrollViewRef = useRef(null)

  // console.log('got items data:', item)

  useEffect(() => {
    createRoomIfNotExists()

    // Fetch messages
    let roomId = getRoomId(user?.userId, item?.userId)
    const docRef = doc(db, 'rooms', roomId)
    const messgageRef = collection(docRef, 'messages')
    const q = query(messgageRef, orderBy('createdAt', 'asc'))

    let unsub = onSnapshot(q, snapshot => {
      let allMessages = snapshot.docs.map(doc => {
        return doc.data()
      })
      setMessages([...allMessages])
    })

    const KeyboardDidShowListner = Keyboard.addListener(
      'keyboardDidShow',
      updateScrollView
    )

    return () => {
      unsub()
      KeyboardDidShowListner.remove()
    }
  }, [])

  useEffect(() => {
    updateScrollView()
  }, [messages])

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true })
    }, 100)
  }

  const createRoomIfNotExists = async () => {
    // roomId
    let roomId = getRoomId(user?.userId, item?.userId)

    await setDoc(doc(db, 'rooms', roomId), {
      roomId,
      cretedAt: Timestamp.fromDate(new Date()),
    })
  }

  const handleSendMessage = async () => {
    let message = textRef.current.trim()
    if (!message) return

    try {
      let roomId = getRoomId(user?.userId, item?.userId)
      const docRef = doc(db, 'rooms', roomId)
      const messgageRef = collection(docRef, 'messages')

      textRef.current = ''
      if (inputRef) inputRef?.current?.clear()

      const newDoc = await addDoc(messgageRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      })

      // console.log('new message id:', newDoc.id)
    } catch (error) {}
  }

  // console.log('messages', messages)
  return (
    <CustomKeyboardView inChat={true}>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View className="h-3 border-b border-neutral-300" />

        <View className="flex-1 justify-betwee overflow-visible">
          <View className="flex-1">
            <MessageList
              scrollViewRef={scrollViewRef}
              messages={messages}
              currentUser={user}
            />
          </View>
        </View>

        <View style={{ marginBottom: hp(1.7) }} className="pt-2">
          <View className="flex-row mx-2 justify-between p-2 border border-neutral-300 rounded-3xl pl-5">
            <TextInput
              onChangeText={value => (textRef.current = value)}
              placeholder="Type message..."
              className="flex-1"
              style={{ fontSize: hp(2) }}
              ref={inputRef}
            />

            <TouchableOpacity
              onPress={handleSendMessage}
              className="bg-neutral-200 p-2 mr-[1px] rounded-full"
            >
              <Feather name="send" size={hp(2.7)} color="#737373" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  )
}
