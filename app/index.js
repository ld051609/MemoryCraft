import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import PuzzleScreen from './PuzzleScreen'
import HomeScreen from './HomeScreen'
import ImageUpload from '../components/ImageUpload'
const Tab = createBottomTabNavigator()
const App = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Puzzle" component={PuzzleScreen} />
        <Tab.Screen name="ImageUpload" component={ImageUpload} />
    </Tab.Navigator>
  )
}

export default App