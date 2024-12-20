// app/register.tsx

import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from './styles/RegisterStyles';
import { auth, db } from './firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useTheme } from './contexts/themeContext/themeContext';
import { doc, setDoc } from 'firebase/firestore';


const RegisterScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { isDarkTheme } = useTheme();
    const router = useRouter();

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

    const validatePassword = (password: string): string | null => {
        if (password.length < 6) {
            return 'Password must be at least 6 characters long';
        }
        if (!/[a-zA-Z]/.test(password)) {
            return 'Password must contain at least one alphabet';
        }
        if (!/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return 'Password must contain at least one number or symbol';
        }
        return null;
    };

    const handleRegister = async () => {
        if (!username || !email || !password || !confirmPassword) {
            setErrorMessage('All fields are required');
            return;
        }

        if (emailError) {
            setErrorMessage('Invalid email format');
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setErrorMessage(passwordError);
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;  // user object contains the UID
            const uid = user.uid;  // Firebase provides a unique UID for each user

            // Store user data in Firestore, including the UID
            await setDoc(doc(db, 'users', uid), {
                uid,  // Include the UID in the document
                username,
                email,
            });

            console.log('User registered:', username, 'UID:', uid);  // UID is logged here

            router.push('./accountTypeScreen');  // Redirect to the next screen
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage('Email already in use');
            } else {
                setErrorMessage(`Error registering user: ${error.message}`);
            }
            console.error('Error registering user:', error);
        }
    };


    return (
        <View style={styles.container}>
            <Image source={require('./assets/images/hardwareHubLogo.png')} style={styles.logo} />
            <Text style={styles.header}>Create an Account</Text>

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <View style={styles.inputContainer}>
                <FontAwesome name="user" size={24} color="gray" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="black"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome name="envelope" size={24} color="gray" style={styles.icon} />
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
                    <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={24} color="gray" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="black"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <FontAwesome name={showConfirmPassword ? "eye-slash" : "eye"} size={24} color="gray" />
                </TouchableOpacity>
            </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

            <Text style={styles.orText}>- OR Continue with -</Text>

            <View style={styles.socialContainer}>
                <FontAwesome name="google" size={32} color="red" style={styles.socialIcon} />
                <FontAwesome name="apple" size={32} color="black" style={styles.socialIcon} />
                <FontAwesome name="facebook" size={32} color="#3b5998" style={styles.socialIcon} />
            </View>

            <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text
                    style={styles.loginLink}
                    onPress={() => router.push('.//LoginRegister/login')}
                >
                    Login
                </Text>
            </Text>
        </View>
    );
};

export default RegisterScreen;
