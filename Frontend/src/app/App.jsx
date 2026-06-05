import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { useAuth } from "./features/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import Loading from "./features/auth/pages/Loading";

const App = () => {
  const { handleGetMe } = useAuth();
  const [showLoading, setShowLoading] = useState(true);

 useEffect(() => {
   const init = async () => {
     try {
       await handleGetMe();
     } finally {
       setShowLoading(false);
     }
   };

   init();
 }, [handleGetMe]);

 
  return (
    <>
      {showLoading && <Loading />}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
