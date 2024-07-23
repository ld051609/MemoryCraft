import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, {useState} from 'react'
import { TextInput } from 'react-native-gesture-handler'
import {auth} from '../services/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = async() => {
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('User account created & signed in!', user)
            navigation.navigate('Home');

        }).catch((error) => {
            if(error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password'){
                console.log('Email address or password is invalid!')
                Alert.alert('Email address or password is invalid!')
            }
            console.log(error.code, error.message)
        });
    }
    return (
        <View>
            <Text style={styles.title}>Login Page</Text>

            <View style={styles.floralImg}>
                <Image source={require(`../assets/images/login_puzzle.jpeg`)} style={{width: 320, height: 320, borderRadius: 200}} />

            </View>
            <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail}/>
            <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} secureTextEntry/>
            
            <View>
                <TouchableOpacity style={styles.loginBtn} onPress={login}>
                        <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.signUpContainer}>
                    <Text >Don't have an account?</Text> 
                    <TouchableOpacity style={styles.signUnBtn} onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.signUpText}>Sign up</Text>
                    </TouchableOpacity>   
                </View>

            </View>
            
        </View>
  )
}

export default Login
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
    loginBtn:{
        backgroundColor: '#EADFB8',
        padding: 10,
        marginHorizontal: 80,
        borderRadius: 70,
        marginVertical: 16,
    },
    loginText: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: "center",
    },
    signUpContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center'
    },
    signUnBtn:{
        backgroundColor: '#E88E9A',
        padding: 7,
        borderRadius: 20,

    },
    signUpText:{
        fontWeight: '600',
        textAlign: 'center',
        color: 'white'
    }
})