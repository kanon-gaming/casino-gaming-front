import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { LoginModel } from "../models/LoginModel";

export class AccountStore {
  loginModel: LoginModel = {
    email: "",
    password: "",
    isValid: false,
  };

  updateItem() {

  }
  
  constructor() {
    makeAutoObservable(this);
  }
}

export const accountStore = new AccountStore();
export const AccountStoreContext = createContext(accountStore);
export const AccountStoreProvider = AccountStoreContext.Provider;
export const useAccountStore = () => useContext(AccountStoreContext);
