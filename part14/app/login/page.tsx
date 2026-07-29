"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNotification } from "../components/NotificationContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputContainer from "../components/InputContainer";
import { FieldLabel } from "@/components/ui/field";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    try {
      const result = await signIn("credentials", {
        username: formData.get("username"),
        password: formData.get("password"),
        redirect: false,
      });
      if (!result) {
        setError("Unable to sign in. Please try again.");
        return;
      }
      if (result.error) {
        setError("Invalid username or password");
        return;
      }
      showNotification("Logged in");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-4xl">Login</h2>
      {error && (
        <p style={{ color: "red" }} data-testid="error-message">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input type="text" name="username" id="username" required />
        </InputContainer>
        <InputContainer>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input type="password" name="password" id="password" required />
        </InputContainer>
        <Button
          type="submit"
          data-testid="login-button"
          variant={"secondary"}
          size={"mySize"}
        >
          Login
        </Button>
      </form>
    </div>
  );
}
