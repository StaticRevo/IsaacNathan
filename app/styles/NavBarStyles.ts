import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 70,
    },
    iconContainer: {
      alignItems: 'center',
    },
    iconText: {
      fontSize: 12,
      color: 'gray',
      marginTop: 4,
    },
    cartButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#2ECC71',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -20, 
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 3 },
      elevation: 5,
    },
  });