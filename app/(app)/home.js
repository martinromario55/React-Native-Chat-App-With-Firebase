import { View, Text, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { StatusBar } from 'expo-status-bar'
import ChatList from '../../components/ChatList'
import { getDocs, query, where } from 'firebase/firestore'
import { userRef } from '../../firebaseConfig'

export default function Home() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (user?.uid) getusers()
  }, [])

  const getusers = async () => {
    // Fetch users
    const q = query(userRef, where('userId', '!=', user?.uid))

    const querySnapshot = await getDocs(q)
    let data = []
    querySnapshot.forEach(doc => {
      data.push({ ...doc.data() })
    })

    // console.log('got users:', data)
    setUsers(data)
  }

  // console.log('user data:', user)
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {users.length > 0 ? (
        <ChatList currentUser={user} users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  )
}
