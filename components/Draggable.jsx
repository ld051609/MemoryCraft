import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedReaction } from 'react-native-reanimated'
import { Gesture, GestureDetector, PanGestureHandler } from 'react-native-gesture-handler'



const Draggable = ({children, positions, id}) => {
    
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const contextX = useSharedValue(0);
    const contextY = useSharedValue(0);

    const isGestureActive = useSharedValue(false);
  
    const onDrag = Gesture.Pan()
        .onStart(() => {
            contextX.value = translateX.value;
            contextY.value = translateY.value;
            isGestureActive.value = true;
        })
        .onUpdate((event) => {
            translateX.value = contextX.value + event.translationX;
            translateY.value = contextY.value + event.translationY;


        }) 
        .onFinalize(() => {
            isGestureActive.value = false;
        });
  
    
    const animatedStyle = useAnimatedStyle(() => {
        const zIndex = isGestureActive.value ? 100 : 0;
        const scale = isGestureActive.value ? 1.1 : 1;
        return {
            zIndex,
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale },
            ],
            
        };
    });

  return (
        <GestureDetector gesture={onDrag}>
            <Animated.View style={[animatedStyle]}>
                {children}
            </Animated.View>
        </GestureDetector>
  )
}

export default Draggable