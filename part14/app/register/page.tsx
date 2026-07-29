"use client";

import { registerUser } from "../actions/users";
import { useActionState, useState } from "react";
import InputContainer from "../components/InputContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";

export default function RegisterPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, actionState] = useActionState(registerUser, {
    error: "",
    values: {
      username: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });
  const passwordsMatch = password === confirmPassword || confirmPassword === "";

  return (
    <div>
      <h2 className="text-4xl">Register</h2>
      <form action={actionState}>
        <InputContainer>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            type="text"
            name="username"
            defaultValue={state.values?.username}
            required
            id="username"
          />
        </InputContainer>
        <InputContainer>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            type="text"
            name="name"
            defaultValue={state.values?.name}
            required
            id="name"
          />
        </InputContainer>
        <InputContainer>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            id="password"
          />
        </InputContainer>
        <InputContainer>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            id="confirm-password"
          />
        </InputContainer>
        {!passwordsMatch && (
          <p style={{ color: "red" }} data-testid="passwordConfirm-error">
            Passwords do not match.
          </p>
        )}
        {state.error && (
          <p style={{ color: "red" }} data-testid="username-error">
            {state.error}
          </p>
        )}
        <Button
          type="submit"
          className="button"
          data-testid="register-button"
          variant={"secondary"}
          size={"mySize"}
        >
          Register
        </Button>
      </form>
    </div>
  );
}
