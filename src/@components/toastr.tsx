import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
interface IToast {
  show: boolean;
  setShow: any;
  msg: string;
  variant: string;
}

export const Toastr = ({ show, setShow, msg, variant }: IToast) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast
        onClose={() => setShow(false)}
        bg={variant.toLowerCase()}
        show={show}
        delay={5000}
        autohide
      >
        <Toast.Body>
          <strong className="text-light">{msg}</strong>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
