import React from "react";
import { Image } from "react-bootstrap";
import { IProducts } from "../@fake-db/Products";

export const ProductThumb = ({ product }:any) => {
  return (
    <div
      className="shadow p-3 mb-2 bg-white rounded text-center"
      style={{ height: "200px" }}
    >
      <Image
        src={product.image}
        thumbnail
        style={{ height: "130px", width: "130px" }}
      />
      <p>{product.name}</p>
    </div>
  );
};
