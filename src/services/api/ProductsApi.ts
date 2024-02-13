import axios from "axios";

export const GetProducts = () => {
  try {
    const response = axios.get("https://fakestoreapi.com/products");

    return response;
  } catch (error) {
    throw error;
  }
};
