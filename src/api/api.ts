

import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    "http://127.0.0.1:8000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle 401 Unauthorized responses
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid tokens and user info from localStorage
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("mulugu.auth");
      
      // Trigger storage event for other tabs
      window.dispatchEvent(new Event("logout"));
    }
    return Promise.reject(error);
  }
);

export default API;

export async function getBookings() {
  try {
    const response = await API.get("/api/bookings/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    throw error;
  }
}

export async function getEventBookings() {
  try {
    const response = await API.get(
      "/api/events/bookings/"
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch event bookings:",
      error
    );
    throw error;
  }
}