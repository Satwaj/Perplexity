import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const user = useSelector((state) => state.auth?.user);
  const loading = useSelector((state) => state.auth?.loading);
  const error = useSelector((state) => state.auth?.error);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
          </div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
