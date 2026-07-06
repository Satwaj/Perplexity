import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import gsap from "gsap";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    if (infoRef.current) {
      gsap.fromTo(
        infoRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power2.out", delay: 0.1 }
      );
    }
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();

    const payload = {
      username,
      email,
      password,
    };

    const newUser = await handleRegister(payload);
    if (newUser) {
      setRegistrationSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="min-h-screen bg-[#F9F9F7] flex flex-row overflow-hidden relative selection:bg-[#F5D3B8]">
      {/* Neobrutalist background grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.07] z-0" 
        style={{
          backgroundImage: "radial-gradient(#1A1C1B 1.5px, transparent 0)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Left Column: Info Panel */}
      <div className="hidden lg:flex w-1/2 relative bg-[#F5D3B8]/20 border-r-2 border-[#1A1C1B] items-center justify-center p-12 overflow-hidden z-10">
        <div className="absolute inset-0 bg-[#F5D3B8]/5 pointer-events-none z-10" />
        
        {/* Welcome Card */}
        <div
          ref={infoRef}
          className="w-full max-w-lg bg-white border-2 border-[#1A1C1B] p-10 shadow-[12px_12px_0px_0px_#1A1C1B] flex flex-col justify-between min-h-[55vh] opacity-0"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#008080] bg-[#008080]/10 px-2.5 py-1 border border-[#008080]/20">
                SYSTEM REGISTER INTIALIZED
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif-brutalist font-black text-[#1A1C1B] tracking-tight mt-6 leading-tight">
              JOIN THE COMPARISON GRID
            </h2>
            <div className="w-16 border-b-2 border-black my-6"></div>
            <p className="text-sm text-[#536255] font-semibold leading-relaxed">
              Create your account credentials to run AI model benchmark battles, save history, customize presets, and analyze reasoning metrics.
            </p>
          </div>
          
          <div className="mt-8 border-t border-[#1A1C1B]/20 pt-6 flex items-center justify-between">
            <div>
              <p className="font-serif-brutalist text-lg font-bold tracking-tight text-[#1A1C1B]">
                ARENA AI
              </p>
              <p className="text-[9px] uppercase font-bold tracking-wider text-[#7E7576] mt-0.5">
                V1.0.4 - Model Battle Grid
              </p>
            </div>
            <span className="text-xs font-bold text-[#008080] tracking-wider font-mono">REGISTRY_ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Right Column: Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 z-10">
        <div
          ref={formRef}
          className="w-full max-w-md p-8 md:p-10 bg-white border-2 border-[#1A1C1B] shadow-[8px_8px_0px_0px_#1A1C1B] opacity-0"
        >
          <div className="mb-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#008080] bg-[#008080]/10 px-2.5 py-1 border border-[#008080]/20">
              CREATE CONNECTION
            </span>
            <h1 className="text-3xl md:text-4xl font-serif-brutalist font-bold text-[#1A1C1B] tracking-tight mt-4">
              Register Credentials
            </h1>
            <p className="text-xs text-[#7E7576] mt-1.5 font-bold uppercase tracking-wider">
              System access credentials
            </p>
          </div>

          <form onSubmit={submitForm} className="space-y-5">
            {registrationSuccess && (
              <div className="rounded-none border-2 border-green-500 bg-green-500/5 p-3 text-xs font-bold text-green-700 animate-bounce">
                ✓ Registration successful! Redirecting to login...
              </div>
            )}
            {error && (
              <div className="rounded-none border-2 border-red-500 bg-red-500/5 p-3 text-xs font-bold text-red-700 animate-pulse">
                ⚠ {error}
              </div>
            )}
            
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#536255]"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Choose a username"
                required
                className="w-full bg-[#F9F9F7] border-2 border-[#1A1C1B] p-3.5 text-[#1A1C1B] font-bold outline-none transition focus:bg-white focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_#1A1C1B] shadow-[4px_4px_0px_0px_rgba(26,28,27,0.05)] placeholder-[#7E7576]/50"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#536255]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-[#F9F9F7] border-2 border-[#1A1C1B] p-3.5 text-[#1A1C1B] font-bold outline-none transition focus:bg-white focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_#1A1C1B] shadow-[4px_4px_0px_0px_rgba(26,28,27,0.05)] placeholder-[#7E7576]/50"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#536255]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create password"
                required
                className="w-full bg-[#F9F9F7] border-2 border-[#1A1C1B] p-3.5 text-[#1A1C1B] font-bold outline-none transition focus:bg-white focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_#1A1C1B] shadow-[4px_4px_0px_0px_rgba(26,28,27,0.05)] placeholder-[#7E7576]/50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer border-2 border-[#1A1C1B] bg-[#1A1C1B] text-[#F9F9F7] font-extrabold p-4 uppercase tracking-widest shadow-[4px_4px_0px_0px_#C5A880] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#C5A880] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#C5A880] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs"
            >
              {loading ? "REGISTERING..." : "CREATE SYSTEM PROFILE"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-[#7E7576] font-bold uppercase tracking-wider">
            Already have an entry pass?{" "}
            <Link
              to="/login"
              className="text-[#008080] hover:underline underline-offset-4 ml-1"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
