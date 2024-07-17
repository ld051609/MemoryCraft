import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Box from '../components/Box'
import Draggable from '../components/Draggable'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useSharedValue } from 'react-native-reanimated'

const arr = new Array(25).fill('').map((_, i) => i )

const App = () => {
    const positions = useSharedValue(
        arr.reduce((acc, item) => {
            acc[item] = item;
            return acc;
        }, {})
         
    );
    console.log(positions)
  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.wrap}>
            <GestureHandlerRootView style={styles.wrap}>

                <View style={styles.container}>
                    {arr.map((item) => (
                        <Draggable key={item} positions={positions} id={item}>
                            <Box key={item} count={item}/>
                            
                        </Draggable> 
                    ))}
                </View>
            </GestureHandlerRootView>
        </SafeAreaView>
    </SafeAreaProvider>

  )
}

export default App

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
    },
    wrap: {
        flex: 1,
        backgroundColor: 'white',
    },

  });