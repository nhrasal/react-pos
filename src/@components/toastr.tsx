import React from "react";
import { Toast } from "react-bootstrap";

export const Toastr = (show: boolean, setShow:any, msg?:string) => {
  return (
    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
      <Toast.Body>{msg}</Toast.Body>
    </Toast>
  );
};
