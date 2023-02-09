import { observer } from "mobx-react";
import React from "react";

import { Button, Form, InputGroup } from "react-bootstrap";
import { useAccountStore } from "../../../Stores/AccountStore";
import { GoEye, GoEyeClosed } from "react-icons/go";

export const RegisterPartial = observer(() => {
  const accountStore = useAccountStore();

  const isPasswordVisible = () => {
    accountStore.registerModel.isPasswordVisible =
      !accountStore.registerModel.isPasswordVisible;
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      accountStore.registerModel.isValid = true;
    } else {
      accountStore.registerModel.isValid = false;
    }
  };

  return (
    <Form
      noValidate
      validated={accountStore.registerModel.isValid}
      onSubmit={onSubmit}
    >
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter your name"
            onChange={(e) =>
              (accountStore.registerModel.name = e.currentTarget.value)
            }
            aria-label="Name"
            aria-describedby="name"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid name.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="emailRegister">
        <Form.Label>Email address</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-emailRegister">@</InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) =>
              (accountStore.registerModel.email = e.currentTarget.value)
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

      <Form.Group className="mb-3" controlId="passwordRegister">
        <Form.Label>Password</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            type={
              accountStore.registerModel.isPasswordVisible ? "text" : "password"
            }
            onChange={(e) =>
              (accountStore.registerModel.password = e.currentTarget.value)
            }
            placeholder="Password"
            aria-label="Password"
            aria-describedby="password"
            required
          />
          <Button
            type="button"
            onClick={isPasswordVisible}
            variant="outline-secondary"
            id="isPasswordVisible"
          >
            {accountStore.registerModel.isPasswordVisible ? (
              <GoEye />
            ) : (
              <GoEyeClosed />
            )}
          </Button>

          <Form.Control.Feedback type="invalid">
            Please provide a password.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="passwordConfirmRegister">
        <Form.Label>Confirm Password</Form.Label>

        <Form.Control
          type="password"
          onChange={(e) =>
            (accountStore.registerModel.passwordconfirm = e.currentTarget.value)
          }
          placeholder="Confirm Password"
          aria-label="Confirm Password"
          aria-describedby="passwordConfirmRegister"
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
