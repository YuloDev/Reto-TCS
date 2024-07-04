import React from 'react';
import { render } from '@testing-library/react-native';
import Detail from '../src/screens/Detail';

const mockItem = {
  id: '1',
  name: 'Product Name',
  description: 'Product Description',
  logo: 'http://example.com/logo.png',
  date_release: '2024-01-01',
  date_revision: '2025-01-01',
};

const mockRoute = {
  params: {
    item: mockItem,
  },
};

describe('Detail Screen', () => {
  it('renders product details correctly', () => {
    const { getByText } = render(<Detail route={mockRoute} />);
    
    expect(getByText(`ID: ${mockItem.id}`)).toBeTruthy();
    expect(getByText('Product Name')).toBeTruthy();
    expect(getByText('Product Description')).toBeTruthy();
    expect(getByText('2024-01-01')).toBeTruthy();
    expect(getByText('2025-01-01')).toBeTruthy();
  });
});
