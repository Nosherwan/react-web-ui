import React, { useState } from "react";
import { useNavigate } from "react-router";
import { forgotPassword as forgotPasswordRequest } from "../fetchers/register";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorSummary from "../components/errorSummary";
import { errorMessages } from "../utils/generic";

const forgotPasswordSchema = z.object({
  email: z.string().email("Provide a valid email address."),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (formData: ForgotPasswordForm) => {
    setError("");

    try {
      const response = await forgotPasswordRequest(formData.email);

      if (response.forgotPassword.success) {
        // If register is successful, redirect to the home page
        void navigate("/");
      }
      if (!response.forgotPassword.success) {
        // If register is successful, redirect to the home page
        setError(response.forgotPassword.message);
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
          <button type="submit">Forgot Password</button>
        </form>
        <ErrorSummary errorMessages={errorMessages(errors)} error={error} />
      </div>
    </div>
  );
};

export default ForgotPassword;
