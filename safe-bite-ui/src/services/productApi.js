const API_BASE_URL = 'https://safebite-rt08.onrender.com/api';

export const productAPI = {
  getProduct: async (productId) => {
    const response = await fetch(`${API_BASE_URL}/product/${productId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    return response.json();
  },

  getAllProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/product/all`);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    return response.json();
  },

  addProduct: async (productData) => {
    const response = await fetch(`${API_BASE_URL}/product/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add product: ${response.status}`);
    }

    return response.json();
  },

  updateProduct: async (productId, productData) => {
    const response = await fetch(`${API_BASE_URL}/product/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update product: ${response.status}`);
    }

    return response.json();
  },

  deleteProduct: async (productId) => {
    const response = await fetch(`${API_BASE_URL}/product/${productId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete product: ${response.status}`);
    }

    return response.text();
  },
};