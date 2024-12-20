import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from './styles/NavBarStyles'; 

const NavBar: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Home Button */}
      <TouchableOpacity onPress={() => router.push('./home')} style={styles.iconContainer}>
        <FontAwesome name="home" size={24} color="gray" />
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>

      {/* Wishlist Button */}
      <TouchableOpacity onPress={() => router.push('./wishlist')} style={styles.iconContainer}>
        <FontAwesome name="heart" size={24} color="gray" />
        <Text style={styles.iconText}>Wishlist</Text>
      </TouchableOpacity>

      {/* Cart Button */}
      <TouchableOpacity onPress={() => router.push('./cart')} style={styles.cartButton}>
        <FontAwesome name="shopping-cart" size={28} color="white" />
      </TouchableOpacity>

      {/* Search Button */}
      <TouchableOpacity onPress={() => router.push('./search')} style={styles.iconContainer}>
        <FontAwesome name="search" size={24} color="gray" />
        <Text style={styles.iconText}>Search</Text>
      </TouchableOpacity>

      {/* Settings Button */}
      <TouchableOpacity onPress={() => router.push('./settings')} style={styles.iconContainer}>
        <FontAwesome name="cog" size={24} color="gray" />
        <Text style={styles.iconText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
