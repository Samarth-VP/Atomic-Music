import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiService = {
  // Get buy history with pagination
  getBuys: async (page = 1, limit = 100) => {
    try {
      const response = await apiClient.get('/buys', { 
        params: { page, limit } 
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching buys:', error);
      throw error;
    }
  },

  // Get buy statistics
  getBuyStats: async () => {
    try {
      const response = await apiClient.get('/buys/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching buy stats:', error);
      throw error;
    }
  },

  // Get loan history with pagination
  getLoans: async (page = 1, limit = 100) => {
    try {
      const response = await apiClient.get('/loans', { 
        params: { page, limit } 
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching loans:', error);
      throw error;
    }
  },

  // Get loan statistics
  getLoanStats: async () => {
    try {
      const response = await apiClient.get('/loans/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching loan stats:', error);
      throw error;
    }
  },
};

export default apiService;