import React from "react";
import { Table } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { IAddedProducts } from "../@fake-db/Products";
interface IOrderTable {
  addedProducts: IAddedProducts[];
  onChangeQty: void | any;
  removeItem: void | any;
}

export const OrderTable = ({
  addedProducts,
  onChangeQty,
  removeItem,
}: IOrderTable) => {
  return (
    <Table striped bordered hover>
      <thead className="bg-primary">
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Sub Total</th>
          <th>
            <BsTrash />
          </th>
        </tr>
      </thead>
      <tbody>
        {addedProducts.length ? (
          addedProducts.map((product: any, index: any) => {
            return (
              <tr key={index}>
                <td>
                  {product.name} <FaComment /> <BiEdit />
                </td>
                <td>{product.price}</td>
                <td>
                  <input
                    type="number"
                    value={product.qty}
                    onChange={(e) => onChangeQty(e, product)}
                    style={{ width: "50px" }}
                    min={1}
                  />
                </td>
                <td>{product.price * product.qty}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeItem(product)}
                  >
                    x{/* <BsTrash /> */}
                  </button>
                </td>
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
