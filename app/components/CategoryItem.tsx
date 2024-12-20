// app/components/CategoryItem.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Category } from '../types';

interface CategoryItemProps {
  category: Category;
  onPress?: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
      accessibilityLabel={`Navigate to ${category.name}`}
    >
      <Icon name={category.icon} size={30} color="#4F8EF7" />
      <Text style={styles.text}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    marginRight: 24,
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});

export default CategoryItem;
