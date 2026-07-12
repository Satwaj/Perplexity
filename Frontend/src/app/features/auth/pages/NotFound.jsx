import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { FiHome, FiTrendingUp } from "react-icons/fi";
import gsap from "gsap";

const NotFound = () => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const glow1Ref = useRef(null);
  const glow2Ref = useRef(null);
  const [countdown, setCountdown] = useState(10);

  // Auto-redirect countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  // GSAP Animations
  useEffect(() => {
    // Staggered reveal
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.96, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }

    // Gentle ambient drift
    gsap.to(glow1Ref.current, {
      x: "random(-40, 40)",
      y: "random(-30, 30)",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(glow2Ref.current, {
      x: "random(-30, 30)",
      y: "random(-45, 45)",
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Parallax background glows
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to(glow1Ref.current, {
        x: `+=${xPos * 0.25}`,
        y: `+=${yPos * 0.25}`,
        overwrite: "auto",
        duration: 1,
        ease: "power1.out"
      });

      gsap.to(glow2Ref.current, {
        x: `-=${xPos * 0.15}`,
        y: `-=${yPos * 0.15}`,
        overwrite: "auto",
        duration: 1,
        ease: "power1.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 3D Card Tilt on mouse move
  const handleCardMouseMove = (e) => {
    const cardEl = cardRef.current;
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 14;
    const angleY = (x - xc) / 14;

    gsap.to(cardEl, {
      rotateX: angleX,
      rotateY: angleY,
      scale: 1.01,
      borderColor: "rgba(139, 92, 246, 0.25)",
      boxShadow: "0 25px 45px rgba(0, 0, 0, 0.6), 0 0 30px rgba(139, 92, 246, 0.05)",
      ease: "power2.out",
      duration: 0.3
    });
  };

  const handleCardMouseLeave = () => {
    const cardEl = cardRef.current;
    if (!cardEl) return;
    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      borderColor: "rgba(255, 255, 255, 0.06)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      ease: "power2.out",
      duration: 0.5
    });
  };

  return (
    <section className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 md:p-12 relative overflow-hidden font-sans select-none">
      {/* Background radial grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08] z-0"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 0)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Floating Radial Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div ref={glow1Ref} className="absolute top-24 left-[15%] w-80 h-80 rounded-full bg-violet-600/5 blur-3xl" />
        <div ref={glow2Ref} className="absolute bottom-32 right-[20%] w-96 h-96 rounded-full bg-red-600/5 blur-3xl" />
      </div>

      <div
        ref={cardRef}
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        className="w-full max-w-lg text-center p-8 md:p-12 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative z-10 card-brutalist transition-colors duration-300"
      >
        <span className="text-[9px] font-bold uppercase tracking-widest text-red-400 bg-red-500/10 px-3.5 py-1.5 rounded-full border border-red-500/20 font-mono-geist">
          ERROR_CODE: 404
        </span>

        <h1 className="text-4xl md:text-5xl font-serif-brutalist font-black text-white tracking-tight mt-8 mb-4 leading-none text-glow-gradient">
          GRID COORDINATE LOST
        </h1>

        <div className="w-12 h-0.5 bg-red-500/40 mx-auto mb-6 rounded"></div>

        <p className="text-xs text-zinc-400 max-w-xs mx-auto mb-8 font-semibold leading-relaxed">
          The requested coordinate or AI route does not exist. It has either relocated or never initialized.
        </p>

        {/* Redirect button */}
        <button
          onClick={() => navigate("/")}
          className="w-full sm:w-auto cursor-pointer bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-[0_4px_15px_rgba(139,92,246,0.3)] transition-all hover:scale-[1.03] active:scale-[0.97] uppercase tracking-wider text-xs flex items-center justify-center gap-2 mx-auto"
        >
          <FiHome size={14} />
          Return to Arena
        </button>

        {/* Countdown footer */}
        <div className="mt-8 border-t border-white/5 pt-5 text-[10px] font-semibold text-zinc-550 uppercase tracking-widest font-mono-geist flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
          <span>Auto-redirecting to Home in {countdown}s</span>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
