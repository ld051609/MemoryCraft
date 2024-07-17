import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const COL = 5;
const MARGIN = 8;
const SIZE = Dimensions.get('window').width / COL - MARGIN;
const Box = ({count}) => {
  const backgroundColor = count % 2 === 0 ? '#6e48eb' : '#c0a946';
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={styles.text}>{count}</Text>
    </View>
  );
};

export default Box;

const styles = StyleSheet.create({
  container: {
    width: SIZE - MARGIN,
    height: SIZE - MARGIN,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#cde9e4',
  },
});