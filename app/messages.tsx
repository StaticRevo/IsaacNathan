import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { lightTheme, darkTheme } from './styles/HomePageStyles';
import { useTheme } from './contexts/themeContext/themeContext';
import styles from './styles/MessagesStyles';
import { useAuth } from './contexts/authContext/authContext';
import { getFirestore, collection, getDocs, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

interface UserDetails {
    uid: string;
    username: string;
    profilePicture: string;
}

const MessagingScreen: React.FC = () => {
    const router = useRouter();
    const { isDarkTheme } = useTheme();
    const theme = isDarkTheme ? darkTheme : lightTheme;
    const authContext = useAuth();
    const [userIds, setUserIds] = useState<string[]>([]);
    const [userDetails, setUserDetails] = useState<UserDetails[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
    const [savedChats, setSavedChats] = useState<UserDetails[]>([]);

    useEffect(() => {
        if (authContext?.currentUser) {
            console.log('Current UID:', authContext.currentUser.uid);
            fetchSavedChats(authContext.currentUser.uid);
        } else {
            console.log('User not authenticated.');
        }
    }, [authContext?.currentUser]);

    const fetchAllUserIds = async () => {
        const db = getFirestore();
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const userIdsList = usersSnapshot.docs.map(doc => doc.id);
        console.log('Fetched user IDs:', userIdsList); // Log all user IDs for debugging
        setUserIds(userIdsList);

        const userDetailsList = usersSnapshot.docs.map(doc => ({
            uid: doc.id,
            username: doc.data().username,
            profilePicture: doc.data().profilePicture
        }));
        setUserDetails(userDetailsList);
    };

    const fetchSavedChats = async (uid: string) => {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            setSavedChats(userData.savedChats || []);
        }
    };

    const handleUserSelect = async (user: UserDetails) => {
        const db = getFirestore();
        const currentUserUid = authContext?.currentUser?.uid;
        if (currentUserUid) {
            const userRef = doc(db, 'users', currentUserUid);
            await updateDoc(userRef, {
                savedChats: arrayUnion(user)
            });
            router.push(`/chat/${user.uid}`);
        }
    };

    useEffect(() => {
        fetchAllUserIds();
    }, []);

    const filteredUserDetails = userDetails.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
        user.uid !== authContext?.currentUser?.uid
    );

    if (!authContext) {
        return <Text style={{ color: theme.textColor }}>Error: Auth context is undefined.</Text>;
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('./home')}>
                    <FontAwesome name="arrow-left" size={24} color={theme.textColor} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.textColor }]}>Messages</Text>
                
                <TouchableOpacity onPress={() => router.push('/addingNewUser')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: 120, color: theme.textColor }}>Add user: </Text>
                    <FontAwesome name="user" size={24} color={theme.textColor} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={[styles.searchInput, { color: theme.textColor }]}
                    placeholder="Search for a username..."
                    placeholderTextColor="#666"
                    value={searchQuery}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Saved Chats List */}
            {!isSearchFocused && (
            <ScrollView style={styles.chatsList}>
                {savedChats.map(user => (
                    <TouchableOpacity key={user.uid} style={styles.chatItem} onPress={() => router.push(`/chat/${user.uid}`)}>
                        <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                            <Text style={{ color: theme.textColor }}>{user.username}</Text>
                            <TouchableOpacity onPress={() => {/* Add your delete handler here */}}>
                                <FontAwesome name="trash" size={24} color={theme.textColor} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        )}

            {/* Search Results List */}
            {isSearchFocused && (
                <ScrollView style={styles.chatsList}>
                    {filteredUserDetails.map(user => (
                        <TouchableOpacity key={user.uid} style={styles.chatItem} onPress={() => handleUserSelect(user)}>
                            <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
                            <Text style={{ color: theme.textColor }}>{user.username}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default MessagingScreen;