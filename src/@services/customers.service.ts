import { of } from "rxjs";
import customers from "../@fake-db/Customers";

export const CustomerService = {
  getProducts: () => of(customers),
};
