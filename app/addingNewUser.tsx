import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { lightTheme, darkTheme } from './styles/HomePageStyles';
import { useTheme } from './contexts/themeContext/themeContext';
import styles from './styles/AddingNewUserStyles';
import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from './contexts/authContext/authContext';
import { FontAwesome } from '@expo/vector-icons';

interface UserDetails {
    uid: string;
    username: string;
    profilePicture: string;
}

const AddingNewUserScreen: React.FC = () => {
    const router = useRouter();
    const { isDarkTheme } = useTheme();
    const theme = isDarkTheme ? darkTheme : lightTheme;
    const authContext = useAuth();
    const [username, setUsername] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<UserDetails[]>([]);

    useEffect(() => {
        fetchAllUserDetails();
    }, []);

    const fetchAllUserDetails = async () => {
        const db = getFirestore();
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const userDetailsList = usersSnapshot.docs.map(doc => ({
            uid: doc.id,
            username: doc.data().username,
            profilePicture: doc.data().profilePicture
        }));
        setUserDetails(userDetailsList);
    };

    const handleAddUser = async () => {
        if (!username.trim()) {
            Alert.alert('Error', 'Username cannot be empty');
            return;
        }

        try {
            const db = getFirestore();
            const newUserRef = doc(db, 'users', username);
            await setDoc(newUserRef, {
                username,
                profilePicture: '', // Add default profile picture URL or leave it empty
                savedChats: []
            });
            Alert.alert('Success', 'User added successfully');
            router.push('/messages');
        } catch (error) {
            console.error('Error adding user: ', error);
            Alert.alert('Error', 'Failed to add user');
        }
    };

    const filteredUserDetails = userDetails.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.title, { color: theme.textColor }]}>Start a New Chat</Text>
            <TextInput
                style={[styles.input, { color: theme.textColor }]}
                placeholder="Enter username you want to add"
                placeholderTextColor="#666"
                value={username}
                onChangeText={setUsername}
            />
            <TouchableOpacity onPress={handleAddUser} style={styles.button}>
                <Text style={styles.buttonText}>Add User</Text>
            </TouchableOpacity>
         
            <ScrollView style={styles.chatsList}>
                {filteredUserDetails.map(user => (
                    <TouchableOpacity key={user.uid} style={styles.chatItem} onPress={() => router.push(`/chat/${user.uid}`)}>
                        <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
                        <Text style={{ color: theme.textColor }}>{user.username}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default AddingNewUserScreen;