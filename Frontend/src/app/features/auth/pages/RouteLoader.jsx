import React from "react";

const RouteLoader = () => {
  return (
    <div className="fixed inset-0 bg-[#09090b] flex flex-col items-center justify-center z-50 select-none">
      <div className="flex flex-col items-center gap-4">
        {/* Sleek, minimalist pulsing glow ring */}
        <div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
        <p className="text-[9px] font-bold tracking-[0.2em] text-zinc-500 uppercase animate-pulse">
          Loading Page
        </p>
      </div>
    </div>
  );
};

export default RouteLoader;
