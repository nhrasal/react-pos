import { Method } from "@testing-library/react";
import React from "react";
import { Button, Table } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { IAddedProducts } from "../@fake-db/Products";
interface IOrderTable {
  addedProducts: IAddedProducts[];
}

export const OrderPreviewTable = ({ addedProducts }: IOrderTable) => {
  return (
    <Table striped bordered hover>
      <thead className="bg-primary">
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
            if (product.isAvailable) {
              return (
                <tr key={index}>
                  <td>
                    {product.name} <FaComment /> <BiEdit />
                  </td>
                  <td>{product.price}</td>
                  <td>{product.qty}</td>
                  <td>{product.price * product.qty}</td>
                </tr>
              );
            }
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
