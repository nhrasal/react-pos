import React, { useEffect, useState } from "react";
import { IProducts } from "../@fake-db/Products";
import { ProductService } from "../@services/products.service";

export const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    ProductService.getProducts().subscribe((res: any) => {
      setProducts(res.data);
    });
  };
  return (
    <div>
      <h1>Home</h1>
      <ul>
        {products.map((product: IProducts) => {
          return (
            <li key={product.id}>
              {product.name} - {product.price}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
