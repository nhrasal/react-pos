import { of } from "rxjs";
import products from "../@fake-db/Products";

export const ProductService = {
  getProducts: () => of(products),
};
