import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Box from '../components/Box'
import Draggable from '../components/Draggable'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useSharedValue } from 'react-native-reanimated'

const arr = new Array(25).fill('').map((_, i) => i )
const COL = 5;
const MARGIN = 8;
const SIZE = Dimensions.get('window').width / COL - MARGIN;
const FULL_SIZE = Dimensions.get('window').width;   

const Puzzle = () => {
    const [blocks, setBlocks] = useState([]);
    // Get the positions of the blocks
    const positions = useSharedValue(
        arr.reduce((acc, item) => {
            acc[item] = item;
            return acc;
        }, {})
         
    );

    useEffect(() => {
        createPuzzleBlocks()
        
    },[])

    const createPuzzleBlocks = () => {
        const uri = "https://i.pinimg.com/736x/ef/57/03/ef570313df3a9b267cbee1a222962385.jpg";
        Image.getSize(uri, (width, height) => {
        // console.log(`width: ${width}, height: ${height}`);
        console.log(`FULL_SIZE: ${FULL_SIZE}`);
        const blockCopy = [];

        const blockSize = FULL_SIZE / COL;
        for (let i = 0; i < COL; i++) {
            for (let j = 0; j < COL; j++) {
                blockCopy.push({
                    uri,
                    width: FULL_SIZE,
                    height: FULL_SIZE,
                    x: i * blockSize,
                    y: j * blockSize,
                    number: i * COL + j,
                });
            }
        }
        setBlocks(blockCopy);
    
    })

  }
  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.wrap}>
            <GestureHandlerRootView style={styles.wrap}>

                <View style={styles.container}>
                    {blocks.map((block, item) => (
                        <Draggable key={item} positions={positions} id={item}>
                            <Box count={block} />                          
                        </Draggable> 
                    ))}
                </View>

            </GestureHandlerRootView>
        </SafeAreaView>
    </SafeAreaProvider>

  )
}

export default Puzzle

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
    },
    wrap: {
        flex: 1,
    },
});