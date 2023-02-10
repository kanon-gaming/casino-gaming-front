import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import React from "react";

import { Button, Form, InputGroup } from "react-bootstrap";
import { useAccountStore } from "../../../Stores/AccountStore";
import { toast } from "react-toastify";

export const LoginPartial = observer(() => {
  const accountStore = useAccountStore();
  const navigate = useNavigate();

  const onSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (accountStore.isLoginFormValid()) {
      accountStore.loginModel.isValid = true;
    } else {
      accountStore.loginModel.isValid = false;
    }

    if (accountStore.loginModel.isValid) {
      accountStore.doLogin().then(function (result) {
        accountStore.resultApiRegisterModel = result.data;
        if (!accountStore.resultApiRegisterModel.valid) {
          accountStore.resultApiRegisterModel.messages.forEach((element) => {
            toast.warn(element, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 4000,
            });
          });
        } else {
          navigate("/Games");
        }
      });
    }
  };

  return (
    <Form
      noValidate
      validated={accountStore.registerModel.isValid}
      onSubmit={onSubmit}
    >
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-email">@</InputGroup.Text>
          <Form.Control
            type="email"
            isInvalid={!!accountStore.loginModel.emailMessage}
            placeholder="Enter email"
            onChange={(e) =>
              (accountStore.loginModel.email = e.currentTarget.value)
            }
            aria-label="Email"
            aria-describedby="email"
            required
          />
          <Form.Control.Feedback type="invalid">
            {accountStore.loginModel.emailMessage}
          </Form.Control.Feedback>
        </InputGroup>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          isInvalid={!!accountStore.loginModel.passwordMessage}
          type="password"
          onChange={(e) =>
            (accountStore.loginModel.password = e.currentTarget.value)
          }
          placeholder="Password"
          aria-label="Password"
          aria-describedby="password"
          required
        />
        <Form.Control.Feedback type="invalid">
          {accountStore.loginModel.passwordMessage}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
});
