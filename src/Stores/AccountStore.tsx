import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { LoginModel } from "../models/LoginModel";
import { RegisterModel } from "../models/RegisterModel";

export class AccountStore {
  loginModel: LoginModel = {
    email: "",
    password: "",
    isValid: false,
  };

  registerModel: RegisterModel = {
    name: "",
    email: "",
    password: "",
    passwordconfirm: "",
    isValid: false,
    isPasswordVisible: false,
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export const accountStore = new AccountStore();
export const AccountStoreContext = createContext(accountStore);
export const AccountStoreProvider = AccountStoreContext.Provider;
export const useAccountStore = () => useContext(AccountStoreContext);
