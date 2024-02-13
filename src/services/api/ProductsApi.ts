import axios from "axios";

export const GetProducts = () => {
  try {
    const response = axios.get("https://dummyjson.com/products");

    return response;
  } catch (error) {
    throw error;
  }
};
