import React from "react";
import { Table } from "react-bootstrap";
import { IAddedProducts } from "../@fake-db/Products";
interface IOrderTable {
  addedProducts: IAddedProducts[];
}

export const OrderPreviewTable = ({ addedProducts }: IOrderTable) => {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Sub Total</th>
        </tr>
      </thead>
      <tbody>
        {addedProducts.length ? (
          addedProducts.map((product: any, index: any) => {
            return (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.qty}</td>
                <td>{product.price * product.qty}</td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5}> No Products selected</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
