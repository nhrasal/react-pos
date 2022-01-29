import React from "react";
import { Container } from "react-bootstrap";

const Layout = ({ children }: any) => {
  return (
    <Container fluid>
      <div className="shadow p-3 mb-2 bg-white rounded text-center">
       <h4> Welcome to simple POS System</h4>
      </div>
      {children}
    </Container>
  );
};
export default Layout;
