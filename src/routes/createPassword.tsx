import React, { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { createPassword } from "../fetchers/register";
import { createPasswordSchema } from "../zod/createPasswordSchema";
import { CreatePasswordForm } from "../zod/createPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorSummary from "../components/errorSummary";
import { errorMessages } from "../utils/generic";

const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const uuid = useRef(searchParams.get("uuid") ?? "");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createPasswordSchema),
  });

  const [error, setError] = useState<string>("");

  const onSubmit = async (formData: CreatePasswordForm) => {
    setError("");

    try {
      const response = await createPassword(uuid.current, formData.password);
      if (response.createPassword.success) {
        // If create password is successful, redirect to the home page
        void navigate("/login");
      }
      if (!response.createPassword.success) {
        // If createing password failed, redirect to the home page
        setError(response.createPassword.message);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <div className="parent">
      <div className="main">
        <form onSubmit={handleSubmit(onSubmit)} className="login-container">
          <label htmlFor="password1">Password:</label>
          <input
            type="password"
            {...register("password")}
            autoComplete="new-password"
          />
          <label htmlFor="confirm">Confirm:</label>
          <input
            type="password"
            {...register("confirm")}
            autoComplete="new-password"
          />
          <button type="submit">Create Password</button>
        </form>
        <ErrorSummary errorMessages={errorMessages(errors)} error={error} />
      </div>
    </div>
  );
};

export default Register;
