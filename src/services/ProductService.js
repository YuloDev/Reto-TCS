const API_URL =
  'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/bp/products`, {
    headers: {
      authorId: 1,
    },
  });
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  return await response.json();
};

export const createProduct = async product => {
  const response = await fetch(`${API_URL}/bp/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorId: 1,
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Error creating product');
  }
  return await response.json();
};

export const updateProduct = async (id, product) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Error updating product');
  }
  return await response.json();
};

export const deleteProduct = async id => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error deleting product');
  }
  return await response.json();
};
