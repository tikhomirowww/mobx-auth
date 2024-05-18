import { createBrowserRouter } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Users from "../components/Users";
import Layout from "../components/Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "/users", element: <Users /> },
    ],
  },
]);
