import { StyleSheet } from 'react-native';

export const lightTheme = {
    backgroundColor: '#fff',
    textColor: '#333',
    buttonBackgroundColor: '#91c425',
    logoutButtonBackgroundColor: '#f44336',
    buttonTextColor: '#fff',
};

export const darkTheme = {
    backgroundColor: '#333',
    textColor: '#fff',
    buttonBackgroundColor: '#91c425',
    logoutButtonBackgroundColor: '#f44336',
    buttonTextColor: '#fff',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#ccc',
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    profileEmail: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        color: '#777',
    },
    profileButton: {
        backgroundColor: '#91c425',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },
    profileButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#f44336',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;