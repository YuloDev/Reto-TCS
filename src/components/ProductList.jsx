import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getProducts} from '../services/ProductService';

const ProductList = ({searchQuery}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
      setFilteredProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filterProducts = () => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.productItem}
      onPress={() => navigation.navigate('detail', { item })}
    >
      <Text style={styles.productId}>ID: {item.id}</Text>
      <Text>{item.name}</Text>
    </Pressable>
  );

  return (
    <FlatList
      data={filteredProducts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productId: {
    fontWeight: 'bold',
  },
});

export default ProductList;
