import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const handleAddPress = () => {
    navigation.navigate('add');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <View style={styles.listContainer}>
          <ProductList searchQuery={searchQuery} />
        </View>
        <AddButton onPress={handleAddPress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  listContainer: {
    flex: 1,
    marginBottom: 10,
  },
});

export default Home;
