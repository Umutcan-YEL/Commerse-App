import axios from "axios";

export const GetProducts = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products");

    return response;
  } catch (error) {
    throw error;
  }
};
