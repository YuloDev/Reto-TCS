import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const AddButton = ({ onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Agregar</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f9db4d',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 3,
  },
  buttonText: {
    color: '#54547c',
    fontWeight: 'bold',
  },
});

export default AddButton;
