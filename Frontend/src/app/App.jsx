import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { useAuth } from "./features/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import Loading from "./features/auth/pages/Loading";
import RenderInitializing from "./features/auth/pages/RenderInitializing";

const App = () => {
  const { handleGetMe } = useAuth();
  const [showRenderInit, setShowRenderInit] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Show Render initialization screen for 6 seconds (accounts for cold start)
    const renderInitTimer = setTimeout(() => {
      setShowRenderInit(false);
      setShowLoading(true);
    }, 6000);

    return () => clearTimeout(renderInitTimer);
  }, []);

  useEffect(() => {
    if (!showLoading) return;

    const init = async () => {
      try {
        await handleGetMe();
      } finally {
        setShowLoading(false);
      }
    };

    init();
  }, [showLoading, handleGetMe]);

  return (
    <>
      {showRenderInit && <RenderInitializing />}
      {showLoading && <Loading />}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
