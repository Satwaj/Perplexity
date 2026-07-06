import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loading = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const chars = textRef.current.querySelectorAll(".char");
    
    // Set initial state
    gsap.set(chars, { y: 60, opacity: 0 });
    
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
      opacity: 0.5,
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
      className="fixed inset-0 bg-[#F9F9F7] flex flex-col items-center justify-center z-50"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated Text */}
        <div 
          ref={textRef}
          className="overflow-hidden flex font-sans text-5xl md:text-7xl font-black tracking-widest text-[#1A1C1B]"
        >
          {["A", "R", "E", "N", "A"].map((char, index) => (
            <span key={index} className="char inline-block mx-0.5">
              {char}
            </span>
          ))}
        </div>
        
        {/* Subtitle */}
        <p className="loading-subtitle text-xs font-semibold tracking-[0.25em] text-[#536255] uppercase">
          Initializing Battle Grid
        </p>

        {/* Minimalist loading bar */}
        <div className="w-32 h-[2px] bg-[#E2E3E1] relative overflow-hidden mt-1">
          <div className="absolute top-0 bottom-0 bg-[#008080] w-12 rounded animate-[loading-bar_1.5s_infinite_ease-in-out]"></div>
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { left: -50px; }
          100% { left: 150px; }
        }
      `}</style>
    </div>
  );
};

export default Loading;
