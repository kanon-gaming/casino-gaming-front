import React from "react";

import { accountStore, AccountStoreProvider } from "../../Stores/AccountStore";

import loginlogo from "../../assets/img/loginpage.webp";
import "../../assets/css/Login.css";
import { AccountPartial } from "./AccountPartial";

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
            <AccountPartial />
          </div>
        </div>
      </div>
    </AccountStoreProvider>
  );
}
