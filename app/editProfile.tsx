import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './contexts/authContext/authContext';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import editProfileStyles from './styles/EditProfileStyles';
import { lightTheme, darkTheme } from './styles/HomePageStyles';
import { useTheme } from './contexts/themeContext/themeContext';
import { UserDetails } from './contexts/authContext/authContext';

const EditProfile: React.FC = () => {
    const authContext = useAuth();
    const router = useRouter();
    const { isDarkTheme } = useTheme();
    const theme = isDarkTheme ? darkTheme : lightTheme;

    if (!authContext) {
        return <Text style={[editProfileStyles.errorText, { color: theme.textColor }]}>Error: Auth context is undefined. Ensure you are wrapping your app in AuthProvider.</Text>;
    }

    const { userDetails, setUserDetails } = authContext;

    if (!userDetails) {
        return <Text style={[editProfileStyles.errorText, { color: theme.textColor }]}>No user details available</Text>;
    }

    const [username, setUsername] = useState(userDetails.username || '');
    const [email, setEmail] = useState(userDetails.email || '');
    const [image, setImage] = useState<string>(userDetails.profilePicture || '');
    const [loading, setLoading] = useState(false);
    const db = getFirestore();

    const saveProfile = async () => {
        if (!username.trim() || !email.trim()) {
            Alert.alert('Validation Error', 'Username and email cannot be empty.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            Alert.alert('Validation Error', 'Please enter a valid email address.');
            return;
        }

        setLoading(true);

        try {
            const updatedDetails = { ...userDetails, username, email, profilePicture: image };

            // Save to Firestore
            const userDocRef = doc(db, 'users', userDetails.uid);
            await setDoc(userDocRef, updatedDetails, { merge: true });

            // Fetch updated data to sync
            const updatedDoc = await getDoc(userDocRef);
            if (updatedDoc.exists()) {
                setUserDetails(updatedDoc.data() as UserDetails);
            }

            Alert.alert('Success', 'Profile updated successfully!');
            router.back(); // Navigate back to the profile screen
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled && result.assets?.length > 0) {
                const selectedImage = result.assets[0];
                setImage(selectedImage.uri);
            }
        } catch (error) {
            console.error('Image selection error:', error);
            Alert.alert('Error', 'Something went wrong while selecting an image.');
        }
    };

    return (
        <View style={[editProfileStyles.container, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[editProfileStyles.header, { color: theme.textColor }]}>Edit Profile</Text>
            <View style={editProfileStyles.profileImageContainer}>
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={{ uri: image || 'https://via.placeholder.com/150' }}
                        style={editProfileStyles.profileImage}
                    />
                </TouchableOpacity>
                <Text style={[editProfileStyles.changePictureText, { color: theme.textColor }]}>Change Profile Picture</Text>
            </View>
            <TextInput
                style={[editProfileStyles.input, { color: theme.textColor, borderColor: theme.textColor }]}
                placeholder="Username"
                placeholderTextColor={theme.textColor}
                value={username}
                onChangeText={setUsername}
                accessibilityLabel="Edit Username"
            />
            <TextInput
                style={[editProfileStyles.input, { color: theme.textColor, borderColor: theme.textColor }]}
                placeholder="Email"
                placeholderTextColor={theme.textColor}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                accessibilityLabel="Edit Email"
            />
            {loading ? (
                <ActivityIndicator size="large" color={theme.buttonTextColor} style={editProfileStyles.loadingIndicator} />
            ) : (
                <TouchableOpacity
                    style={[editProfileStyles.saveButton, { backgroundColor: theme.buttonBackgroundColor }]}
                    onPress={saveProfile}
                    accessibilityLabel="Save Changes"
                >
                    <Text style={[editProfileStyles.saveButtonText, { color: theme.buttonTextColor }]}>Save Changes</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity
                style={[editProfileStyles.cancelButton, { backgroundColor: theme.buttonBackgroundColor }]}
                onPress={() => router.back()}
                accessibilityLabel="Cancel Changes"
            >
                <Text style={[editProfileStyles.cancelButtonText, { color: theme.buttonTextColor }]}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditProfile;