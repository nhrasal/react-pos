import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Layout = ({ children }: any) => {
  return (
    <Container fluid>
      <div className="shadow-lg p-3 mb-5 bg-white rounded text-center">
        Welcome to new app
      </div>
      <Row>{children}</Row>
    </Container>
  );
};
export default Layout;
