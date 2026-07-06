import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { useAuth } from "./features/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import Loading from "./features/auth/pages/Loading";
import RenderInitializing from "./features/auth/pages/RenderInitializing";

const App = () => {
  const { handleGetMe } = useAuth();
  const [initializing, setInitializing] = useState(true);
  const [showWakeUpMessage, setShowWakeUpMessage] = useState(false);

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
      // If the backend doesn't respond in 1.5s, assume a Render cold start and show waking up UI
      const timer = setTimeout(() => {
        setShowWakeUpMessage(true);
      }, 1500);

      try {
        await handleGetMe();
      } finally {
        clearTimeout(timer);
        setInitializing(false);
      }
    };

    init();
  }, [handleGetMe]);

  if (initializing) {
    if (showWakeUpMessage) {
      return <RenderInitializing />;
    }
    return <Loading />;
  }

  return <RouterProvider router={router} />;
};

export default App;
