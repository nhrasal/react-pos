import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Layout = ({ children }: any) => {
  return (
    <Container fluid>
      <div className="shadow p-3 mb-2 bg-white rounded text-center">
        Welcome to new app
      </div>
      {children}
    </Container>
  );
};
export default Layout;
