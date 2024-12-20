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
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import styles from '../styles/ChatStyles';
import { lightTheme, darkTheme } from '../styles/HomePageStyles';
import { useTheme } from '../contexts/themeContext/themeContext';

interface Message {
    text: string;
    senderId: string;
    timestamp: string;
}

interface Chat {
    id: string;
    usernames: string[];
    messages: Message[];
}

const Chat: React.FC = () => {
    const { id } = useLocalSearchParams() as { id: string };
    const router = useRouter();
    const { isDarkTheme } = useTheme();
    const theme = isDarkTheme ? darkTheme : lightTheme;
    const [chat, setChat] = useState<Chat | null>(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        const fetchChat = async () => {
            if (!id) return;

            const db = getFirestore();
            const chatDoc = await getDoc(doc(db, 'chats', id));
            if (chatDoc.exists()) {
                console.log('Chat data:', chatDoc.data());
                setChat(chatDoc.data() as Chat);
            } else {
                console.error('No such chat!');
            }
            setLoading(false);
        };

        fetchChat();
    }, [id]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const db = getFirestore();
        const chatRef = doc(db, 'chats', id);
        const newMessage: Message = {
            text: message,
            senderId: 'currentUserId', // Replace with actual user ID
            timestamp: new Date().toISOString(),
        };

        await updateDoc(chatRef, {
            messages: arrayUnion(newMessage),
        });

        setMessage('');
        flatListRef.current?.scrollToEnd({ animated: true });
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
                        {chat && (
                            <Text style={[styles.username, { color: theme.textColor }]}>
                                {chat.usernames[1]}
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
                                                    msg.senderId === 'currentUserId'
                                                        ? theme.buttonBackgroundColor
                                                        : '#f1f1f1',
                                                alignSelf:
                                                    msg.senderId === 'currentUserId'
                                                        ? 'flex-end'
                                                        : 'flex-start',
                                            },
                                        ]}
                                    >
                                        <Text
                                            style={{
                                                color:
                                                    msg.senderId === 'currentUserId'
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
