import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './contexts/authContext/authContext';
import profileStyles from './styles/ProfileStyles';
import { lightTheme, darkTheme } from './styles/HomePageStyles';
import { useTheme } from './contexts/themeContext/themeContext';

const Profile: React.FC = () => {
    const authContext = useAuth();
    const router = useRouter();
    const { isDarkTheme } = useTheme();
    const theme = isDarkTheme ? darkTheme : lightTheme;

    if (!authContext) {
        return <Text>Error: Auth context is undefined. Ensure you are wrapping your app in AuthProvider.</Text>;
    }

    const { userDetails, logout } = authContext;

    if (!userDetails) {
        return <Text>No user details available</Text>;
    }

    const handleLogout = () => {
        logout();
        router.replace('/login');
        console.log('User logged out');
    };

    return (
        <View style={[profileStyles.container, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[profileStyles.header, { color: theme.textColor }]}>My Profile</Text>
            <View style={profileStyles.profileImageContainer}>
                <Image
                    source={{ uri: userDetails.profilePicture || 'https://via.placeholder.com/150' }}
                    style={profileStyles.profileImage}
                />
            </View>
            <Text style={[profileStyles.profileName, { color: theme.textColor }]}>{userDetails.username}</Text>
            <Text style={[profileStyles.profileEmail, { color: theme.textColor }]}>{userDetails.email}</Text>
            <TouchableOpacity style={[profileStyles.profileButton, { backgroundColor: theme.buttonBackgroundColor }]} onPress={() => router.push('/editProfile')}>
                <Text style={[profileStyles.profileButtonText, { color: theme.buttonTextColor }]}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[profileStyles.profileButton, { backgroundColor: theme.buttonBackgroundColor }]}>
                <Text style={[profileStyles.profileButtonText, { color: theme.buttonTextColor }]}>View Order History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[profileStyles.logoutButton, { backgroundColor: theme.logoutButtonBackgroundColor }]} onPress={handleLogout}>
                <Text style={[profileStyles.logoutButtonText, { color: theme.buttonTextColor }]}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Profile;