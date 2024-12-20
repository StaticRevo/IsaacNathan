// app/cart.tsx

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Product } from './types';
import ProductCard from './components/ProductCard';

// Mock Data for Cart
const cartItems: Product[] = [
  {
    id: '1',
    name: 'Cart Product 1',
    image: 'https://via.placeholder.com/150',
    price: '$199',
  },
  {
    id: '2',
    name: 'Cart Product 2',
    image: 'https://via.placeholder.com/150',
    price: '$299',
  },
  // Add more cart items as needed
];

const CartScreen: React.FC = () => {
  const router = useRouter();

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} />
  );

  const handleCheckout = () => {
    // Implement checkout functionality
    Alert.alert("Checkout", "Proceeding to checkout...");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
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
  checkoutButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
