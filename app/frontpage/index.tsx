// app/frontpage/index.tsx

import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import CategoryItem from '../components/CategoryItem';
import ProductCard from '../components/ProductCard';
import ProductGrid from '../components/ProductGrid';
import BottomNavigationBar from '../components/BottomNavigationBar';
import { Product, Category } from '../types';
import { useRouter } from 'expo-router';

// Mock Data
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Featured Product 1',
    image: 'https://via.placeholder.com/300x150',
    price: '$199',
  },
  {
    id: '2',
    name: 'Featured Product 2',
    image: 'https://via.placeholder.com/300x150',
    price: '$299',
  },
  // Add more featured products as needed
];

const categories: Category[] = [
  { id: '1', name: 'GPUs', icon: 'graphics-card' },
  { id: '2', name: 'CPUs', icon: 'cpu-64-bit' },
  { id: '3', name: 'Motherboards', icon: 'motherboard' },
  { id: '4', name: 'RAM', icon: 'memory' },
  { id: '5', name: 'Storage', icon: 'harddisk' },
  // Add more categories as needed
];

const productsForGrid: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    image: 'https://via.placeholder.com/150',
    price: '$99',
  },
  {
    id: '2',
    name: 'Product 2',
    image: 'https://via.placeholder.com/150',
    price: '$149',
  },
  {
    id: '3',
    name: 'Product 3',
    image: 'https://via.placeholder.com/150',
    price: '$249',
  },
  {
    id: '4',
    name: 'Product 4',
    image: 'https://via.placeholder.com/150',
    price: '$349',
  },
  // Add more products as needed
];

const FrontPage: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        onProfilePress={() => {
          // Navigate to the profile screen using route name without leading slash
          router.push('profile' as any); 
        }}
      />
      <ScrollView style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={24} color="#aaa" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search any Product..."
            placeholderTextColor="#aaa"
            // Implement search functionality as needed
          />
          <TouchableOpacity onPress={() => console.log('Microphone pressed')}>
            <Icon name="microphone" size={24} color="#aaa" />
          </TouchableOpacity>
        </View>

        {/* Category Icons */}
        <View style={styles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                onPress={() => {
                  // Navigate to specific category route using pathname and params
                  router.push({
                    pathname: `/category/${category.name.toLowerCase()}` as any,
                    params: { categoryName: category.name.toLowerCase() },
                  });
                }}
              />
            ))}
          </ScrollView>
        </View>

        {/* Featured Product Carousel */}
        <View style={styles.section}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {featuredProducts.map((product) => (
              <View key={product.id} style={styles.featuredItem}>
                <ProductCard product={product} style={styles.featuredCard} />
              </View>
            ))}
          </ScrollView>
          {/* Navigation Dots */}
          <View style={styles.dotsContainer}>
            {featuredProducts.map((_, index) => (
              <View key={index} style={styles.dot} />
            ))}
          </View>
        </View>

        {/* Product Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Products</Text>
          <ProductGrid products={productsForGrid} />
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <BottomNavigationBar />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
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
    marginLeft: 8,
    color: '#000',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  featuredItem: {
    width: 300, // Adjust as needed
    marginRight: 16,
  },
  featuredCard: {
    width: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
});

export default FrontPage;
