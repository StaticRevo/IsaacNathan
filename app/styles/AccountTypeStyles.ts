import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    option: {
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        width: 100,
    },
    selectedOption: {
        backgroundColor: '#91c425',
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    optionText: {
        fontSize: 16,
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: '#91c425',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;