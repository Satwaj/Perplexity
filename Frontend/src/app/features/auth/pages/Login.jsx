import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../auth.slice";
import { Navigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import gsap from "gsap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [logs, setLogs] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const terminalEndRef = useRef(null);

  const mockSystemLogs = [
    "[INFO] INITIALIZING ARENA CORE DEPLOYMENT...",
    "[OK] SECURE_SOCKET_SHIELD_V2.0_LOADED",
    "[OK] SYSTEM_ENTROPY_GENERATOR_ACTIVE",
    "[INFO] ESTABLISHING TUNNELS TO LLM ENDPOINTS...",
    "[OK] MISTRAL_REASONING_ENGINE_ONLINE",
    "[OK] GROQ_INFERENCE_PORT_ACTIVE",
    "[OK] COMPILING BATTLE_JUDGE_EVALUATOR...",
    "[OK] JUDGE_CRITERIA_MATRIX_ONLINE",
    "[INFO] WAKING HOST SERVER WORKERS...",
    "[OK] WORKER_THREAD_1_SPUN_UP",
    "[OK] WORKER_THREAD_2_SPUN_UP",
    "[OK] SOCKET_CONNECTION_ESTABLISHED",
    "[OK] TELEMETRY_INGRESS_STREAM_READY",
    "[SYSTEM] ARENA OS GATEWAY READY FOR AUTH."
  ];

  useEffect(() => {
    let active = true;
    const loadLogs = async () => {
      let index = 0;
      while (active) {
        if (index < mockSystemLogs.length) {
          setLogs((prev) => [...prev, mockSystemLogs[index]]);
          index++;
          await new Promise((r) => setTimeout(r, 700));
        } else {
          await new Promise((r) => setTimeout(r, 4000));
          if (!active) return;
          setLogs([]);
          index = 0;
        }
      }
    };
    loadLogs();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  useEffect(() => {
    // Clear stale errors on mount
    dispatch(setError(null));

    gsap.fromTo(
      formRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    if (infoRef.current) {
      gsap.fromTo(
        infoRef.current,
        { scale: 0.98, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.1 }
      );
    }
  }, [dispatch]);

  const submitForm = async (event) => {
    event.preventDefault();

    const payload = {
      email: email.trim(),
      password,
    };

    await handleLogin(payload);
  };

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="min-h-screen bg-[#09090b] flex flex-row overflow-hidden relative selection:bg-violet-500/30">
      {/* Background radial grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.15] z-0" 
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 0)",
          backgroundSize: "24px 24px"
        }}
      />
      
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none z-0" />

      {/* Left Column: Info Panel */}
      <div className="hidden lg:flex w-1/2 relative border-r border-white/[0.06] items-center justify-center p-12 overflow-hidden z-10 bg-black/20">
        <div
          ref={infoRef}
          className="w-full max-w-lg bg-zinc-900/40 backdrop-blur-xl border border-white/[0.06] p-8 rounded-2xl shadow-2xl flex flex-col justify-between min-h-[60vh] relative overflow-hidden"
        >
          {/* Subtle background card gradient */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-violet-500/10 to-transparent blur-2xl rounded-full animate-pulse" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
                  SYSTEM CORE ONLINE
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <span className="text-[9px] font-mono-geist text-zinc-550 uppercase tracking-widest">BOOT_SEQUENCE</span>
            </div>
            
            <h2 className="text-3xl font-serif-brutalist font-black text-white tracking-tight leading-tight">
              Compare models <br />
              side-by-side.
            </h2>
            
            {/* Live Terminal Log Box */}
            <div className="bg-zinc-950/70 rounded-xl p-4 border border-white/5 font-mono-geist text-[10px] h-48 overflow-y-auto space-y-1.5 scrollbar-hide text-zinc-400">
              {logs.map((log, idx) => (
                <div key={idx} className={`${log && log.startsWith("[OK]") ? "text-emerald-400" : log && log.startsWith("[SYSTEM]") ? "text-violet-400 font-bold" : "text-zinc-400"}`}>
                  {log}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>
          
          <div className="mt-8 border-t border-white/[0.06] pt-6 flex items-center justify-between relative z-10">
            <div>
              <p className="font-serif-brutalist text-lg font-bold tracking-tight text-white">
                ARENA AI
              </p>
              <p className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 mt-0.5 font-mono-geist">
                V1.0.4 - Model Battle Grid
              </p>
            </div>
            <span className="text-xs font-semibold text-violet-400 tracking-wider font-mono-geist bg-violet-500/5 px-2.5 py-1 rounded border border-violet-500/10">GATEWAY_ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Right Column: Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 z-10">
        <div
          ref={formRef}
          className="w-full max-w-md p-8 md:p-10 bg-zinc-900/30 backdrop-blur-xl border border-white/[0.06] rounded-2xl shadow-2xl"
        >
          <div className="mb-8">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full border border-violet-500/20">
              SECURE LOG IN
            </span>
            <h1 className="text-3xl md:text-4xl font-serif-brutalist font-bold text-white tracking-tight mt-4">
              Enter the Grid
            </h1>
            <p className="text-xs text-zinc-500 mt-2 font-semibold uppercase tracking-wider font-mono-geist">
              Verification details required
            </p>
          </div>

          <form onSubmit={submitForm} className="space-y-5">
            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3.5 text-xs font-semibold text-red-400 animate-pulse font-mono-geist">
                ⚠ {error}
              </div>
            )}
            
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-zinc-950/40 border border-white/[0.08] rounded-xl p-3.5 text-white font-medium outline-none transition focus:border-violet-500 focus:bg-zinc-950/60 focus:shadow-[0_0_15px_rgba(139,92,246,0.1)] placeholder-zinc-600 text-sm font-mono-geist"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-zinc-950/40 border border-white/[0.08] rounded-xl p-3.5 pr-11 text-white font-medium outline-none transition focus:border-violet-500 focus:bg-zinc-950/60 focus:shadow-[0_0_15px_rgba(139,92,246,0.1)] placeholder-zinc-600 text-sm font-mono-geist"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors cursor-pointer p-1"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold p-4 rounded-xl transition-all shadow-[0_4px_20px_rgba(139,92,246,0.25)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.35)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 text-xs uppercase tracking-widest"
            >
              {loading ? "AUTHENTICATING..." : "START SYSTEM"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-zinc-500 font-semibold uppercase tracking-wider">
            Need an entry pass?{" "}
            <Link
              to="/register"
              className="text-violet-400 hover:text-violet-300 hover:underline underline-offset-4 ml-1 transition-colors"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
