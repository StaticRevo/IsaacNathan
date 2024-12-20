import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
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
    changePictureText: {
        marginTop: 10,
        fontSize: 16,
        color: '#777',
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        fontSize: 16,
    },
    saveButton: {
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    loadingIndicator: {
        marginVertical: 20,
    },
});

export default styles;