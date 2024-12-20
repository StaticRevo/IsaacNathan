// app/wishlist.tsx

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Product } from './types';
import ProductCard from './components/ProductCard';

// Mock Data for Wishlist
const wishlistItems: Product[] = [
  {
    id: '1',
    name: 'Wishlist Product 1',
    image: 'https://via.placeholder.com/150',
    price: '$199',
  },
  {
    id: '2',
    name: 'Wishlist Product 2',
    image: 'https://via.placeholder.com/150',
    price: '$299',
  },
  // Add more wishlist items as needed
];

const WishlistScreen: React.FC = () => {
  const router = useRouter();

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Wishlist</Text>
      {wishlistItems.length > 0 ? (
        <FlatList
          data={wishlistItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.emptyText}>Your wishlist is empty.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 16,
    marginTop: 50,
  },
});

export default WishlistScreen;
