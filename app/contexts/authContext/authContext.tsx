import React, { useEffect, useState, ReactNode, createContext, FC, useContext } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export interface UserDetails {
    uid: string;
    username: string;
    email: string;
    profilePicture: string;
}

interface AuthContextType {
    currentUser: User | null;
    userLoggedIn: boolean;
    loading: boolean;
    userDetails: UserDetails | null;
    setUserDetails: (details: UserDetails) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    return useContext(AuthContext);
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const db = getFirestore();

    const logout = () => {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setUserDetails(null);
    };

    const initializeUser = async (user: User | null) => {
        if (user) {
            setCurrentUser(user);
            setUserLoggedIn(true);
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setUserDetails(userDoc.data() as UserDetails);
            } else {
                setUserDetails({
                    uid: user.uid,
                    username: user.displayName || 'Unknown',
                    email: user.email || 'Unknown',
                    profilePicture: user.photoURL || 'https://via.placeholder.com/150',
                });
            }
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
            setUserDetails(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => initializeUser(user),
            (error) => {
                console.error('Error fetching auth state:', error);
                setLoading(false);
            }
        );
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userLoggedIn,
        loading,
        userDetails,
        setUserDetails,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;