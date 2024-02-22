import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'
import { router } from 'expo-router'

export default function ChatList({ users, currentUser }) {
  return (
    <View className="flex-1 px-2">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={item => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            item={item}
            index={index}
            noBorder={index + 1 == users.length}
            router={router}
            currentUser={currentUser}
          />
        )}
      />
    </View>
  )
}
