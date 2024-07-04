import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../src/screens/Home';
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('Home Screen', () => {
    it('renders correctly', () => {
      const { getByPlaceholderText, getByText } = render(<Home />);
      
      expect(getByPlaceholderText('Search...')).toBeTruthy(); // Corregido el placeholder
      expect(getByText('Agregar')).toBeTruthy(); // Corregido el texto esperado
    });
  });
  
