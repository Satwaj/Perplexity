import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { getGoogleAuthURL } from "../services/api.auth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import gsap from "gsap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }
      );
    }
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();

    const payload = {
      email: email.trim(),
      password,
    };

    const loginUser = await handleLogin(payload);
    if (loginUser) {
      navigate("/");
    }
  };

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="min-h-screen bg-[#F9F9F7] flex flex-row overflow-hidden relative">
      {/* Left Column: Image Panel (classy neobrutalist design element) */}
      <div className="hidden lg:flex w-1/2 relative bg-[#F5D3B8]/20 border-r-2 border-[#1A1C1B] items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[#F5D3B8]/5 pointer-events-none z-10" />
        <img
          ref={imageRef}
          src="/auth_illustration.png"
          alt="Arena Illustration"
          className="w-full h-full object-cover max-h-[85vh] border-2 border-[#1A1C1B] shadow-[12px_12px_0px_0px_#1A1C1B] opacity-0"
        />
        <div className="absolute bottom-6 left-6 z-20 bg-white border-2 border-[#1A1C1B] p-4 shadow-[4px_4px_0px_0px_#1A1C1B]">
          <p className="font-serif-brutalist text-xl font-bold tracking-tight text-[#1A1C1B]">
            ARENA AI
          </p>
          <p className="text-[10px] uppercase font-bold tracking-wider text-[#536255] mt-1">
            V1.0.4 - Model Battle Grid
          </p>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div
          ref={formRef}
          className="w-full max-w-md p-8 md:p-10 bg-white border-2 border-[#1A1C1B] shadow-[8px_8px_0px_0px_#1A1C1B] opacity-0"
        >
          <div className="mb-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#008080] bg-[#008080]/10 px-2.5 py-1 border border-[#008080]/20">
              AUTHENTICATION
            </span>
            <h1 className="text-3xl md:text-4xl font-serif-brutalist font-bold text-[#1A1C1B] tracking-tight mt-4">
              Welcome Back
            </h1>
            <p className="text-sm text-[#536255] mt-1 font-medium">
              Sign in to run comparison battles.
            </p>
          </div>

          {/* Google OAuth Button (Neobrutalist style) */}
          <a
            href={getGoogleAuthURL()}
            className="flex w-full items-center justify-center gap-3 border-2 border-[#1A1C1B] bg-[#F5D3B8] p-3.5 font-bold text-[#1A1C1B] shadow-[4px_4px_0px_0px_#1A1C1B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1A1C1B] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#1A1C1B] transition-all cursor-pointer"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#1A1C1B"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#1A1C1B"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#1A1C1B"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#1A1C1B"
              />
            </svg>
            Continue with Google
          </a>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 border-t-2 border-[#1A1C1B]"></div>
            <span className="text-[10px] font-bold tracking-widest text-[#7E7576]">OR</span>
            <div className="flex-1 border-t-2 border-[#1A1C1B]"></div>
          </div>

          <form onSubmit={submitForm} className="mt-6 space-y-5">
            {error && (
              <p className="rounded-none border-2 border-red-500 bg-red-500/5 p-3 text-xs font-bold text-red-700">
                {error}
              </p>
            )}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#536255]"
              >
                Email or Username
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email or username"
                required
                className="w-full bg-white border-2 border-[#1A1C1B] p-3 text-[#1A1C1B] font-medium outline-none transition focus:shadow-[2px_2px_0px_0px_#1A1C1B]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#536255]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                required
                className="w-full bg-white border-2 border-[#1A1C1B] p-3 text-[#1A1C1B] font-medium outline-none transition focus:shadow-[2px_2px_0px_0px_#1A1C1B]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer border-2 border-[#1A1C1B] bg-[#1A1C1B] text-[#F9F9F7] font-bold p-3.5 uppercase tracking-wider shadow-[4px_4px_0px_0px_#C5A880] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#C5A880] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#C5A880] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#7E7576] font-medium">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-[#008080] hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
