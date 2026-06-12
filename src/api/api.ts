// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://127.0.0.1:8000",
// });

// export default API;



// export async function getBookings() {
//   const response = await fetch(
//     "http://127.0.0.1:8000/bookings/"
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch bookings");
//   }

//   return response.json();
// }


import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;



export async function getBookings() {
  const response = await API.get("/bookings/");
  return response.data;
}


API.interceptors.request.use((config) => {
  console.log(
    "TOKEN =>",
    localStorage.getItem("access")
  );

  return config;
});



export async function getEventBookings() {
  const response = await API.get(
    "/api/events/bookings/"
  );

  return response.data;
}