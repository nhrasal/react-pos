import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { AiFillEye, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { CustomModal } from "../@components/CustomModal";
import { OrderPreviewTable } from "../@components/OrderPreviewTable";
import { OrderTable } from "../@components/OrderTable";
import { ProductThumb } from "../@components/ProductThumb";
import { Toastr } from "../@components/toastr";
import { ICustomer } from "../@fake-db/Customers";
import { IAddedProducts, IProducts } from "../@fake-db/Products";
import { CustomerService } from "../@services/customers.service";
import { ProductService } from "../@services/products.service";

export const Home = () => {
  const [toastShow, setToastShow] = useState(false);
  const [modalShow, setModalShow] = useState<boolean>(true);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [products, setProducts] = useState<IProducts[]>([]);
  const [searchProducts, setSearchProducts] = useState<IProducts[]>([]);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();
  const [addedProducts, setAddedProducts] = useState<IAddedProducts[]>([]);
  const [total, setTotal] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  useEffect(() => {
    getProducts();
    getCustomers();
  }, []);

  useEffect(() => {
    getTotal();
  }, [addedProducts]);

  const getProducts = () => {
    ProductService.getAll().subscribe((res: any) => {
      setProducts(res.data);
    });
  };

  const getCustomers = () => {
    CustomerService.getAll().subscribe((res: any) => {
      setCustomers(res.data);
    });
  };
  const addToProduct = (product: IProducts, qty?: number) => {
    const findProduct: IProducts | any = addedProducts.find(
      (item: IAddedProducts) => item.id === product.id
    );

    let newProduct = [];

    if (findProduct) {
      findProduct.qty = qty || ++findProduct.qty;
      const oldProducts = addedProducts.filter(
        (item: IAddedProducts) => item.id !== product.id
      );
      newProduct = [...oldProducts, findProduct];
    } else {
      product.qty = 1;
      newProduct = [...addedProducts, product];
    }
    setAddedProducts(newProduct);
  };

  const removeItem = (product: IProducts) => {
    const newProducts = addedProducts.filter(
      (item: IAddedProducts) => item.id !== product.id
    );
    setAddedProducts(newProducts);
    setToastVariant("danger");
    setToastMsg(product.name + " removed from oder table");
    setToastShow(true);
  };

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

  const onChangeQty = (event: any, product: any) => {
    if (event.target.value < 1) {
      return;
    }
    addToProduct(product, event.target.value);
  };

  const onChangeCustomer = (customerId: any) => {
    const findCustomer = customers.find(
      (item: any) => +item.id === +customerId
    );

    if (findCustomer) {
      setSelectedCustomer(findCustomer);
      return;
    }
  };

  const onProductFilter = (productDetails: string) => {
    if (productDetails) {
      const filter = products.filter((item: IProducts) =>
        item.name.toLowerCase().includes(productDetails)
      );
      setSearchProducts(filter);
      return;
    }
    setSearchProducts([]);
  };

  const onCancel = () => {
    setAddedProducts([]);
    setToastVariant("danger");
    setToastMsg("Order Canceled");
    setToastShow(true);
  };

  const onOrder = () => {
    if (addedProducts.length) {
      setModalShow(true)
      setToastVariant("success");
      setToastMsg("Order Successful");
    } else {
      setToastVariant("info");
      setToastMsg("No products added");
    }
    setToastShow(true);
  };

  return (
    <Container fluid>
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
            <input
              type="text"
              className="form-control"
              placeholder="Search product by name"
              aria-label="Search product by name"
              onChange={(e) => onProductFilter(e.target.value)}
            />
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
                  <td rowSpan={2} className="bg-success">
                    <button className="btn btn-success w-100">
                      <FaRegMoneyBillAlt /> Payment
                    </button>
                  </td>
                </tr>
                <tr>
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
        <Col md={7} sm={12} xs={12}>
          <Row className="justify-content-center">
            {products.map((product: IProducts, index: number) => {
              return (
                <Col
                  md={3}
                  sm={12}
                  xs={12}
                  key={index}
                  onClick={() => addToProduct(product)}
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
            <button className="btn btn-sm text-light">
              <AiOutlineLeft />
            </button>
            <button className="btn w-100 text-light">Sell Gift Card</button>
            <button className="btn btn-sm text-light">
              <AiOutlineRight />
            </button>
          </div>
        </Col>
      </Row>

      <Toastr
        show={toastShow}
        setShow={setToastShow}
        msg={toastMsg}
        variant={toastVariant}
      />
      <CustomModal setShow={setModalShow} show={modalShow}>
        <div>
          <div>customer information</div>
          <OrderPreviewTable
            addedProducts={addedProducts}
          />
        </div>
      </CustomModal>
    </Container>
  );
};
