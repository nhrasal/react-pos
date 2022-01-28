import React from "react";
import { Button, Modal } from "react-bootstrap";
interface ICustomModal {
  show: boolean;
  setShow: void | any;
  title?: string;
  children?:any
}

export const CustomModal = ({children, show, setShow,title }: ICustomModal) => {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
