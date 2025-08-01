import React, { useState } from "react";
import { useNavigate } from "react-router";
import { register as registerRequest } from "../fetchers/register";
import { RegisterForm, registerSchema } from "../zod/registerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorSummary from "../components/errorSummary";
import { errorMessages } from "../utils/generic";

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (formData: RegisterForm) => {
    setError("");

    try {
      const response = await registerRequest(
        formData.email,
        formData.firstName,
        formData.lastName,
      );

      if (response.registerRequest.success) {
        // If register is successful, redirect to the home page
        void navigate("/");
      }
      if (!response.registerRequest.success) {
        // If register is successful, redirect to the home page
        setError(response.registerRequest.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="parent">
      <div className="main">
        <form onSubmit={handleSubmit(onSubmit)} className="login-container">
          <label htmlFor="email">Email:</label>
          <input {...register("email")} />
          <label htmlFor="firstName">First Name:</label>
          <input {...register("firstName")} />
          <label htmlFor="lastName">Last Name:</label>
          <input {...register("lastName")} />
          <button type="submit">register</button>
        </form>
        <ErrorSummary errorMessages={errorMessages(errors)} error={error} />
      </div>
    </div>
  );
};

export default Register;
