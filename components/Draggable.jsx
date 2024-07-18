import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, useAnimatedReaction } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'



const Draggable = ({children, positions, id}) => {
    const COL = 5;
    const MARGIN = 8;
    const SIZE = Dimensions.get('window').width / COL - MARGIN;
    // get the coordinates of the box
    const getCoordinates = (index) => {
        'worklet';
        return{
            x: (index % COL) * SIZE,
            y: Math.floor((index) / COL) * SIZE
        }
    }

    // get the index of the box
    const getIndex = (x, y) => {
        'worklet';
        const col = Math.floor(x / SIZE);
        const row = Math.floor(y / SIZE);
        return row * COL + col;
    }

    const position = getCoordinates(positions.value[id]);
    const translateX = useSharedValue(position.x);
    const translateY = useSharedValue(position.y);
    const contextX = useSharedValue(0);
    const contextY = useSharedValue(0);
    const isGestureActive = useSharedValue(false);

    // Update the positon of box based on the dependency change - positions.value[id]
    useAnimatedReaction(
        () => positions.value[id],
        newIndex => {
            const newCoordinates = getCoordinates(newIndex); // calculate the new position from the newIndex
            translateX.value = withSpring(newCoordinates.x);
            translateY.value = withSpring(newCoordinates.y);
        }
    )
  
    const onDrag = Gesture.Pan()
        .onStart(() => {
            contextX.value = translateX.value;
            contextY.value = translateY.value;
            isGestureActive.value = true;
        })
        .onChange((event) => {
            
            translateX.value = contextX.value + event.translationX;
            translateY.value = contextY.value + event.translationY;
            const oldIndex = positions.value[id];
            const newIndex = getIndex(translateX.value, translateY.value);
            if(oldIndex !== newIndex){
                const idToSwap = Object.keys(positions.value).find(key => positions.value[key] === newIndex);
                if(idToSwap !== undefined){
                    const newPositions = { ...positions.value }; // copy of the positions array
                    newPositions[id] = newIndex;
                    newPositions[idToSwap] = oldIndex;
                    positions.value = newPositions;
                }
            }
        }) 
        .onEnd(() => {
            isGestureActive.value = false;
        })
        .onFinalize(() => {
            translateX.value = withSpring(getCoordinates(positions.value[id]).x);
            translateY.value = withSpring(getCoordinates(positions.value[id]).y);
        })

  
    
    const animatedStyle = useAnimatedStyle(() => {
        const zIndex = isGestureActive.value ? 100 : 0;
        const scale = isGestureActive.value ? 1.1 : 1;
        return {
            zIndex,
            margin: MARGIN,
            position: 'absolute',
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale },
            ],
            
        };
    });

  return (
    <Animated.View >
        <GestureDetector gesture={onDrag}>
            <Animated.View style={[animatedStyle]}>
                {children}
            </Animated.View>
        </GestureDetector>
    </Animated.View>
  )
}

export default Draggable
