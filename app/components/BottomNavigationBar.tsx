// app/components/BottomNavigationBar.tsx

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter, usePathname } from 'expo-router';

const BottomNavigationBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get current route path

  // Function to determine active route
  const getRouteName = (path: string): string => {
    const parts = path.split('/');
    return parts[1] ? parts[1] : 'frontpage';
  };

  const currentRoute = getRouteName(pathname);

  const handleNavigate = (route: string) => {
    if (route.toLowerCase() !== currentRoute) {
      router.push(`/${route.toLowerCase()}`);
    }
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        onPress={() => handleNavigate('frontpage')}
        accessibilityLabel="Navigate to Home"
      >
        <Icon
          name="home"
          size={28}
          color={currentRoute === 'frontpage' ? '#4F8EF7' : '#aaa'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigate('wishlist')}
        accessibilityLabel="Navigate to Wishlist"
      >
        <Icon
          name="heart"
          size={28}
          color={currentRoute === 'wishlist' ? '#4F8EF7' : '#aaa'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigate('cart')}
        accessibilityLabel="Navigate to Cart"
      >
        <Icon
          name="cart"
          size={28}
          color={currentRoute === 'cart' ? '#4F8EF7' : '#aaa'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigate('search')}
        accessibilityLabel="Navigate to Search"
      >
        <Icon
          name="magnify"
          size={28}
          color={currentRoute === 'search' ? '#4F8EF7' : '#aaa'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigate('settings')}
        accessibilityLabel="Navigate to Settings"
      >
        <Icon
          name="cog"
          size={28}
          color={currentRoute === 'settings' ? '#4F8EF7' : '#aaa'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});

export default React.memo(BottomNavigationBar);
