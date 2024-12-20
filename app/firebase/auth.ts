import { auth } from './firebase';  // Import the 'auth' from the correct file
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    sendPasswordResetEmail,
    updatePassword,
    sendEmailVerification,
} from 'firebase/auth';

// Function to create a new user with email and password
export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Function to sign in a user with email and password
export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Function to sign in a user with Google
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
};

// Function to sign out the user
export const doSignOut = () => {
    return auth.signOut();
};

// Function to send a password reset email
export const doPasswordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email);
};

// Function to change the user's password
export const doPasswordChange = (password: string) => {
    if (auth.currentUser) {
        return updatePassword(auth.currentUser, password);
    } else {
        throw new Error('No user is currently signed in.');
    }
};

// Function to send an email verification
export const doSendEmailVerification = () => {
    if (auth.currentUser) {
        return sendEmailVerification(auth.currentUser, {
            url: `${window.location.origin}/login`,
        });
    } else {
        throw new Error('No user is currently signed in.');
    }
};
