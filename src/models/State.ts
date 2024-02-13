import { ProductModel } from "./Product";

export type ProductStateModel = {
  product: {
    isLoading: boolean;
    isError: boolean;
    productData: {
      products: Array<ProductModel>;
      total: number;
      skip: number;
      limit: number;
    };
  };
};
