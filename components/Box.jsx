import React from 'react';
import { Dimensions, StyleSheet, View, Image, Text } from 'react-native';

const COL = 5;
const MARGIN = 8;
const SIZE = Dimensions.get('window').width / COL - MARGIN;
const FULL_SIZE = Dimensions.get('window').width;   

const Box = ({ count }) => {
  return (
    <View style={styles.container}>
      {}
      <Image
        source={{ uri: count.uri }}
        style={{
          width: count.width,
          height: count.height,
          position: 'absolute',
          left: -count.x,
          top: -count.y,
          
        }}
   
      />
      <Text style={styles.number}>{count.number}</Text>
    </View>
    
  );
};

export default Box;

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  number: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    color: 'black',
    fontSize: 12,
  },
});
