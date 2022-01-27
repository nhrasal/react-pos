import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row, Table } from "react-bootstrap";
import { IAddedProducts, IProducts } from "../@fake-db/Products";
import { ProductService } from "../@services/products.service";
import { BsTrash } from "react-icons/bs";
import Button from "@restart/ui/esm/Button";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [addedProducts, setAddedProducts] = useState<IAddedProducts[]>([]);
  const [total, setTotal] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

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
        totalQty += item.qty || 1;
        totalPrice += item.price * (item.qty || 1);
      });
    }
    setTotalItem(totalQty);
    setTotal(totalPrice);
  };

  const onChangeQty = (event: any, product: any) => {
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
          <Card className="bg-white">
            <Table striped bordered hover>
              <thead>
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
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>
                            <input
                              type="number"
                              value={product.qty}
                              onChange={(e) => onChangeQty(e, product)}
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
                    <td colSpan={4}> no data found</td>
                  </tr>
                )}
              </tbody>
            </Table>
           Total Item:  {total}
           Total Amount:  {totalItem}
          </Card>
        </Col>
        <Col md={7} sm={12} xs={12} className="">
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
        </Col>
      </Row>
    </Container>
  );
};
