import axios from "axios";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { LoginModel } from "../models/LoginModel";
import { RegisterModel } from "../models/RegisterModel";
import { ResultApiModel } from "../models/ResultApiModel";

export class AccountStore {
  loginModel: LoginModel = {
    email: "",
    emailMessage: "",
    password: "",
    passwordMessage: "",
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
      url: process.env.REACT_APP_URL_BASE + "register",
      data: {
        email: this.registerModel.email,
        name: this.registerModel.name,
        password: this.registerModel.password,
        confirmpassword: this.registerModel.passwordconfirm,
      },
    });
  }

  async doLogin() {
    const url = process.env.REACT_APP_URL_BASE + "login";
    return await axios({
      method: "post",
      url: url,
      data: {
        email: this.loginModel.email,
        password: this.loginModel.password,
      },
    });
  }

  isLoginFormValid() {
    if (!accountStore.loginModel.email) {
      accountStore.loginModel.emailMessage = "Please provide a email.";
    } else if (
      accountStore.loginModel.email &&
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(
        accountStore.loginModel.email
      )
    ) {
      accountStore.loginModel.emailMessage = "Please provide a valid email.";
    } else {
      accountStore.loginModel.emailMessage = "";
    }

    if (!accountStore.loginModel.password) {
      accountStore.loginModel.passwordMessage = "Please provide a password.";
    } else {
      accountStore.loginModel.passwordMessage = "";
    }

    if (
      accountStore.registerModel.emailMessage ||
      accountStore.registerModel.passwordMessage
    ) {
      return false;
    } else {
      return true;
    }
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
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(
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
    } else {
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
