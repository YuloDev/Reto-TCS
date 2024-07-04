import { getProducts,createProduct } from "../src/services/ProductService";

describe('Service Functions', () => {
  beforeEach(() => {
    global.fetch = jest.fn(); 
  });

  afterEach(() => {
    jest.restoreAllMocks(); 
  });

  it('fetches products successfully', async () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });

    const products = await getProducts();

    expect(products).toEqual(mockProducts);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products',
      {
        headers: {
          authorId: 1,
        },
      }
    );
  });

  it('creates a new product successfully', async () => {
    const newProduct = { name: 'New Product', price: 100 };
    const mockResponse = { id: 3, ...newProduct };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const createdProduct = await createProduct(newProduct);

    expect(createdProduct).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorId: 1,
        },
        body: JSON.stringify(newProduct),
      }
    );
  });


  
});
