// app/search.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Product } from './types';
import ProductCard from './components/ProductCard';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock Data for Search
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Search Product 1',
    image: 'https://via.placeholder.com/150',
    price: '$199',
  },
  {
    id: '2',
    name: 'Search Product 2',
    image: 'https://via.placeholder.com/150',
    price: '$299',
  },
  // Add more products as needed
];

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim() === '') {
      Alert.alert("Error", "Please enter a search term.");
      return;
    }

    const results = allProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(results);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="magnify" size={24} color="#4F8EF7" />
        </TouchableOpacity>
      </View>

      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noResultsText}>No products found.</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 48,
    elevation: 2, // For Android
    shadowColor: '#000', // For iOS
    shadowOffset: { width: 0, height: 1 }, // For iOS
    shadowOpacity: 0.1, // For iOS
    shadowRadius: 2, // For iOS
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
    color: '#000',
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

export default SearchScreen;
