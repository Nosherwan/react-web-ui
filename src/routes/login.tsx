import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../fetchers/login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm, loginSchema } from "../zod/loginSchema";
import ErrorSummary from "../components/errorSummary";
import { errorMessages } from "../utils/generic";
import { scheduleTokenRefresh } from "../utils/scheduleTokenRefresh";

const Login: React.FC = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData: LoginForm) => {
    setError("");
    try {
      const response = await login(formData.email, formData.password);
      if (response.login.success) {
        scheduleTokenRefresh();
        // If login is successful, redirect to the home page
        void navigate("/");
      }
      if (!response.login.success) {
        // If login not successful
        setError(response.login.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const toRegister = () => void navigate("/register");

  return (
    <div className="parent">
      <div className="main">
        <form onSubmit={handleSubmit(onSubmit)} className="login-container">
          <label htmlFor="email">Email:</label>
          <input
            {...register("email")}
            className={errors.email ? "input-error" : ""}
            aria-invalid={errors.email ? "true" : "false"}
          />
          <label htmlFor="password">Password:</label>
          <input
            {...register("password")}
            type="password"
            className={errors.password ? "input-error" : ""}
            aria-invalid={errors.password ? "true" : "false"}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
          <Link to="/forgot-password">Forgot Password</Link>
          <button type="button" className="create-account" onClick={toRegister}>
            Create Account
          </button>
        </form>
        <ErrorSummary errorMessages={errorMessages(errors)} error={error} />
      </div>
    </div>
  );
};

export default Login;
