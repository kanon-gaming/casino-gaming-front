import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import React from "react";

import { Button, Form, InputGroup } from "react-bootstrap";
import { useAccountStore } from "../../../Stores/AccountStore";

export const LoginPartial = observer(() => {
  const accountStore = useAccountStore();
  const navigate = useNavigate();

  const onSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      accountStore.loginModel.isValid = true;
    } else {
      accountStore.loginModel.isValid = false;
      navigate('/Games');
    }
  };

  return (
    <Form
      noValidate
      validated={accountStore.loginModel.isValid}
      onSubmit={onSubmit}
    >
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-email">@</InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) =>
              (accountStore.loginModel.email = e.currentTarget.value)
            }
            aria-label="Email"
            aria-describedby="email"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </InputGroup>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
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
          Please provide a password.
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
});
