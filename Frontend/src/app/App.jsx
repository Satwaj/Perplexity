import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { useAuth } from "./features/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import Loading from "./features/auth/pages/Loading";

const App = () => {
  const { handleGetMe } = useAuth();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    handleGetMe();
    // Show loading for at least 2 seconds
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [handleGetMe]);

  return (
    <>
      {showLoading && <Loading />}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
