import { createBrowserRouter, Navigate } from "react-router";
import { lazy, Suspense } from "react";
import Protected from "./features/chat/components/Protected";

const Login = lazy(() => import("./features/auth/pages/Login"));
const Register = lazy(() => import("./features/auth/pages/Register"));
const Pricing = lazy(() => import("./features/pricing/pages/Pricing"));
const BattleArena = lazy(() => import("./features/battle/pages/BattleArena"));
const ChatInterface = lazy(() =>
  import("./features/chat/components").then((module) => ({
    default: module.ChatInterface,
  }))
);

const Loader = () => <div>Loading...</div>;

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<Loader />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/pricing",
    element: (
      <Suspense fallback={<Loader />}>
        <Pricing />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Protected>
        <Suspense fallback={<Loader />}>
          <BattleArena />
        </Suspense>
      </Protected>
    ),
  },
  {
    path: "/battle",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/dashboard",
    element: <Navigate to="/" replace />,
  },
]);