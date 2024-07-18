import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';


const ImageUpload = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    
    const pickImage = async () => {
        // Ask for permission to access the camera roll
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                "Permission Denied", 
                `Sorry, we need camera roll permission to upload images!`
            )
            return;
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();
            // console.log(result);
            
            if (!result.canceled) {
                imageFile = result.assets[0].uri;
                // console.log(imageFile);

                setFile(imageFile);
                setError(null);
            }
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Upload Image
      </Text>

      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>
          Pick an image
        </Text>
      </TouchableOpacity>

      {
        file ? (
            <View>
                <Image source={{uri: file}} style={{width: 200, height: 200}} />
            </View>
        ) : (
            <Text>
                {error}
            </Text> 
        )
      }
    </View>
  )
}

export default ImageUpload
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#6e48eb',
        padding: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
})