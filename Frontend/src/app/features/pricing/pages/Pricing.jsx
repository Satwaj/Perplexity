import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { FiCheck, FiArrowLeft, FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
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
  const { user } = useSelector((state) => state.auth || {});
  const { handleLogout } = useAuth();
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const faqRef = useRef(null);

  // Billing Cycle Toggle State
  const [isYearly, setIsYearly] = useState(false);
  
  // Accordion FAQ states
  const [activeFaq, setActiveFaq] = useState(null);

  const navigateTo = (path, replace = true) => {
    if (location.pathname !== path) {
      navigate(path, { replace });
    }
  };

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" }
      );
    }

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { y: 30, opacity: 0, scale: 0.98 },
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
    <div className="min-h-screen bg-[#09090b] text-white pb-16 font-sans flex flex-col relative selection:bg-violet-500/30">
      {/* Background radial grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.12] z-0" 
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 0)",
          backgroundSize: "24px 24px"
        }}
      />
      
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[45%] h-[40%] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[40%] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none z-0" />

      {/* Top Navbar */}
      <nav className="h-16 shrink-0 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-md flex items-center justify-between px-6 md:px-12 z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg border border-white/10 bg-zinc-900/60 text-white shrink-0 cursor-pointer"
          >
            {menuOpen ? <HiX size={18} /> : <HiMenu size={18} />}
          </button>
          <span
            onClick={() => navigateTo("/")}
            className="font-extrabold text-lg tracking-[0.2em] text-white cursor-pointer hover:opacity-90 transition-opacity"
          >
            ARENA AI
          </span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest text-zinc-400">
          <span
            onClick={() => navigateTo("/")}
            className="cursor-pointer hover:text-white transition-colors"
          >
            HOME
          </span>
          <span
            onClick={() => navigateTo("/arena")}
            className="cursor-pointer hover:text-white transition-colors"
          >
            ARENA
          </span>
          <span
            onClick={() => navigateTo("/chat")}
            className="cursor-pointer hover:text-white transition-colors"
          >
            CHAT
          </span>
          <span
            onClick={() => navigateTo("/pricing")}
            className="cursor-pointer text-white border-b-2 border-violet-500 pb-1"
          >
            PRICING
          </span>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border border-white/10 bg-zinc-900/50 px-3.5 py-1.5 rounded-xl font-semibold text-xs text-zinc-200">
                <FiUser size={13} className="text-violet-400" />
                <span className="hidden sm:inline">{user.fullname || user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-all cursor-pointer"
                title="Sign out"
              >
                <FiLogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo("/login", false)}
                className="px-4 py-2 border border-white/10 bg-zinc-900/40 rounded-xl font-semibold text-xs text-zinc-200 hover:bg-zinc-800 transition-all cursor-pointer uppercase tracking-wider"
              >
                Sign In
              </button>
              <button
                onClick={() => navigateTo("/register", false)}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold text-xs text-white transition-all cursor-pointer shadow-[0_4px_12px_rgba(139,92,246,0.2)] uppercase tracking-wider"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-zinc-950/95 border-b border-white/[0.08] z-40 p-4 md:hidden shadow-2xl flex flex-col gap-2.5 backdrop-blur-lg">
          <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 px-1 mb-1">
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

      {/* Header */}
      <div className="border-b border-white/[0.06] bg-black/20">
        <div ref={headerRef} className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <button
            onClick={() => navigateTo("/chat", false)}
            className="flex items-center gap-2 border border-white/10 bg-zinc-900/40 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-zinc-800 transition-all cursor-pointer mb-8"
          >
            <FiArrowLeft size={16} className="text-violet-400" />
            Back to Chat
          </button>
          
          <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
            PRICING OPTIONS
          </span>
          <h1 className="text-4xl md:text-5xl font-serif-brutalist font-black text-white tracking-tight mt-5 mb-3 text-glow-gradient">
            Simple, Transparent Pricing
          </h1>
          <p className="text-sm md:text-base text-zinc-400 font-semibold mb-6">
            Choose the perfect battle tier for your inquiries.
          </p>

          {/* Billing Cycle Switch */}
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold uppercase tracking-wider transition-colors ${!isYearly ? "text-white" : "text-zinc-550"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-12 h-6 bg-zinc-800 rounded-full border border-white/10 p-0.5 transition-colors cursor-pointer"
            >
              <div className={`w-48-percent h-full bg-violet-600 rounded-full transition-transform duration-300 ${isYearly ? "translate-x-full" : "translate-x-0"}`} style={{ width: "20px" }} />
            </button>
            <span className={`text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${isYearly ? "text-white" : "text-zinc-550"}`}>
              Yearly <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-1.5 py-0.5 rounded text-[8px] font-bold">SAVE 20%</span>
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 w-full relative z-10">
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-zinc-900/40 backdrop-blur-xl border flex flex-col justify-between rounded-2xl shadow-xl transition-all hover:translate-y-[-4px] hover:shadow-2xl ${
                plan.highlight
                  ? "border-violet-500/30 shadow-[0_15px_40px_rgba(139,92,246,0.1)] ring-1 ring-violet-500/10"
                  : "border-white/[0.06]"
              }`}
            >
              {/* Plan Header */}
              <div
                className={`px-8 py-8 border-b border-white/[0.06] rounded-t-2xl relative overflow-hidden ${
                  plan.highlight ? "bg-violet-950/20" : "bg-black/20"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-0 w-28 h-28 bg-violet-500/5 blur-2xl rounded-full" />
                )}
                
                <div className="flex items-center justify-between relative z-10">
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    {plan.name}
                  </h3>
                  {plan.highlight && (
                    <span className="bg-violet-500/10 text-violet-400 border border-violet-500/20 px-2.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider">
                      POPULAR
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1.5 my-5 relative z-10">
                  <span className="text-4xl font-extrabold text-white transition-all">
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
              <div className="px-8 py-8 flex-1 flex flex-col justify-between">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FiCheck
                        size={16}
                        className="shrink-0 mt-0.5 text-violet-400 stroke-[3]"
                      />
                      <span className="text-xs font-semibold text-zinc-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3.5 px-4 rounded-xl font-semibold uppercase tracking-wider text-xs transition-all cursor-pointer ${
                    plan.highlight
                      ? "bg-violet-600 hover:bg-violet-500 text-white shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_20px_rgba(139,92,246,0.4)]"
                      : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                  }`}
                >
                  {plan.name === "Free" ? "Current Plan" : "Get Started"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="border-t border-white/[0.06] bg-black/20 py-16 w-full">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-serif-brutalist font-bold text-white mb-8">
            Frequently Asked Questions
          </h2>

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
    </div>
  );
};

export default Pricing;
