import axios from 'axios';
import { mockDashboardData } from '../../../data/mockDashboard';

// Toggle this to switch between mock data and real API calls
export const isStub = true;

export const fetchDashboardData = async () => {
  if (isStub) {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDashboardData);
      }, 1000);
    });
  }

  try {
    const response = await axios.get('/api/v1/dashboard');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    throw error;
  }
};
