import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'

export default function MessageList({ messages, currentUser, scrollViewRef }) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
      ref={scrollViewRef}
    >
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} currentUser={currentUser} />
      ))}
    </ScrollView>
  )
}
