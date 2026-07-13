import { createBrowserRouter, Navigate } from "react-router";
import { lazy, Suspense } from "react";
import Protected from "./features/chat/components/Protected";
import RouteLoader from "./features/auth/pages/RouteLoader";

const Login = lazy(() => import("./features/auth/pages/Login"));
const Register = lazy(() => import("./features/auth/pages/Register"));
const Pricing = lazy(() => import("./features/pricing/pages/Pricing"));
const BattleArena = lazy(() => import("./features/battle/pages/BattleArena"));
const Home = lazy(() => import("./features/home/pages/Home"));
const NotFound = lazy(() => import("./features/auth/pages/NotFound"));
const ChatInterface = lazy(() =>
  import("./features/chat/components").then((module) => ({
    default: module.ChatInterface,
  }))
);

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<RouteLoader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<RouteLoader />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/pricing",
    element: (
      <Suspense fallback={<RouteLoader />}>
        <Pricing />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<RouteLoader />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/arena",
    element: (
      <Suspense fallback={<RouteLoader />}>
        <BattleArena />
      </Suspense>
    ),
  },
  {
    path: "/chat",
    element: (
      <Protected>
        <Suspense fallback={<RouteLoader />}>
          <ChatInterface />
        </Suspense>
      </Protected>
    ),
  },
  {
    path: "/battle",
    element: <Navigate to="/arena" replace />,
  },
  {
    path: "/dashboard",
    element: <Navigate to="/" replace />,
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<RouteLoader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);