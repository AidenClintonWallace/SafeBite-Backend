const API_BASE_URL = 'https://safebite-rt08.onrender.com/api';

export const foodAPI = {
  getFoodByBarcode: async (barcode) => {
    const response = await fetch(`${API_BASE_URL}/food/${barcode}`);

    if (!response.ok) {
      throw new Error(`Product not found for barcode ${barcode}`);
    }

    return response.json();
  },

  getAllSavedFoods: async () => {
    const response = await fetch(`${API_BASE_URL}/food/savedFoods`);

    if (!response.ok) {
      throw new Error(`Failed to fetch saved foods: ${response.status}`);
    }

    return response.json();
  },
};