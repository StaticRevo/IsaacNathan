// app/components/ProductCard.tsx

import React from 'react';
import { View, Text, Image, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  style?: StyleProp<ViewStyle>;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, style }) => {
  return (
    <View style={[styles.card, style]}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.price}>{product.price}</Text>
      {/* Optional: Add rating and reviews here */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 2, // For Android
    shadowColor: '#000', // For iOS
    shadowOffset: { width: 0, height: 2 }, // For iOS
    shadowOpacity: 0.1, // For iOS
    shadowRadius: 4, // For iOS
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 4,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
});

export default ProductCard;
