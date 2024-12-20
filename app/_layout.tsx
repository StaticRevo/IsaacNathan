// app/_layout.tsx

import { Stack } from "expo-router";
import { AuthProvider } from "./contexts/authContext/authContext";
import { ThemeProvider } from "./contexts/themeContext/themeContext";
import Toast from 'react-native-toast-message';
import React, { useEffect, useState } from 'react';
import { auth } from './firebase/firebase';
import firebase from 'firebase/app';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function RootLayout() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (usr) => {
            setUser(usr);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <AuthProvider>
            <ThemeProvider>
                <Stack>
                    {!user ? (
                        <>
                            <Stack.Screen name="index" options={{ headerShown: false }} />
                            <Stack.Screen name="login" options={{ title: "Login" }} />
                            <Stack.Screen name="register" options={{ title: "Register" }} />
                            <Stack.Screen name="accountTypeScreen" options={{ title: 'Account Type' }} />
                            <Stack.Screen name="home" options={{ title: "Home" }} />
                            <Stack.Screen name="messages" options={{ title: "Messages" }} />
                            <Stack.Screen name="profile" options={{ title: "Profile" }} />
                            <Stack.Screen name="editProfile" options={{ title: "Edit Profile" }} />
                            <Stack.Screen name="settings" options={{ title: "Settings" }} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="frontpage/index" options={{ headerShown: false }} />
                            <Stack.Screen name="wishlist" options={{ title: "Wishlist" }} />
                            <Stack.Screen name="cart" options={{ title: "Cart" }} />
                            <Stack.Screen name="search" options={{ title: "Search" }} />
                            <Stack.Screen name="settings" options={{ title: "Settings" }} />
                            <Stack.Screen name="profile" options={{ title: "Profile" }} />
                            <Stack.Screen name="category/[categoryName]" options={{ title: "Category" }} />
                        </>
                    )}
                </Stack>
                <Toast />
            </ThemeProvider>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});