import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loading = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const chars = textRef.current.querySelectorAll(".char");
    
    // Set initial state
    gsap.set(chars, { y: 20, opacity: 0 });
    
    const tl = gsap.timeline();
    tl.to(chars, {
      y: 0,
      opacity: 1,
      stagger: 0.08,
      duration: 0.8,
      ease: "power4.out",
    });

    // Gentle pulse of subtitle
    gsap.to(".loading-subtitle", {
      opacity: 0.4,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#09090b] flex flex-col items-center justify-center z-50 select-none"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated Text */}
        <div 
          ref={textRef}
          className="overflow-hidden flex font-sans text-5xl md:text-7xl font-extrabold tracking-[0.2em] text-white"
        >
          {["A", "R", "E", "N", "A"].map((char, index) => (
            <span key={index} className="char inline-block mx-0.5">
              {char}
            </span>
          ))}
        </div>
        
        {/* Subtitle */}
        <p className="loading-subtitle text-[10px] font-bold tracking-[0.25em] text-zinc-400 uppercase">
          Initializing Battle Grid
        </p>

        {/* Premium Loading Bar */}
        <div className="w-40 h-[2px] bg-white/5 relative overflow-hidden mt-1 rounded-full">
          <div className="absolute top-0 bottom-0 bg-linear-to-r from-violet-500 to-indigo-500 w-16 rounded animate-[loading-bar_1.8s_infinite_ease-in-out]"></div>
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { left: -70px; }
          100% { left: 170px; }
        }
      `}</style>
    </div>
  );
};

export default Loading;
