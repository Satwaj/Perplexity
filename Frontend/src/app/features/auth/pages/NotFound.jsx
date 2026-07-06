import React from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#F9F9F7] flex items-center justify-center p-6 md:p-12 relative overflow-hidden font-sans">
      <div className="w-full max-w-lg text-center p-8 md:p-12 bg-white border-2 border-[#1A1C1B] shadow-[8px_8px_0px_0px_#1A1C1B]">
        <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-100 px-2.5 py-1 border border-red-300">
          ERROR 404
        </span>
        
        <h1 className="text-4xl md:text-6xl font-serif-brutalist font-black text-[#1A1C1B] tracking-tight mt-6 mb-4">
          PAGE NOT FOUND
        </h1>
        
        <div className="w-20 border-b-2 border-black mx-auto mb-6"></div>

        <p className="text-sm text-[#536255] max-w-sm mx-auto mb-8 font-medium leading-relaxed">
          The requested coordinate or AI route does not exist. It has either relocated or never initialized.
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full sm:w-auto border-2 border-[#1A1C1B] bg-[#1A1C1B] text-[#F9F9F7] font-bold px-8 py-3.5 uppercase tracking-wider shadow-[4px_4px_0px_0px_#C5A880] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#C5A880] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#C5A880] transition-all cursor-pointer text-sm"
        >
          Return to Arena
        </button>
      </div>
    </section>
  );
};

export default NotFound;
