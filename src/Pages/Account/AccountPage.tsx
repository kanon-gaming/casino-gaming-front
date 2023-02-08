import React from "react";

import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { accountStore, AccountStoreProvider } from "../../Stores/AccountStore";

import loginlogo from "../../assets/img/loginpage.webp";
import "../../assets/css/Login.css";

export function AccountPage() {
  return (
    <AccountStoreProvider value={accountStore}>
      <div
        style={{
          backgroundImage: `url(${loginlogo})`,
        }}
        className="App"
      >
        <div className="Body">
          <div className="Form">
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
                <Tabs
                  defaultActiveKey="login"
                  id="formAccount"
                  className="mb-3"
                >
                  <Tab eventKey="login" title="Sign in">
                  </Tab>
                  <Tab eventKey="register" title="New Account"></Tab>
                </Tabs>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </AccountStoreProvider>
  );
}
