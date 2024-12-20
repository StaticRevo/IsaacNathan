// app/category/[categoryName].tsx

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

// Mock Data for Categories
const allProducts: Product[] = [
  {
    id: '1',
    name: 'GPU Product 1',
    image: 'https://via.placeholder.com/150',
    price: '$499',
  },
  {
    id: '2',
    name: 'CPU Product 1',
    image: 'https://via.placeholder.com/150',
    price: '$299',
  },
  {
    id: '3',
    name: 'Motherboard Product 1',
    image: 'https://via.placeholder.com/150',
    price: '$199',
  },
  // Add more products as needed
];

const CategoryScreen: React.FC = () => {
  const { categoryName } = useLocalSearchParams();

  const filteredProducts = allProducts.filter(product => 
    product.name.toLowerCase().includes(Array.isArray(categoryName) ? categoryName[0].toLowerCase() : categoryName.toLowerCase())
  );

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{categoryName}</Text>
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noResultsText}>No products found in this category.</Text>
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
    textTransform: 'capitalize',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  noResultsText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 16,
    marginTop: 50,
  },
});

export default CategoryScreen;
