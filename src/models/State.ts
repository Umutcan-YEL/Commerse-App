import { ProductModel } from "./Product"

export type ProductStateModel = {
  product:{
    isLoading: boolean,
    isError: boolean,
    productData: Array<ProductModel>,
  }
}