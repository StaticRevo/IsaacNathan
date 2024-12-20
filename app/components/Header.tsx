// app/components/Header.tsx

import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface HeaderProps {
  onProfilePress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onProfilePress }) => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../../assets/images/logo.png')}  
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={onProfilePress}>
        <Icon name="account-circle" size={30} color="#4F8EF7" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    elevation: 4, // For Android
    shadowColor: '#000', // For iOS
    shadowOffset: { width: 0, height: 2 }, // For iOS
    shadowOpacity: 0.1, // For iOS
    shadowRadius: 4, // For iOS
  },
  logo: {
    width: 120,
    height: 40,
  },
});

export default Header;
