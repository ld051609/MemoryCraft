import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../services/config';    
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { arrayUnion } from 'firebase/firestore';

const ImageUpload = ({ navigation }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [userUid, setUserUid] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUserUid(uid);
            }
            setFile(null);
        });

        return () => unsubscribe();
    }, []);

    const pickImage = async () => {
        // Ask for permission to access the camera roll
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission Denied", "Sorry, we need camera roll permission to upload images!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            setFile(imageUri);
            setError(null);
            await uploadImage(imageUri);
        }
    };

    const uploadImage = async (uri) => {
        try {
            const response = await fetch(uri);
            if (!response.ok) {
                throw new Error("Image fetch failed!");
            }
            const blob = await response.blob();
    
            const storage = getStorage();
            const storageRef = ref(storage, `images/${Date.now()}`);
            const snapshot = await uploadBytes(storageRef, blob);
            console.log('Uploaded a blob or file!', snapshot);
    
            // Update Firestore with the new image URL
            const downloadURL = await getDownloadURL(storageRef);
            console.log(`Image URL: ${downloadURL}`);
            
            if (userUid) {
                const userDoc = doc(db, 'user', userUid); 
                await updateDoc(userDoc, {
                    imageFiles: arrayUnion(downloadURL)
                });
                Alert.alert("Image uploaded to the database successfully!");
                // redirect to profile page
                navigation.navigate('Profile');
            } else {
                setError("Failed to upload image. Please try again.");
                Alert.alert("Failed to upload image. Please try again.");
            }
        } catch (error) {
            console.log("Error uploading image: ", error.message);
            console.log("Error details: ", error);
            setError("Failed to upload image. Please try again.");
            Alert.alert("Failed to upload image. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Upload Image</Text>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/images/uploadPhoto.jpeg')} style={styles.uploadImage} />
                <TouchableOpacity onPress={pickImage} style={styles.button}>
                    <Text style={styles.buttonText}>Pick an image</Text>
                </TouchableOpacity>

                {file ? (
                    <View>
                        <Image source={{ uri: file }} style={styles.selectedImage} />
                    </View>
                ) : (
                    <Text>{error}</Text>
                )}
            </View>
        </View>
    );
};

export default ImageUpload;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    uploadImage: {
        width: 200,
        height: 200,
        borderRadius: 20,
    },
    button: {
        backgroundColor: '#6e48eb',
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    selectedImage: {
        width: 200,
        height: 200,
    },
});
