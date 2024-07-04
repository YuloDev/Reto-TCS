import React from 'react';
import { Text, StyleSheet } from 'react-native';

const FormError = ({ message }) => {
  return (
    <Text style={styles.errorText}>{message}</Text>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
});

export default FormError;
