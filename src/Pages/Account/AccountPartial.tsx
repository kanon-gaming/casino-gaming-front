import React from "react";

import Modal from "react-bootstrap/Modal";

import { Tab, Tabs } from "react-bootstrap";
import { LoginPartial } from "./Login/LoginPartial";

export function AccountPartial() {

  return (
    <Modal
      show={true}
      backdrop="static"
      keyboard={false}
      animation={false}
      size="lg"
      contentClassName="animated pulse"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Tabs defaultActiveKey="login" id="formAccount" className="mb-3">
          <Tab eventKey="login" title="Sign in">
            <LoginPartial />
          </Tab>
          <Tab eventKey="register" title="New Account"></Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}
