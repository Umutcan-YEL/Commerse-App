import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetProducts } from "../../api/ProductsApi";

const initialState = {
  isLoading: false,
  productData: null,
  isError: false,
};

export const getproduct = createAsyncThunk("product/get", async () => {
  return await GetProducts();
});

const productSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getproduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getproduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productData = action.payload.data;
      })
      .addCase(getproduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default productSlice.reducer;
