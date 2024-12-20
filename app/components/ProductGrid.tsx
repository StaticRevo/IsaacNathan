// app/components/ProductGrid.tsx

import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
}

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 48) / numColumns; // Adjusting for padding and margins

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} style={{ width: cardWidth }} />
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default ProductGrid;
