import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./styles/fonts.css";
import "./styles/index.css";
import MainHome from "./routes/mainHome";
import MainLayout from "./routes/mainLayout";
import Login from "./routes/login";
import Register from "./routes/register";
import CreatePassword from "./routes/createPassword";
import ForgotPassword from "./routes/forgotPassword";
import Blogs from "./routes/blogs";
import Blog from "./routes/blog";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<MainHome />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blog/:slug" element={<Blog />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="create-password" element={<CreatePassword />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
