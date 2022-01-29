import { ICustomer } from "../@fake-db/Customers";
import { IAddedProducts } from "../@fake-db/Products";
import { OrderPreviewTable } from "./OrderPreviewTable";
interface OrderDetailsProps {
  customerInfo: ICustomer | any;
  addedProducts: IAddedProducts[];
  totalItem: number;
  orderTotal: number;
}

export const OrderDetails = ({
  customerInfo,
  addedProducts,
  totalItem,
  orderTotal,
}: OrderDetailsProps) => {
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <p>
            <strong>Name</strong> {customerInfo?.name}
          </p>
          <p>
            <strong>Phone</strong> {customerInfo?.phone}
          </p>
          <p>
            <strong>Email</strong> {customerInfo?.email}
          </p>
          <p>
            <strong>Address</strong> {customerInfo?.address}
          </p>
        </div>
        <div className="col-md-6">
          <p>
            <strong>Invoice No:</strong> {Math.floor(Math.random() * 10000)}
          </p>
          <p>
            <strong>Date Time:</strong>{" "}
            {new Date().getDate() +
              "-" +
              new Date().getMonth() +
              "-" +
              new Date().getFullYear()}{" "}
            {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
      <OrderPreviewTable addedProducts={addedProducts} />
      <div style={{ bottom: 0 }} className="mt-5">
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className=" px-2 border-bottom"
        >
          <p>Total Item</p>
          <strong>
            {totalItem} ({totalItem?.toFixed(2)})
          </strong>
          <p>Total Price</p>
          <strong> {orderTotal.toFixed(2)} </strong>
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className=" px-2"
        >
          <p>Order Tax</p>
          <strong>0.00 </strong>
          <p>Total Discount</p>
          <strong> (0.00) 0.00 </strong>
        </div>

        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="bg-dark text-light px-2"
        >
          <p>Total Payable</p>
          <strong>{orderTotal.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};
