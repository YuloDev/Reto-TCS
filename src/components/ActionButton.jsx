import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const ActionButton = ({ onPress, title, backgroundColor }) => {
  return (
    <Pressable style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonText: {
    color: '#4a587b',
    fontWeight: 'bold',
  },
});

export default ActionButton;
