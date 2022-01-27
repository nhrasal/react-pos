import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row, Table } from "react-bootstrap";
import { IAddedProducts, IProducts } from "../@fake-db/Products";
import { ProductService } from "../@services/products.service";
import { BsFileX, BsPlusCircleFill, BsTrash } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { AiFillEye, AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";
import Button from "@restart/ui/esm/Button";
import { Toastr } from "../@components/toastr";

export const Home = () => {
  const [toastShow, setToastShow] = useState(true);
  const [products, setProducts] = useState([]);
  const [addedProducts, setAddedProducts] = useState<IAddedProducts[]>([]);
  const [total, setTotal] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [dcTotalItem, setDcTotalItem] = useState(0.0);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getTotal();
  }, [addedProducts]);

  const getProducts = () => {
    ProductService.getProducts().subscribe((res: any) => {
      setProducts(res.data);
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
            <select className="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
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
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
            />
            <span className="input-group-text">
              <BsPlusCircleFill />
            </span>
          </div>
          <Card className="bg-white">
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
                    if (product.isAvailable) {
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
                            <Button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeItem(product)}
                            >
                              <BsTrash />
                            </Button>
                          </td>
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
                      {" "}
                      Suspend
                    </button>
                  </td>
                  <td className="bg-info">
                    <button className="btn btn-info w-100 text-light">
                      {" "}
                      Order
                    </button>
                  </td>
                  <td rowSpan={2} className="bg-success">
                    <button className="btn btn-success w-100">
                      {" "}
                      <FaRegMoneyBillAlt /> Payment
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="bg-danger">
                    <button className="btn btn-danger w-100"> Cancel</button>
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

      {/* {toastShow ? <Toastr show={toastShow} setShow={setToastShow} msg={"test msg"}/> : ""}
      <Button onClick={() => setToastShow(true)}>Show Toast</Button> */}
    </Container>
  );
};
