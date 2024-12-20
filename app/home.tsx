import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles, { lightTheme, darkTheme } from './styles/HomePageStyles';
import { useTheme } from './contexts/themeContext/themeContext';

const Home: React.FC = () => {
    const router = useRouter();
    const { isDarkTheme } = useTheme();
    const theme = isDarkTheme ? darkTheme : lightTheme;

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <FontAwesome name="bars" size={24} color={theme.textColor} />
                </TouchableOpacity>
                <View style={styles.placeholderLogo} />
                <TouchableOpacity onPress={() => router.push('./messages')}>
                    <FontAwesome name="envelope" size={24} color={theme.textColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('./profile')}>
                    <FontAwesome name="user-circle" size={24} color={theme.textColor} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={[styles.searchInput, { color: theme.textColor }]}
                    placeholder="Search any Product..."
                    placeholderTextColor="#666"
                />
                <TouchableOpacity>
                    <FontAwesome name="search" size={20} color={theme.buttonBackgroundColor} />
                </TouchableOpacity>
            </View>

            {/* Featured Categories */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredCategories}>
                {['CPUs', 'GPUs', 'RAM', 'Cases', 'Keyboards'].map((category, index) => (
                    <TouchableOpacity key={index} style={styles.category}>
                        <View style={styles.placeholderCategoryIcon} />
                        <Text style={[styles.categoryText, { color: theme.textColor }]}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Featured Product Carousel */}
            <View style={styles.carousel}>
                <View style={styles.placeholderCarouselImage} />
                <Text style={[styles.carouselText, { color: theme.textColor }]}>Featured Product Name</Text>
            </View>

            {/* Product Grid */}
            <ScrollView style={styles.productGrid}>
                {[1, 2, 3].map((_, index) => (
                    <View key={index} style={styles.productCard}>
                        <View style={styles.placeholderProductImage} />
                        <Text style={[styles.productName, { color: theme.textColor }]}>Product Name {index + 1}</Text>
                        <Text style={[styles.productPrice, { color: theme.buttonBackgroundColor }]}>$XX.XX</Text>
                        <Text style={[styles.productRating, { color: theme.textColor }]}>★ Rating</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Footer */}
            <View style={[styles.footer, { justifyContent: 'flex-start' }]}>
                <TouchableOpacity style={{ marginRight: 60 }}>
                    <FontAwesome name="home" size={24} color={theme.buttonBackgroundColor} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 60 }}>
                    <FontAwesome name="heart" size={24} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 60 }}>
                    <FontAwesome name="shopping-cart" size={24} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('./settings')}>
                    <FontAwesome name="cog" size={24} color="gray" />
                </TouchableOpacity>
            </View>

            {/* Floating Action Button (FAB) */}
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    backgroundColor: theme.buttonBackgroundColor,
                    borderRadius: 50,
                    padding: 15,
                }}
                onPress={() => router.push('./messages')}
            >
                <FontAwesome name="comment" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default Home;
