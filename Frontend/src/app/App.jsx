import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { useAuth } from "./features/auth/hooks/useAuth";
import { useEffect, useState } from "react";

const App = () => {
  const { handleGetMe } = useAuth();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // 1. Capture token from query parameters (Google OAuth callback redirect)
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("authToken", token);
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, cleanUrl);
    }

    // 2. Perform initialization check immediately
    const init = async () => {
      try {
        await handleGetMe();
      } finally {
        setInitializing(false);
      }
    };

    init();
  }, [handleGetMe]);

  if (initializing) {
    return null;
  }

  return <RouterProvider router={router} />;
};

export default App;
