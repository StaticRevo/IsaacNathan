import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import styles from '../styles/ChatStyles';
import { lightTheme, darkTheme } from '../styles/HomePageStyles';
import { useTheme } from '../contexts/themeContext/themeContext';
import { useAuth } from '../contexts/authContext/authContext';

interface Message {
    text: string;
    senderId: string;
    timestamp: string;
    receiverId: string;
}

interface Chat {
    id: string;
    userIds: string[];
    messages: Message[];
}

interface UserDetails {
    uid: string;
    username: string;
    profilePicture: string;
}

const Chat: React.FC = () => {
    const { id } = useLocalSearchParams() as { id: string };
    const router = useRouter();
    const { isDarkTheme } = useTheme();
    const theme = isDarkTheme ? darkTheme : lightTheme;
    const authContext = useAuth();
    const [chat, setChat] = useState<Chat | null>(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [receiverUsername, setReceiverUsername] = useState<string>('Unknown User');
    const flatListRef = useRef<FlatList>(null);
    const [userDetails, setUserDetails] = useState<UserDetails[]>([]);

    useEffect(() => {
        const fetchChat = async () => {
            if (!id) return;

            console.log('Fetching chat with ID:', id); // Log the chat ID

            const db = getFirestore();
            const chatDocRef = doc(db, 'chats', id);
            console.log('Chat document reference:', chatDocRef.path); // Log the document reference path

            const chatDoc = await getDoc(chatDocRef);
            if (chatDoc.exists()) {
                const chatData = chatDoc.data() as Chat;
                console.log('Chat data:', chatData);
                setChat(chatData);
                const username = getReceiverUsername(chatData.userIds);
                setReceiverUsername(username);
            } else {
                console.error('No such chat!');
            }
            setLoading(false);
        };

        fetchChat();
        fetchAllUserIds();
    }, [id, authContext?.currentUser]);

    const fetchAllUserIds = async () => {
        const db = getFirestore();
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const userIdsList = usersSnapshot.docs.map(doc => doc.id);
        console.log('Fetched user IDs:', userIdsList); // Log all user IDs for debugging

        const userDetailsList = usersSnapshot.docs.map(doc => ({
            uid: doc.id,
            username: doc.data().username,
            profilePicture: doc.data().profilePicture
        }));

        {/*/ Seeing all the usernames availabes //*this is just for a debug ghax bug wara bug dalwaqt nigu bugsbunny*/}
        let usernames = '';
        let count = 1;
        userDetailsList.forEach(user => {
            usernames += ` ${count++} = ${user.username}  , `; // Added extra space after username
        });
        console.log(`The usernames that I'm talking about are:\n ${usernames}`);
        setUserDetails(userDetailsList);
    };

    const getReceiverUsername = (userIds: string[]) => {
        if (!authContext?.currentUser || !userIds) return 'errorerrorerror kollox error';
        const receiverId = userIds.find(uid => uid !== authContext.currentUser?.uid);
        if (receiverId) {
            const user = userDetails.find(user => user.uid === receiverId);
            if (user) {
                return user.username;
            }
            return `User with UID: ${receiverId}`; // Display the UID if username is not found
        }
    };

    const sendMessage = async () => {
        if (!message.trim()) return;

        const db = getFirestore();
        const chatRef = doc(db, 'chats', id);
        const receiverId = chat?.userIds?.find(uid => uid !== authContext?.currentUser?.uid) || 'receiverId';
        const newMessage: Message = {
            text: message,
            senderId: authContext?.currentUser?.uid || 'currentUserId', // Replace with actual user ID
            timestamp: new Date().toISOString(),
            receiverId: receiverId,
        };

        try {
            const chatDoc = await getDoc(chatRef);
            if (chatDoc.exists()) {
                await updateDoc(chatRef, {
                    messages: arrayUnion(newMessage),
                });
            } else {
                await setDoc(chatRef, {
                    userIds: [authContext?.currentUser?.uid || 'currentUserId', receiverId],
                    messages: [newMessage],
                });
            }
            console.log('Message sent:', newMessage);

            // Update local chat state
            setChat(prevChat => {
                if (prevChat) {
                    return {
                        ...prevChat,
                        messages: [...prevChat.messages, newMessage],
                    };
                }
                return {
                    id,
                    userIds: [authContext?.currentUser?.uid || 'currentUserId', receiverId],
                    messages: [newMessage],
                };
            });

            setMessage('');
            flatListRef.current?.scrollToEnd({ animated: true });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: theme.backgroundColor }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={90} // Adjust based on header height
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    {/* Header Section */}
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Text style={styles.backButtonText}>{"<"}</Text>
                        </TouchableOpacity>
                        {chat && authContext?.currentUser && (
                            <Text style={[styles.username, { color: theme.textColor }]}>
                                {receiverUsername}
                            </Text>
                        )}
                    </View>

                    {/* Messages Section */}
                    <View style={styles.messagesContainer}>
                        {loading ? (
                            <ActivityIndicator size="large" color={theme.buttonBackgroundColor} />
                        ) : chat ? (
                            <FlatList
                                ref={flatListRef}
                                data={chat.messages}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item: msg }) => (
                                    <View
                                        style={[
                                            styles.message,
                                            {
                                                backgroundColor:
                                                    msg.senderId === authContext?.currentUser?.uid
                                                        ? theme.buttonBackgroundColor
                                                        : '#f1f1f1',
                                                alignSelf:
                                                    msg.senderId === authContext?.currentUser?.uid
                                                        ? 'flex-end'
                                                        : 'flex-start',
                                            },
                                        ]}
                                    >
                                        <Text
                                            style={{
                                                color:
                                                    msg.senderId === authContext?.currentUser?.uid
                                                        ? 'white'
                                                        : theme.textColor,
                                                fontSize: 16,
                                            }}
                                        >
                                            {msg.text}
                                        </Text>
                                        <Text
                                            style={{
                                                color: theme.textColor,
                                                fontSize: 10,
                                                textAlign: 'right',
                                                marginTop: 5,
                                            }}
                                        >
                                            {new Date(msg.timestamp).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </Text>
                                    </View>
                                )}
                                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                                onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
                            />
                        ) : (
                            <Text
                                style={{ color: theme.textColor, textAlign: 'center', marginTop: 20 }}
                            >
                                No messages yet
                            </Text>
                        )}
                    </View>

                    {/* Input Section */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, { color: theme.textColor, borderColor: theme.textColor }]}
                            placeholder="Type a message..."
                            placeholderTextColor="#888"
                            value={message}
                            onChangeText={setMessage}
                        />
                        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Chat;