import axios from "axios";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { LoginModel } from "../models/LoginModel";
import { RegisterModel } from "../models/RegisterModel";
import { ResultApiModel } from "../models/ResultApiModel";

export class AccountStore {
  loginModel: LoginModel = {
    email: "",
    password: "",
    isValid: false,
  };

  registerModel: RegisterModel = {
    name: "",
    nameMessage: "",
    email: "",
    emailMessage: "",
    password: "",
    passwordMessage: "",
    passwordconfirm: "",
    passwordconfirmMessage: "",
    isValid: false,
    isPasswordVisible: false,
  };

  resultApiModel: ResultApiModel = {
    valid: true,
    messages: [],
  };

  async doRegister() {
    return await axios({
      method: "post",
      url: "http://localhost:2002/register",
      data: {
        email: this.registerModel.email,
        name: this.registerModel.name,
        password: this.registerModel.password,
        confirmpassword: this.registerModel.passwordconfirm,
      },
    });
  }

  isRegisterFormValid() {
    if (!accountStore.registerModel.name) {
      accountStore.registerModel.nameMessage = "Please provide a valid name.";
    } else if (
      accountStore.registerModel.name &&
      accountStore.registerModel.name.length > 200
    ) {
      accountStore.registerModel.nameMessage =
        "Name must contain a maximum of 200 characters.";
    } else {
      accountStore.registerModel.nameMessage = "";
    }

    if (!accountStore.registerModel.email) {
      accountStore.registerModel.emailMessage = "Please provide a email.";
    } else if (
      accountStore.registerModel.email &&
      !/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(
        accountStore.registerModel.email
      )
    ) {
      accountStore.registerModel.emailMessage = "Please provide a valid email.";
    } else if (
      accountStore.registerModel.email &&
      accountStore.registerModel.email.length > 150
    ) {
      accountStore.registerModel.emailMessage =
        "Email must contain a maximum of 150 characters.";
    } else {
      accountStore.registerModel.emailMessage = "";
    }

    if (!accountStore.registerModel.password) {
      accountStore.registerModel.passwordMessage = "Please provide a password.";
    } else if (
      accountStore.registerModel.password &&
      accountStore.registerModel.password.length > 15
    ) {
      accountStore.registerModel.passwordMessage =
        "Name must contain a maximum of 15 characters.";
    } else if (
      accountStore.registerModel.password &&
      accountStore.registerModel.password.length < 6
    ) {
      accountStore.registerModel.passwordMessage =
        "Name must contain at least of 6 characters.";
    } else {
      accountStore.registerModel.passwordMessage = "";
    }

    if (
      accountStore.registerModel.password &&
      !accountStore.registerModel.passwordconfirm
    ) {
      accountStore.registerModel.passwordconfirmMessage =
        "Please confirm your password";
    } else if (
      accountStore.registerModel.password &&
      accountStore.registerModel.passwordconfirm &&
      accountStore.registerModel.passwordconfirm !==
        accountStore.registerModel.password
    ) {
      accountStore.registerModel.passwordconfirmMessage =
        "Your password doesn't match";
    } else {
      accountStore.registerModel.passwordconfirmMessage = "";
    }

    if (
      accountStore.registerModel.nameMessage ||
      accountStore.registerModel.emailMessage ||
      accountStore.registerModel.passwordMessage ||
      accountStore.registerModel.passwordconfirmMessage
    ) {
      return false;
    }else{
      return true;
    }
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const accountStore = new AccountStore();
export const AccountStoreContext = createContext(accountStore);
export const AccountStoreProvider = AccountStoreContext.Provider;
export const useAccountStore = () => useContext(AccountStoreContext);
