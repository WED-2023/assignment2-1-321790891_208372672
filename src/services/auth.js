// src/services/auth.js
import api from "../services/api.js";
const routerPrefix = "auth";

export async function Login(username, password) {
  try {
    const response = await api.post(`${routerPrefix}/Login`, {
      username: username,
      password: password,
    });
    return response.data; // Return the response data from the backend
  } catch (error) {
    throw error.response ? error.response.data : error; // Pass the error details for proper handling
  }
}
  

export async function Register(userDetails) {
  try {
    const response = await api.post(`${routerPrefix}/Register`, {
      username: userDetails.username,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      country: userDetails.country,
      password: userDetails.password,
      email: userDetails.email,
      profilePictureUrl: userDetails.profilePictureUrl || "", // Optional profile picture URL
    });
    return response.data; // Return the successful response
  } catch (error) {
    throw error.response ? error.response.data : error; // Handle errors properly
  }
}
  


  export function mockLogout() {
    return { status: 200, response: { data: { message: "logout succeeded", success: true}} };

  }
  

