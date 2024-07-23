import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from '../services/config';
import {doc, setDoc, Timestamp} from "firebase/firestore"

const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState('');

  const signup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User account created!', user);

      // Add the user to the database
      const docData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        dateCreated: Timestamp.fromDate(new Date()), // Using the current timestamp
        imageFiles: []
      };

      await setDoc(doc(db, 'user', user.uid), docData);
      navigation.navigate('Home');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('Email address already in use!');
        Alert.alert('Email address already in use!');
      } else if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
        console.log('Email address or password is invalid!');
        Alert.alert('Email address or password is invalid!');
      } else {
        console.log(error.code, error.message);
        Alert.alert(`Error: ${error.code}`, error.message);
      }
    }
  };


  return (
    <View>
          <Text style={styles.title}>Signup Page</Text>

          <View style={styles.floralImg}>
              <Image source={require(`../assets/images/signup_puzzle.jpeg`)} style={{width: 270, height: 270, borderRadius: 200}} />

          </View>
          <TextInput style={styles.input} placeholder="First Name" onChangeText={setFirstName}/>
          <TextInput style={styles.input} placeholder="Last Name" onChangeText={setLastName}/>
          <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail}/>
          <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} secureTextEntry/>
          
          <View>
              <TouchableOpacity style={styles.signupBtn} onPress={signup} >
                      <Text style={styles.signupText}>Sign up</Text>
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                  <Text >Already have an account?</Text> 
                  <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
                      <Text style={styles.loginText}>Log in</Text>
                  </TouchableOpacity>   
              </View>

          </View>
          
      </View>
  )
}

export default Signup
const styles = StyleSheet.create({
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 20
  },
  input: {
      borderWidth: 1,
      borderColor: 'black',
      margin: 10,
      padding: 10,
      height: 40,
  },
  floralImg:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  signupBtn:{
      backgroundColor: '#EADFB8',
      padding: 10,
      marginHorizontal: 80,
      borderRadius: 70,
      marginVertical: 16,
  },
  signupText: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: "center",
  },
  loginContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'center'
  },
  loginBtn:{
      backgroundColor: '#E88E9A',
      padding: 7,
      borderRadius: 20,

  },
  loginText:{
      fontWeight: '600',
      textAlign: 'center',
      color: 'white'
  }
})