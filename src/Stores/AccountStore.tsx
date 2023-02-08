import { createContext, useContext } from "react";
import { LoginModel } from "../models/LoginModel";

export class AccountStore {
  loginModel: LoginModel = { email: "", password: "" };
  isLoginValid: Boolean = false;
}

export const accountStore = new AccountStore();
export const AccountStoreContext = createContext(accountStore);
export const AccountStoreProvider = AccountStoreContext.Provider;
export const useStore = () => useContext(AccountStoreContext);

