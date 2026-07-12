import React from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 md:p-12 relative overflow-hidden font-sans select-none">
      {/* Background radial grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.12] z-0" 
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 0)",
          backgroundSize: "24px 24px"
        }}
      />
      <div className="absolute w-[40%] h-[40%] rounded-full bg-red-500/5 blur-[120px] pointer-events-none z-0" />

      <div className="w-full max-w-lg text-center p-8 md:p-12 bg-zinc-900/30 backdrop-blur-xl border border-white/[0.06] rounded-2xl shadow-2xl relative z-10">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
          ERROR 404
        </span>
        
        <h1 className="text-4xl md:text-5xl font-serif-brutalist font-black text-white tracking-tight mt-6 mb-4">
          PAGE NOT FOUND
        </h1>
        
        <div className="w-12 h-0.5 bg-red-500/40 mx-auto mb-6 rounded"></div>

        <p className="text-sm text-zinc-400 max-w-sm mx-auto mb-8 font-semibold leading-relaxed">
          The requested coordinate or AI route does not exist. It has either relocated or never initialized.
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full sm:w-auto cursor-pointer bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-[0_4px_20px_rgba(139,92,246,0.25)] active:scale-[0.98] uppercase tracking-wider text-xs"
        >
          Return to Arena
        </button>
      </div>
    </section>
  );
};

export default NotFound;
