import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Search..."
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    borderColor: '#c4c4d3',
    borderWidth: 1,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default SearchBar;
