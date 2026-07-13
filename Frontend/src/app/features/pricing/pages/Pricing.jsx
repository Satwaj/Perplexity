import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { FiCheck, FiArrowLeft, FiUser, FiLogOut, FiChevronDown, FiGrid, FiMessageSquare, FiArrowRight, FiZap, FiShield, FiCpu } from "react-icons/fi";
import { GiCrossedSwords } from "react-icons/gi";
import { useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../../auth/hooks/useAuth";
import { HiMenu, HiX } from "react-icons/hi";
import gsap from "gsap";

const Pricing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useSelector((state) => state.auth || {});
  const { handleLogout } = useAuth();
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const faqRef = useRef(null);

  // Billing Cycle Toggle State
  const [isYearly, setIsYearly] = useState(false);
  
  // Accordion FAQ states
  const [activeFaq, setActiveFaq] = useState(null);

  // Interactive Purchase Modal State
  const [activeSuccessModal, setActiveSuccessModal] = useState(null);

  const navigateTo = (path, replace = true) => {
    if (location.pathname !== path) {
      navigate(path, { replace });
    }
  };

  // Reusable 3D Tilt Hover Animation
  const handleCardMouseMove = (e) => {
    const cardEl = e.currentTarget;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 16;
    const angleY = (x - xc) / 16;

    gsap.to(cardEl, {
      rotateX: angleX,
      rotateY: angleY,
      scale: 1.02,
      borderColor: cardEl.dataset.highlight === "true" ? "rgba(139, 92, 246, 0.45)" : "rgba(255, 255, 255, 0.18)",
      boxShadow: cardEl.dataset.highlight === "true" 
        ? "0 30px 60px rgba(139, 92, 246, 0.18), 0 0 35px rgba(139, 92, 246, 0.08)" 
        : "0 25px 50px rgba(0, 0, 0, 0.6)",
      ease: "power2.out",
      duration: 0.3
    });
  };

  const handleCardMouseLeave = (e) => {
    const cardEl = e.currentTarget;
    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      borderColor: cardEl.dataset.highlight === "true" ? "rgba(139, 92, 246, 0.3)" : "rgba(255, 255, 255, 0.06)",
      boxShadow: cardEl.dataset.highlight === "true"
        ? "0 15px 40px rgba(139, 92, 246, 0.1)"
        : "0 8px 32px rgba(0, 0, 0, 0.4)",
      ease: "power2.out",
      duration: 0.5
    });
  };

  // CTA Click handler
  const handlePlanSelection = (planName) => {
    if (!user) {
      navigateTo("/register", false);
      return;
    }

    if (planName === "Free") {
      navigateTo("/arena");
      return;
    }

    // Trigger success activation details modal
    setActiveSuccessModal(planName);
  };

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" }
      );
    }

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { y: 35, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "power4.out", delay: 0.15 }
      );
    }
  }, []);

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "Basic AI conversations",
        "5 chats per day",
        "Standard models",
        "Community support",
      ],
      highlight: false,
      icon: FiCpu,
      color: "text-zinc-400 bg-zinc-400/5 border-zinc-400/10",
    },
    {
      name: "Pro",
      price: isYearly ? "$7.99" : "$9.99",
      period: isYearly ? "/mo, billed annually" : "/month",
      description: "For power users",
      features: [
        "Unlimited AI conversations",
        "Advanced AI models",
        "Priority support",
        "Early access to new features",
        "Data export & API access",
        "Custom instructions",
      ],
      highlight: true,
      icon: FiZap,
      color: "text-violet-400 bg-violet-400/5 border-violet-500/20",
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams & organizations",
      features: [
        "Everything in Pro",
        "Dedicated support",
        "Team management",
        "Advanced analytics",
        "Custom integrations",
        "SLA guarantee",
      ],
      highlight: false,
      icon: FiShield,
      color: "text-emerald-400 bg-emerald-400/5 border-emerald-500/20",
    },
  ];

  const faqs = [
    {
      q: "Can I upgrade or downgrade anytime?",
      a: "Yes! You can change your plan at any time. Changes take effect on your next billing cycle.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.",
    },
    {
      q: "Is there a free trial for Pro?",
      a: "Yes! Get 7 days free to try all Pro features. No credit card required to start.",
    },
    {
      q: "Do you offer student discounts?",
      a: "Absolutely! Students get 50% off Pro plans with a valid .edu email address.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white pb-24 font-sans flex flex-col relative selection:bg-violet-500/30 overflow-x-hidden page-transition">
      {/* Background radial grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08] z-0" 
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 0)",
          backgroundSize: "24px 24px"
        }}
      />
      
      {/* Ambient glows */}
      <div className="absolute top-24 right-0 w-[45vw] h-[45vw] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-10vw] w-[50vw] h-[50vw] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none z-0" />

      {/* Top Navbar */}
      <nav className="h-16 shrink-0 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-md flex items-center justify-between px-6 md:px-12 z-30 sticky top-0 select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg border border-white/10 bg-zinc-900/60 text-white shrink-0 cursor-pointer"
          >
            {menuOpen ? <HiX size={18} /> : <HiMenu size={18} />}
          </button>
          <span
            onClick={() => navigateTo("/")}
            className="font-extrabold text-lg tracking-[0.2em] text-white cursor-pointer hover:opacity-90 transition-opacity font-serif-brutalist uppercase"
          >
            ARENA AI
          </span>
        </div>

        {/* Center Navigation: Premium Floating Glass Capsule */}
        <div className="hidden md:flex items-center bg-zinc-900/65 border border-white/10 p-1 rounded-full backdrop-blur-xl relative">
          <button
            onClick={() => navigateTo("/")}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              location.pathname === "/"
                ? "bg-violet-600 text-white shadow-md shadow-violet-500/15"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigateTo("/arena")}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              location.pathname === "/arena" || location.pathname === "/battle"
                ? "bg-violet-600 text-white shadow-md shadow-violet-500/15"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Arena
          </button>
          <button
            onClick={() => navigateTo("/chat")}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              location.pathname === "/chat"
                ? "bg-violet-600 text-white shadow-md shadow-violet-500/15"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => navigateTo("/pricing")}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              location.pathname === "/pricing"
                ? "bg-violet-600 text-white shadow-md shadow-violet-500/15"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Pricing
          </button>
        </div>

        {/* Profile Dropdown Section */}
        <div className="flex items-center gap-4">
          <div className="relative">
            {user ? (
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 border border-white/10 bg-zinc-900/50 hover:bg-zinc-800/80 px-3.5 py-1.5 rounded-xl font-semibold text-xs text-zinc-200 transition-all cursor-pointer select-none"
              >
                <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-[10px] text-white font-bold uppercase shrink-0">
                  {user.fullname ? user.fullname[0] : user.username[0]}
                </div>
                <span className="hidden sm:inline truncate max-w-[100px] font-semibold">{user.fullname || user.username}</span>
              </button>
            ) : (
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="p-2 rounded-xl border border-white/10 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer flex items-center justify-center shrink-0"
                title="Profile Menu"
              >
                <FiUser size={16} />
              </button>
            )}

            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setProfileOpen(false)} />
                
                <div className="absolute right-0 mt-2 w-56 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-2.5 flex flex-col gap-1.5 z-50 animate-fade-in">
                  {user ? (
                    <>
                      <div className="px-3 py-2 border-b border-white/5 mb-1">
                        <p className="text-xs font-bold text-white truncate">{user.fullname || user.username}</p>
                        <p className="text-[10px] text-zinc-555 font-mono-geist truncate mt-0.5">{user.email}</p>
                      </div>
                      
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          navigateTo("/chat");
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <FiUser size={14} className="text-violet-400 shrink-0" />
                        Profile Details
                      </button>
                      
                      <button
                        onClick={() => { setProfileOpen(false); navigateTo("/arena"); }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <GiCrossedSwords size={14} className="text-violet-400 shrink-0" />
                        Battle Arena
                      </button>
                      
                      <button
                        onClick={() => { setProfileOpen(false); navigateTo("/chat"); }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <FiMessageSquare size={14} className="text-violet-400 shrink-0" />
                        AI Chat Channel
                      </button>

                      <button
                        onClick={() => { setProfileOpen(false); navigateTo("/pricing"); }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center gap-2 border-t border-white/5 mt-1 pt-2"
                      >
                        <FiGrid size={14} className="text-emerald-400 shrink-0" />
                        Upgrade Plan
                      </button>
                      
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          handleLogout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all cursor-pointer flex items-center gap-2 mt-0.5"
                      >
                        <FiLogOut size={14} />
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-3 py-1.5 border-b border-white/5 mb-1 text-[9px] font-bold text-zinc-555 uppercase tracking-widest font-mono-geist">
                        Guest Account
                      </div>
                      <button
                        onClick={() => { setProfileOpen(false); navigateTo("/login", false); }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center gap-2"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => { setProfileOpen(false); navigateTo("/register", false); }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 transition-all cursor-pointer flex items-center justify-center mt-1"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-zinc-950/95 border-b border-white/[0.08] z-40 p-4 md:hidden shadow-2xl flex flex-col gap-2.5 backdrop-blur-lg animate-fade-in">
          <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-550 px-1 mb-1 font-mono-geist">
            Navigation Menu
          </span>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigateTo("/");
            }}
            className={`w-full text-left border border-white/5 rounded-xl p-3 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              location.pathname === "/" ? "bg-violet-600 text-white" : "bg-zinc-900/60 text-zinc-300"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigateTo("/arena");
            }}
            className={`w-full text-left border border-white/5 rounded-xl p-3 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              location.pathname === "/arena" || location.pathname === "/battle" ? "bg-violet-600 text-white" : "bg-zinc-900/60 text-zinc-300"
            }`}
          >
            Arena
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigateTo("/chat");
            }}
            className={`w-full text-left border border-white/5 rounded-xl p-3 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              location.pathname === "/chat" ? "bg-violet-600 text-white" : "bg-zinc-900/60 text-zinc-300"
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigateTo("/pricing");
            }}
            className={`w-full text-left border border-white/5 rounded-xl p-3 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              location.pathname === "/pricing" ? "bg-violet-600 text-white" : "bg-zinc-900/60 text-zinc-300"
            }`}
          >
            Pricing
          </button>
        </div>
      )}

      {/* Header Hero Section */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center space-y-5 relative z-10 select-none">
        <button
          onClick={() => navigateTo("/chat", false)}
          className="group flex items-center gap-2 border border-white/10 bg-zinc-900/40 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-zinc-800 transition-all cursor-pointer mx-auto w-fit mb-4"
        >
          <FiArrowLeft size={16} className="text-violet-400 group-hover:translate-x-[-2px] transition-transform" />
          Back to Chat
        </button>
        
        <div className="flex justify-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400 bg-violet-500/10 px-3.5 py-1.5 rounded-full border border-violet-500/20">
            TRANSPARENT PLANS
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-serif-brutalist font-black text-white tracking-tight leading-none text-glow-gradient">
          Simple Pricing, No Secrets.
        </h1>
        
        <p className="text-sm md:text-base text-zinc-400 font-semibold max-w-lg mx-auto leading-relaxed">
          Unlock high-fidelity verdict judges, priority API pipelines, and custom prompt rules.
        </p>

        {/* Premium Billing Cycle Capsule Toggle */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <span className={`text-xs font-semibold uppercase tracking-wider transition-all ${!isYearly ? "text-white" : "text-zinc-550"}`}>
            Monthly
          </span>
          
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-14 h-7 bg-zinc-900 border border-white/10 rounded-full p-1 transition-all cursor-pointer focus:outline-none"
          >
            <div 
              className={`h-full bg-violet-600 rounded-full transition-transform duration-300 shadow-md ${
                isYearly ? "translate-x-full" : "translate-x-0"
              }`} 
              style={{ width: "20px" }} 
            />
          </button>
          
          <span className={`text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${isYearly ? "text-white" : "text-zinc-550"}`}>
            Yearly 
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider font-mono-geist">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10 w-full relative z-10">
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                data-highlight={plan.highlight}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className={`bg-zinc-900/40 backdrop-blur-xl border flex flex-col justify-between rounded-2xl shadow-xl transition-all cursor-default card-brutalist relative ${
                  plan.highlight
                    ? "border-violet-500/30 shadow-[0_15px_40px_rgba(139,92,246,0.1)] ring-1 ring-violet-500/10"
                    : "border-white/[0.06]"
                }`}
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                {/* Plan Header */}
                <div
                  className={`px-8 py-8 border-b border-white/[0.06] rounded-t-2xl relative overflow-hidden ${
                    plan.highlight ? "bg-violet-950/20" : "bg-black/20"
                  }`}
                  style={{ transform: "translateZ(30px)" }}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 right-0 w-28 h-28 bg-violet-500/5 blur-2xl rounded-full" />
                  )}
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${plan.color}`}>
                        <Icon size={18} />
                      </div>
                      <h3 className="text-xl font-bold tracking-tight text-white uppercase font-space">
                        {plan.name}
                      </h3>
                    </div>
                    {plan.highlight && (
                      <span className="bg-violet-500/10 text-violet-400 border border-violet-500/20 px-2.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider font-mono-geist">
                        POPULAR
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-baseline gap-1.5 my-5 relative z-10">
                    <span className="text-4xl font-extrabold text-white transition-all font-mono-geist">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-xs font-semibold text-zinc-500 font-mono-geist">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-zinc-400 relative z-10">
                    {plan.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="px-8 py-8 flex-1 flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 group">
                        <FiCheck
                          size={16}
                          className="shrink-0 mt-0.5 text-violet-400 stroke-[3] group-hover:scale-110 transition-transform duration-300"
                        />
                        <span className="text-xs font-semibold text-zinc-400 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePlanSelection(plan.name)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] ${
                      plan.highlight
                        ? "bg-violet-600 hover:bg-violet-500 text-white shadow-[0_4px_15px_rgba(139,92,246,0.3)]"
                        : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                    }`}
                  >
                    <span>{plan.name === "Free" ? "Use Free Arena" : "Upgrade Plan"}</span>
                    <FiArrowRight size={14} className="stroke-[2.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="max-w-5xl mx-auto px-6 py-16 w-full relative z-10 select-none">
        <div className="text-center space-y-3 mb-10">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
            COMPARE SYSTEM SHEETS
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif-brutalist font-black text-white tracking-tight leading-none uppercase">
            Complete Feature Breakdown
          </h3>
        </div>

        <div className="border border-white/10 bg-zinc-900/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 bg-zinc-950/60 text-zinc-400 select-none">
                  <th className="p-5 uppercase tracking-wider font-bold">Feature Matrix</th>
                  <th className="p-5 uppercase tracking-wider font-bold text-center">Free</th>
                  <th className="p-5 uppercase tracking-wider font-bold text-center text-violet-400">Pro</th>
                  <th className="p-5 uppercase tracking-wider font-bold text-center text-emerald-400">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                <tr className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-5 font-semibold text-white">Daily Conversations Limit</td>
                  <td className="p-5 text-center text-zinc-500 font-mono-geist">5 queries</td>
                  <td className="p-5 text-center text-violet-400 font-bold font-mono-geist">Unlimited</td>
                  <td className="p-5 text-center text-emerald-400 font-bold font-mono-geist">Unlimited</td>
                </tr>
                <tr className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-5 font-semibold text-white">AI Engine Access</td>
                  <td className="p-5 text-center text-zinc-500">Standard models</td>
                  <td className="p-5 text-center">Advanced models</td>
                  <td className="p-5 text-center">Custom LLM instances</td>
                </tr>
                <tr className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-5 font-semibold text-white">Verdict Reasoner Engine</td>
                  <td className="p-5 text-center text-zinc-600">No</td>
                  <td className="p-5 text-center text-violet-400">Yes</td>
                  <td className="p-5 text-center text-emerald-400">Yes</td>
                </tr>
                <tr className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-5 font-semibold text-white">Audio Synthesis Output</td>
                  <td className="p-5 text-center text-zinc-600">No</td>
                  <td className="p-5 text-center">Standard speed</td>
                  <td className="p-5 text-center">Priority high-fidelity</td>
                </tr>
                <tr className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-5 font-semibold text-white">Support SLA Response</td>
                  <td className="p-5 text-center text-zinc-500">Community</td>
                  <td className="p-5 text-center">Priority 24h</td>
                  <td className="p-5 text-center text-emerald-400 font-bold">Dedicated 1h</td>
                </tr>
                <tr className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-5 font-semibold text-white">Custom APIs & SSO Integration</td>
                  <td className="p-5 text-center text-zinc-600">No</td>
                  <td className="p-5 text-center text-zinc-500 font-mono-geist">Basic API</td>
                  <td className="p-5 text-center text-emerald-400 font-bold font-mono-geist">Custom SSO / APIs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="border-t border-white/[0.06] bg-black/20 py-16 w-full relative z-10 select-none">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-3xl font-serif-brutalist font-black text-white uppercase">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-zinc-500 font-medium">Clear answers to common subscription inquiries.</p>
          </div>

          <div ref={faqRef} className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div 
                  key={i} 
                  className="border border-white/[0.06] bg-zinc-900/25 rounded-2xl shadow-md overflow-hidden transition-all duration-300"
                >
                  {/* Collapsible Header Toggle */}
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm text-white hover:bg-white/[0.02] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <FiChevronDown 
                      size={18} 
                      className={`text-zinc-550 transition-transform duration-300 ${isOpen ? "rotate-180 text-violet-400" : "rotate-0"}`} 
                    />
                  </button>
                  
                  {/* Accordion Body content */}
                  <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-24 opacity-100 border-t border-white/[0.04]" : "max-h-0 opacity-0 pointer-events-none"}`}>
                    <p className="px-6 py-4 text-xs font-semibold text-zinc-400 leading-relaxed bg-zinc-950/20">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Success Plan Activation Overlay Modal */}
      {activeSuccessModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-zinc-900/90 border border-violet-500/30 rounded-2xl shadow-2xl p-6 md:p-8 text-center space-y-6 relative">
            <div className="w-16 h-16 bg-violet-600/10 border border-violet-500/30 text-violet-400 rounded-full flex items-center justify-center text-3xl mx-auto animate-bounce">
              🏆
            </div>
            
            <div className="space-y-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-violet-400 font-mono-geist">
                Subscription Initialized
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-white uppercase font-space">
                {activeSuccessModal} Plan Active
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold max-w-xs mx-auto">
                Thank you for upgrading! Your subscription to the {activeSuccessModal} Tier has been initialized on your profile.
              </p>
            </div>

            <div className="h-px bg-white/5" />

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setActiveSuccessModal(null);
                  navigateTo("/arena");
                }}
                className="flex-1 cursor-pointer bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                Go to Arena
              </button>
              <button
                onClick={() => {
                  setActiveSuccessModal(null);
                  navigateTo("/chat");
                }}
                className="flex-1 cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/5 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                Go to Chat
              </button>
            </div>

            <button
              onClick={() => setActiveSuccessModal(null)}
              className="absolute top-4 right-4 text-zinc-550 hover:text-white cursor-pointer"
            >
              <HiX size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;
