import { View, Text, StyleSheet, Image} from 'react-native'
import React, {useState, useEffect} from 'react'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '../services/config'
const HomeScreen = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }
  useEffect(() => {
      const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
  })
  // Prevents the component from rendering its content until the authentication state is determined.
  if (initializing) return null;
  return (
    <GestureHandlerRootView >

      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome to Puzzle Memories</Text>
        <Text style={styles.paragraph}>Here, you can turn your uploaded pictures into puzzles, bringing back cherished memories piece by piece.</Text>
        <Image 
          source={require('../assets/images/puzzle_portrait.png')} 
          style={{width: 390, height: 350, marginTop: 40, marginBottom: 20}}

        />

        {!user ? 
          <View style={{flexDirection: 'column', justifyContent: 'center', width: 300, alignItems: 'center', gap: 10}}>
            <TouchableOpacity style={{backgroundColor: '#e6ccff', padding: 15, alignSelf: 'center', borderRadius: 10}} onPress={() => navigation.navigate('Signup')}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Get Started</Text>
            </TouchableOpacity>

            <View style={{display:'flex', justifyContent:'center', alignItems: 'center', flexDirection:'row', gap: 7}}>
              <Text style={{fontSize: 14}}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>Log in</Text>
              </TouchableOpacity>
            </View>

          </View>
          :
          <></>
        
      }




    </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default HomeScreen
const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    paragraph: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 30,
        lineHeight: 20
  
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: 'white',
    }
})