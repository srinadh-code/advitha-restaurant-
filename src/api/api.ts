import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export default API;



export async function getBookings() {
  const response = await fetch(
    "http://127.0.0.1:8000/bookings/"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return response.json();
}