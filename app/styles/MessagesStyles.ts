import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    chatsList: {
        flex: 1,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
    profilePicture: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 16,
    },
    chatIcon: {
        marginRight: 10,
    },
    chatInfo: {
        flex: 1,
    },
    chatName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lastMessage: {
        fontSize: 14,
        color: '#888',
    },
});

export default styles;
