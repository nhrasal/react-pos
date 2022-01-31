/* eslint-disable react-hooks/exhaustive-deps */
import Overlay from "@restart/ui/esm/Overlay";
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from "react-bootstrap";
import { AiFillEye, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { CustomModal } from "../@components/CustomModal";
import { OrderDetails } from "../@components/OrderDetails";
import { OrderTable } from "../@components/OrderTable";
import { ProductThumb } from "../@components/ProductThumb";
import { Toastr } from "../@components/toastr";
import { ICustomer } from "../@fake-db/Customers";
import { IAddedProducts, IProducts } from "../@fake-db/Products";
import { CustomerService } from "../@services/customers.service";
import { ProductService } from "../@services/products.service";

export const Home = () => {
  const [toastShow, setToastShow] = useState(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [preloader, setPreloader] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [products, setProducts] = useState<IProducts[]>([]);
  const [searchProducts, setSearchProducts] = useState<IProducts[]>([]);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | any>();
  const [addedProducts, setAddedProducts] = useState<IAddedProducts[]>([]);
  const [total, setTotal] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  const inputRef: any = useRef(null);

  useEffect(() => {
    getProducts();
    getCustomers();
  }, []);

  useEffect(() => {
    getTotal();
    inputRef.current.focus();
  }, [addedProducts]);

  // Get all products
  const getProducts = () => {
    ProductService.getAll().subscribe((res: any) => {
      setProducts(res.data);
    });
  };

  // get All customers
  const getCustomers = () => {
    CustomerService.getAll().subscribe((res: any) => {
      setCustomers(res.data);
    });
  };
  // add to the product order list
  const addToProduct = (product: IProducts, qty?: number) => {
    setPreloader(true);
    setTimeout(() => {
      setPreloader(false);
    }, 1000);

    const findProduct: IProducts | any = addedProducts.find(
      (item: IAddedProducts) => item.id === product.id
    );

    let newProduct: any = [];

    if (findProduct) {
      let updateQty = qty || ++findProduct.qty;
      addedProducts.forEach((item: IAddedProducts) => {
        if (item.id === product.id) item.qty = updateQty;
        newProduct.push(item);
      });
    } else {
      product.qty = 1;
      newProduct = [...addedProducts, product];
    }
    setAddedProducts(newProduct);
  };

  // remove from the product order list
  const removeItem = (product: IProducts) => {
    const newProducts = addedProducts.filter(
      (item: IAddedProducts) => item.id !== product.id
    );
    setAddedProducts(newProducts);
    setToastVariant("danger");
    setToastMsg(product.name + " removed from oder table");
    setToastShow(true);
  };
  //   get order total
  const getTotal = () => {
    let totalPrice = 0;
    let totalQty = 0;
    if (addedProducts.length > 0) {
      addedProducts.forEach((item: IAddedProducts) => {
        totalPrice += item.price * (item.qty || 1);
        // for temporary solution toFixed(2) issues
        totalQty += item.qty * 1;
      });
    }
    setTotalItem(totalQty);
    setTotal(totalPrice);
  };
  //  order product quantity  update
  const onChangeQty = (event: any, product: any) => {
    if (event.target.value < 1) {
      return;
    }
    addToProduct(product, event.target.value);
  };

  // customer change
  const onChangeCustomer = (customerId: any) => {
    const findCustomer = customers.find(
      (item: any) => +item.id === +customerId
    );

    if (findCustomer) {
      setSelectedCustomer(findCustomer);
      return;
    }
  };

  // product filter
  const onProductFilter = (productName: string) => {
    if (productName) {
      const filter = products.filter((item: IProducts) =>
        item.name.toLowerCase().includes(productName)
      );
      setSearchProducts(filter);
      return;
    }
    setSearchProducts([]);
  };

  // order cancel
  const onCancel = () => {
    setAddedProducts([]);
    setSelectedCustomer({});
    setToastVariant("danger");
    setToastMsg("Order Canceled");
    setToastShow(true);
  };

  const orderValidation = () => {
    if (!selectedCustomer) {
      setToastVariant("info");
      setToastMsg("Please select a valid customer");
      setToastShow(true);
      return false;
    }

    if (!addedProducts.length) {
      setToastVariant("info");
      setToastMsg("No products added");
      setToastShow(true);
      return false;
    }
    return true;
  };

  // order submit
  const onOrder = () => {
    if (!orderValidation()) return;
    setToastVariant("success");
    setToastMsg("The Order is Saved Successfully");
    setToastShow(true);
  };
  const onPreview = () => {
    if (!orderValidation()) return;
    setModalShow(true);
  };
  return (
    <Container fluid>
      {preloader ? (
        <div className="vertical-center">
          <Spinner
            animation="grow"
            style={{ height: "80px", width: "80px" }}
            className="text-primary"
          />
        </div>
      ) : (
        ""
      )}
      <Row>
        <Col
          md={5}
          sm={12}
          xs={12}
          className="shadow-lg p-1  bg-white rounded text-center "
        >
          <div className="input-group mb-3">
            <select
              className="form-select"
              aria-label="Default select customer"
              onChange={(e) => onChangeCustomer(e.target.value)}
            >
              <option>Select Customer</option>
              {customers.length
                ? customers.map((customer: ICustomer, index: number) => {
                    return (
                      <option value={customer.id} key={index}>
                        {customer.name}
                      </option>
                    );
                  })
                : ""}
            </select>
            <span className="input-group-text">
              <IoMdCreate />
            </span>
            <span className="input-group-text">
              <AiFillEye />
            </span>
            <span className="input-group-text">
              <BsPlusCircleFill />
            </span>
          </div>
          <div className="input-group mb-3">
            <select className="form-select" aria-label="Default select example">
              <option value="0">Select Were House</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-top">Search product by name</Tooltip>}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search product by name"
                aria-label="Search product by name"
                onChange={(e) => onProductFilter(e.target.value)}
                ref={inputRef}
              />
            </OverlayTrigger>
            <span className="input-group-text">
              <BsPlusCircleFill />
            </span>
          </div>
          {searchProducts.length ? (
            <ul>
              {searchProducts.map((item: IProducts, index: number) => {
                return (
                  <li key={index}>
                    {item.name}{" "}
                    <button
                      onClick={() => addToProduct(item)}
                      className="btn btn-sm btn-outline-success"
                    >
                      <BsPlusCircleFill />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            ""
          )}
          <Card className="bg-white">
            <OrderTable
              addedProducts={addedProducts}
              onChangeQty={onChangeQty}
              removeItem={removeItem}
            />
          </Card>
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
              <strong> {total.toFixed(2)} </strong>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=" px-2"
            >
              <p>
                Order Tax <BiEdit />
              </p>
              <strong>0.00 </strong>
              <p>
                Total Discount <BiEdit />
              </p>
              <strong> (0.00) 0.00 </strong>
            </div>

            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className="bg-dark text-light px-2"
            >
              <p>Total Payable</p>
              <strong>{total.toFixed(2)}</strong>
            </div>
            <table className="w-100">
              <tbody>
                <tr>
                  <td className="bg-warning">
                    <button className="btn btn-warning w-100 text-light">
                      Suspend
                    </button>
                  </td>
                  <td className="bg-info">
                    <button
                      className="btn btn-info w-100 text-light"
                      onClick={() => onOrder()}
                    >
                      Order
                    </button>
                  </td>
                  <td className="bg-success">
                    <button className="btn btn-success w-100">
                      <FaRegMoneyBillAlt /> Payment
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="bg-success">
                    <button
                      className="btn btn-success w-100"
                      onClick={() => onPreview()}
                    >
                      <AiFillEye /> Preview
                    </button>
                  </td>
                  <td className="bg-danger">
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => onCancel()}
                    >
                      Cancel
                    </button>
                  </td>
                  <td className="bg-primary">
                    <button className="btn btn-primary w-100"> Bill</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
        <Col md={7} sm={12} xs={12} style={{ opacity: preloader ? ".5" : "" }}>
          <Row className="justify-content-center">
            {products.map((product: IProducts, index: number) => {
              return (
                <Col
                  md={3}
                  sm={12}
                  xs={12}
                  key={index}
                  onClick={() => addToProduct(product)}
                  className="btn"
                >
                  <ProductThumb product={product} />
                </Col>
              );
            })}
          </Row>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="bg-primary  mb-2"
          >
            <div style={{ width: "100px", background: "#f3f3f359" }}>
              <button className="btn btn-sm text-light">
                <AiOutlineLeft />
              </button>
            </div>
            <div>
              <button className="btn w-100 text-light">Sell Gift Card</button>
            </div>
            <div
              style={{
                width: "100px",
                background: "#f3f3f359",
                textAlign: "end",
              }}
            >
              <button className="btn btn-sm text-light">
                <AiOutlineRight />
              </button>
            </div>
          </div>
        </Col>
      </Row>

      <Toastr
        show={toastShow}
        setShow={setToastShow}
        msg={toastMsg}
        variant={toastVariant}
      />
      <CustomModal
        setShow={setModalShow}
        show={modalShow}
        title="Order Details"
      >
        <OrderDetails
          customerInfo={selectedCustomer}
          addedProducts={addedProducts}
          orderTotal={total}
          totalItem={totalItem}
        />
      </CustomModal>
    </Container>
  );
};
