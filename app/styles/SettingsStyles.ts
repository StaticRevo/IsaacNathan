import { StyleSheet } from 'react-native';

const lightTheme = {
    backgroundColor: '#fff',
    textColor: '#333',
    buttonBackgroundColor: '#91c425',
    logoutButtonBackgroundColor: '#f44336',
    buttonTextColor: '#fff',
};

const darkTheme = {
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
        flexDirection: 'column',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#91c425',
        paddingVertical: 15,
        marginBottom: 20,
    },
    settingText: {
        fontSize: 18,
    },
    settingButton: {
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },
    settingButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#91c425',
        paddingTop: 10,
        paddingBottom: 20,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePicture: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#91c425',
    },
    profileName: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    settingCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#91c425',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    picker: {
        width: '50%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },

    homeButton: {
        alignSelf: 'center',
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    homeButtonText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export { styles, lightTheme, darkTheme };