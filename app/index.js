import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import PuzzleScreen from './PuzzleScreen'
import HomeScreen from './HomeScreen'
import ImageUpload from '../components/ImageUpload'
import ProfileScreen from './ProfileScreen'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login'
import Signup from '../components/Signup'
import { auth } from '../services/config'
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  function onAuthStateChanged(user) {
    setUser(user)
    if (initializing) setInitializing(false)
  }
  useEffect(() => {
      const subscriber = auth.onAuthStateChanged(onAuthStateChanged)
      return subscriber
  }, [])
  if (initializing) return null;
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      {user && <>
        <Tab.Screen name="Image Upload" component={ImageUpload} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </>}
    </Tab.Navigator>
  )
}

const App = () => {



  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Puzzle" component={PuzzleScreen} />

    </Stack.Navigator>
  )
}

export default App