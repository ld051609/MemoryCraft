import { View, Text, SafeAreaView, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../services/config';
import { doc, getDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileScreen = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [userData, setUserData] = useState({});
  const [profileImg, setProfileImg] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  function onAuthStateChanged(user) {
    setUser(user);
    if (user) setUserUid(user.uid);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); // Unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (userUid) {
      getUserData();
    }
  }, [userUid]);

  if (initializing) return null;

  async function getUserData() {
    try {
      if (userUid) {
        
        const docRef = doc(db, 'user', userUid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          const data = docSnap.data();
          const name = `${data.firstName} ${data.lastName}`;
          const email = data.email;
          const dateCreated = data.dateCreated.toDate().toDateString();
          setUserData({ name, email, dateCreated });

          const images = data.imageFiles || [];
          setImageFiles(images);
          console.log('Images File for render:', images); 
        } else {
          console.log('No such document!');
        }
      }
    } catch (err) {
      console.error("Error fetching user data: ", err);
      setError("Failed to fetch user data.");
    }
  }

  const uploadProfileImage = async () => {
    try {
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
        setProfileImg(imageUri);
        // TODO: Update the user document with the new image URL
      }
    } catch (err) {
      console.error("Error uploading image: ", err);
      setError("Failed to upload image.");
    }
  };
  const startPuzzle = (image) => {
    console.log('Image props:', image);
    navigation.navigate('Puzzle', {image });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>View Your Portfolio</Text>
        
        <TouchableOpacity style={styles.profileImageContainer} onPress={uploadProfileImage}>
          <Image
            source={profileImg ? { uri: profileImg } : require('../assets/images/profile.png')}
            style={styles.profileImage}
          />
          <Text style={styles.changeProfileText}>Change Profile Picture</Text>
        </TouchableOpacity>
        
        <View style={styles.userInfoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Profile name:</Text>
            <Text style={styles.infoValue}>{userData.name}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{userData.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date:</Text>
            <Text style={styles.infoValue}>{userData.dateCreated}</Text>
          </View>
        </View>

        <View style={styles.galleryContainer}>
          <Text style={styles.galleryTitle}>Image Gallery</Text>
          {imageFiles.length > 0 ? (
            <View style={styles.gallery}>
              {imageFiles.map((image, index) => (
                <TouchableOpacity key={index} onPress={() => startPuzzle(image)}>
                  <Image source={{ uri: image }} style={styles.galleryImage}/>

                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={styles.noImagesText}>No images available</Text>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'white'
  },
  safeArea: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    alignSelf: 'center',
  },
  profileImageContainer: {
    marginVertical: 5,
    padding: 20,
    overflow: 'hidden',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    
  },
  changeProfileText: {
    textAlign: 'center',
    color: 'grey',
    marginTop: 10,

  },
  userInfoContainer: {
    backgroundColor: '#6e48eb',
    borderRadius: 30,
    padding: 16,
    width: '100%',
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  infoValue: {
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
    flex: 2,
  },
  galleryContainer: {
    width: '100%',
    marginVertical: 10,
  },
  galleryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  galleryImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  noImagesText: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
  },
});

export default ProfileScreen;
