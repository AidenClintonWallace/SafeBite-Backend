const API_BASE_URL = 'http://localhost:8080/api';

export const pantryAPI = {
  // =========================
  // PANTRY ENDPOINTS
  // =========================

  getPantryByUser: async (userId) => {
    const response = await fetch(
      `${API_BASE_URL}/pantry/user/${userId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch pantry: ${response.status}`);
    }

    return response.json();
  },

  getPantryByUserAndStatus: async (userId, status) => {
    const response = await fetch(
      `${API_BASE_URL}/pantry/user/${userId}/status/${status}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch pantry by status: ${response.status}`);
    }

    return response.json();
  },

  getPantryByUserSorted: async (
    userId,
    sortBy = 'earliest_expiry'
  ) => {
    const response = await fetch(
      `${API_BASE_URL}/pantry/user/${userId}/sorted?sortBy=${sortBy}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch sorted pantry: ${response.status}`);
    }

    return response.json();
  },

  addToPantry: async (pantryData) => {
    const response = await fetch(
      `${API_BASE_URL}/pantry/add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pantryData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to add to pantry: ${response.status}`);
    }

    return response.json();
  },

  updatePantryQuantity: async (pantryId, quantity) => {
    const response = await fetch(
      `${API_BASE_URL}/pantry/${pantryId}/quantity/${quantity}`,
      {
        method: 'PUT',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update quantity: ${response.status}`);
    }

    return response.json();
  },

  removePantryItem: async (pantryId) => {
    const response = await fetch(
      `${API_BASE_URL}/pantry/${pantryId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to remove pantry item: ${response.status}`);
    }

    return response.text();
  },

  // =========================
  // PRODUCT ENDPOINTS
  // =========================

  addProduct: async (productData) => {
    const response = await fetch(
      `${API_BASE_URL}/product/add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to add product: ${response.status}`);
    }

    return response.json();
  },

  getProduct: async (productId) => {
    const response = await fetch(
      `${API_BASE_URL}/product/${productId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    return response.json();
  },

  getAllProducts: async () => {
    const response = await fetch(
      `${API_BASE_URL}/product/all`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    return response.json();
  },

  updateProduct: async (productId, productData) => {
    const response = await fetch(
      `${API_BASE_URL}/product/${productId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update product: ${response.status}`);
    }

    return response.json();
  },

  deleteProduct: async (productId) => {
    const response = await fetch(
      `${API_BASE_URL}/product/${productId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete product: ${response.status}`);
    }

    return response.text();
  },
};