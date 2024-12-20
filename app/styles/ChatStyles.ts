import { StyleSheet } from 'react-native';

const ChatStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    backButton: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
        marginRight: 10,
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fffff',
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginLeft: -20,
    },
    messagesContainer: {
        flex: 1,
        marginVertical: 10,
    },
    message: {
        borderRadius: 15,
        padding: 12,
        marginVertical: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 3,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        paddingBottom: 20, // Add bottom padding to avoid overlap with keyboard
        borderTopWidth: 1,
        borderColor: '#ccc',
    },

    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#91c425',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChatStyles;

