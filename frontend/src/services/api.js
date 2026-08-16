import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const PantryAPI = {
  addItem: async (userId, productId, quantity, addedDate) => {
    try {
      const response = await axiosInstance.post('/pantry/add', {
        userId,
        productId,
        quantity,
        addedDate,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserPantry: async (userId) => {
    try {
      const response = await axiosInstance.get(`/pantry/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateQuantity: async (pantryId, quantity) => {
    try {
      const response = await axiosInstance.put(
        `/pantry/${pantryId}/quantity/${quantity}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  removeItem: async (pantryId) => {
    try {
      await axiosInstance.delete(`/pantry/${pantryId}`);
      return { success: true };
    } catch (error) {
      throw error;
    }
  },
};

export const NotificationAPI = {
  createNotification: async (userId, message, type) => {
    try {
      const response = await axiosInstance.post('/notifications/create', {
        userId,
        message,
        type,
        status: 'Unread',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserNotifications: async (userId) => {
    try {
      const response = await axiosInstance.get(`/notifications/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteNotification: async (notificationId) => {
    try {
      await axiosInstance.delete(`/notifications/${notificationId}`);
      return { success: true };
    } catch (error) {
      throw error;
    }
  },
};
