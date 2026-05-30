import { createBrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Dashboard from "./features/chat/pages/Dashboard";
import Protected from "./features/chat/components/Protected";
import { ChatInterface } from "./features/chat/components";
import Pricing from "./features/pricing/pages/Pricing";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <ChatInterface />
      </Protected>
    ),
  },

  {
    path: "/dashboard",
    element: <Navigate to="/" replace />,
  },
]);
