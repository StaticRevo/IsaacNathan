// app/login.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import styles from './styles/LoginStyles';
import { doSignInWithEmailAndPassword, doSignInWithGoogle, doPasswordReset } from './firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import {useAuth, UserDetails} from './contexts/authContext/authContext';
import { useTheme } from './contexts/themeContext/themeContext';

const Login: React.FC = () => {
    const { userLoggedIn, setUserDetails } = useAuth() || { userLoggedIn: false, setUserDetails: () => {} };
    const router = useRouter();
    const { isDarkTheme } = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        if (userLoggedIn) {
            router.push('./home');
        }

        const loadRememberedEmail = async () => {
            const savedEmail = await AsyncStorage.getItem('savedEmail');
            const isRemembered = await AsyncStorage.getItem('rememberMe');
            if (isRemembered === 'true' && savedEmail) {
                setEmail(savedEmail);
                setRememberMe(true);
            }
        };
        loadRememberedEmail();
    }, [userLoggedIn, router]);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleEmailChange = (email: string) => {
        setEmail(email);
        if (!validateEmail(email)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError(null);
        }
    };

    const fetchUserDetails = async (uid: string): Promise<UserDetails | null> => {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            return userDoc.data() as UserDetails;
        } else {
            console.warn('No such user document!');
            return null;
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setEmailError('Please enter your email address');
            return;
        }

        try {
            await doPasswordReset(email);
            Alert.alert('Password Reset', 'A password reset link has been sent to your email.');
        } catch (err) {
            Alert.alert('Error', 'Failed to send password reset email');
        }
    };

    const onSubmit = async () => {
        if (!isSigningIn) {
            setIsSigningIn(true);
            setError(null);
            setSuccessMessage(null);
            try {
                const userCredential = await doSignInWithEmailAndPassword(email, password);

                if (rememberMe) {
                    await AsyncStorage.setItem('savedEmail', email);
                    await AsyncStorage.setItem('rememberMe', JSON.stringify(true));
                } else {
                    await AsyncStorage.removeItem('savedEmail');
                    await AsyncStorage.setItem('rememberMe', JSON.stringify(false));
                }

                const user = userCredential.user;
                const userDetails = await fetchUserDetails(user.uid);

                if (userDetails) {
                    setUserDetails(userDetails);
                }

                setSuccessMessage('Successfully logged in!');
                setTimeout(() => {
                    router.push('./home');
                }, 2000);
            } catch (err) {
                setError('Failed to sign in');
            } finally {
                setIsSigningIn(false);
            }
        }
    };

    const onGoogleSignIn = async () => {
        if (!isSigningIn) {
            setIsSigningIn(true);
            setError(null);
            setSuccessMessage(null);
            try {
                const userCredential = await doSignInWithGoogle();

                if (rememberMe) {
                    await AsyncStorage.setItem('savedEmail', email);
                    await AsyncStorage.setItem('rememberMe', JSON.stringify(true));
                } else {
                    await AsyncStorage.removeItem('savedEmail');
                    await AsyncStorage.setItem('rememberMe', JSON.stringify(false));
                }

                const user = userCredential.user;
                const userDetails = await fetchUserDetails(user.uid);

                if (userDetails) {
                    setUserDetails(userDetails);
                }

                setSuccessMessage('Successfully logged in with Google!');
                setTimeout(() => {
                    router.push('./home');
                }, 2000);
            } catch (err) {
                setError('Failed to sign in with Google');
            } finally {
                setIsSigningIn(false);
            }
        }
    };

    const isLoginDisabled = email === '' || password === '' || emailError !== null;

    return (
        <View style={styles.container}>
            <Image source={require('./assets/images/hardwareHubLogo.png')} style={styles.logo} />
            <Text style={styles.header}>Welcome Back!</Text>
            <View style={styles.inputContainer}>
                <FontAwesome name="user" size={24} color="gray" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="black"
                    value={email}
                    onChangeText={handleEmailChange}
                />
            </View>

            {emailError && <Text style={styles.errorText}>{emailError}</Text>}

            <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={24} color="gray" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="black"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.rememberMeContainer}>
                <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkbox}>
                    {rememberMe && <FontAwesome name="check" size={16} color="white" />}
                </TouchableOpacity>
                <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
            {successMessage && <Text style={styles.successText}>{successMessage}</Text>}

            <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.loginButton, isLoginDisabled && { opacity: 0.5 }]}
                onPress={onSubmit}
                disabled={isLoginDisabled}
            >
                {isSigningIn ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.loginButtonText}>Login</Text>
                )}
            </TouchableOpacity>

            <Text style={styles.orText}>- OR Continue with -</Text>

            <View style={styles.socialContainer}>
                <TouchableOpacity onPress={onGoogleSignIn}>
                    <FontAwesome name="google" size={32} color="red" style={styles.socialIcon} />
                </TouchableOpacity>
                <FontAwesome name="apple" size={32} color="black" style={styles.socialIcon} />
                <FontAwesome name="facebook" size={32} color="#3b5998" style={styles.socialIcon} />
            </View>

            <Text style={styles.signUpText}>
                Create An Account{' '}
                <Text style={styles.signUpLink} onPress={() => router.push('..//LoginRegister/register')}>
                    Sign Up
                </Text>
            </Text>
        </View>
    );
};

export default Login;