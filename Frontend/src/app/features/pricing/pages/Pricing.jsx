import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { FiCheck, FiArrowLeft, FiUser, FiLogOut } from "react-icons/fi";
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

  const navigateTo = (path, replace = true) => {
    if (location.pathname !== path) {
      navigate(path, { replace });
    }
  };

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" }
      );
    }

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { y: 45, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "power4.out", delay: 0.15 }
      );
    }

    if (faqRef.current) {
      gsap.fromTo(
        faqRef.current.children,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.5 }
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
      price: "$9.99",
      period: "/month",
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

  return (
    <div className="min-h-screen bg-[#F9F9F7] text-[#1A1C1B] pb-16 font-sans flex flex-col relative">
      {/* Top Navbar */}
      <nav className="h-16 shrink-0 border-b-2 border-[#1A1C1B] bg-white flex items-center justify-between px-6 md:px-12 z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-1.5 border-2 border-black bg-white text-black shrink-0 cursor-pointer shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#000]"
          >
            {menuOpen ? <HiX size={20} /> : <HiMenu size={20} />}
          </button>
          <span
            onClick={() => navigateTo("/")}
            className="font-extrabold text-lg tracking-[0.25em] text-[#1A1C1B] uppercase cursor-pointer"
          >
            ARENA AI
          </span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-black tracking-widest text-[#536255]">
          <span
            onClick={() => navigateTo("/")}
            className="cursor-pointer hover:text-[#1A1C1B] transition-colors"
          >
            HOME
          </span>
          <span
            onClick={() => navigateTo("/arena")}
            className="cursor-pointer hover:text-[#1A1C1B] transition-colors"
          >
            ARENA
          </span>
          <span
            onClick={() => navigateTo("/chat")}
            className="cursor-pointer hover:text-[#1A1C1B] transition-colors"
          >
            CHAT
          </span>
          <span
            onClick={() => navigateTo("/pricing")}
            className="cursor-pointer text-[#1A1C1B] border-b-2 border-black pb-1 hover:text-[#1A1C1B] transition-colors"
          >
            PRICING
          </span>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border-2 border-[#1A1C1B] bg-[#F1F1EF] px-3 py-1.5 font-bold text-xs text-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B]">
                <FiUser size={13} className="stroke-[2.5]" />
                <span className="hidden sm:inline">{user.fullname || user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-red-500/10 text-[#7E7576] hover:text-red-600 transition-colors cursor-pointer"
                title="Sign out"
              >
                <FiLogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo("/login", false)}
                className="px-3.5 py-1.5 border-2 border-black bg-white font-bold text-xs text-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] transition-all cursor-pointer uppercase tracking-wider"
              >
                Sign In
              </button>
              <button
                onClick={() => navigateTo("/register", false)}
                className="px-3.5 py-1.5 border-2 border-black bg-[#F5D3B8] font-bold text-xs text-[#1A1C1B] shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] transition-all cursor-pointer uppercase tracking-wider"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b-2 border-[#1A1C1B] z-40 p-4 md:hidden shadow-[4px_4px_0px_0px_#1A1C1B] flex flex-col gap-2.5">
          <span className="text-[9px] font-black uppercase tracking-widest text-[#7E7576] px-1 mb-1">
            Navigation Menu
          </span>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigateTo("/");
            }}
            className={`w-full text-left border-2 border-[#1A1C1B] p-3 text-xs font-black uppercase tracking-wider transition-all shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] cursor-pointer ${
              location.pathname === "/" ? "bg-[#1A1C1B] text-white" : "bg-white text-[#1A1C1B] hover:bg-neutral-50"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigateTo("/arena");
            }}
            className={`w-full text-left border-2 border-[#1A1C1B] p-3 text-xs font-black uppercase tracking-wider transition-all shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] cursor-pointer ${
              location.pathname === "/arena" || location.pathname === "/battle" ? "bg-[#1A1C1B] text-white" : "bg-white text-[#1A1C1B] hover:bg-neutral-50"
            }`}
          >
            Arena
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigateTo("/chat");
            }}
            className={`w-full text-left border-2 border-[#1A1C1B] p-3 text-xs font-black uppercase tracking-wider transition-all shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] cursor-pointer ${
              location.pathname === "/chat" ? "bg-[#1A1C1B] text-white" : "bg-white text-[#1A1C1B] hover:bg-neutral-50"
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigateTo("/pricing");
            }}
            className={`w-full text-left border-2 border-[#1A1C1B] p-3 text-xs font-black uppercase tracking-wider transition-all shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1A1C1B] cursor-pointer ${
              location.pathname === "/pricing" ? "bg-[#1A1C1B] text-white" : "bg-white text-[#1A1C1B] hover:bg-neutral-50"
            }`}
          >
            Pricing
          </button>
        </div>
      )}

      {/* Header */}
      <div className="border-b-2 border-[#1A1C1B] bg-white">
        <div ref={headerRef} className="max-w-7xl mx-auto px-6 py-10">
          <button
            onClick={() => navigateTo("/chat", false)}
            className="flex items-center gap-2 border-2 border-[#1A1C1B] bg-white px-4 py-2 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#1A1C1B] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1A1C1B] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer mb-8"
          >
            <FiArrowLeft size={16} className="stroke-[2.5]" />
            Back to Chat
          </button>
          
          <span className="text-[10px] font-black uppercase tracking-widest text-[#008080] bg-[#008080]/10 px-2.5 py-1 border border-[#008080]/20">
            PRICING OPTIONS
          </span>
          <h1 className="text-4xl md:text-5xl font-serif-brutalist font-bold text-[#1A1C1B] tracking-tight mt-4 mb-2">
            Simple, Transparent Pricing
          </h1>
          <p className="text-sm md:text-base text-[#536255] font-semibold">
            Choose the perfect battle tier for your inquiries.
          </p>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card-brutalist bg-white flex flex-col justify-between ${
                plan.highlight
                  ? "shadow-brutalist-lg translate-x-[-2px] translate-y-[-2px]"
                  : ""
              }`}
            >
              {/* Plan Header */}
              <div
                className={`px-8 py-8 border-b-2 border-[#1A1C1B] ${
                  plan.highlight ? "bg-[#F5D3B8]" : "bg-[#F1F1EF]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-[#1A1C1B]">
                    {plan.name}
                  </h3>
                  {plan.highlight && (
                    <span className="border-2 border-[#1A1C1B] bg-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#1A1C1B]">
                      POPULAR
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-4xl font-extrabold text-[#1A1C1B]">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm font-black text-[#536255]">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-[#536255]">
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
                        className="shrink-0 mt-0.5 text-[#1A1C1B] stroke-[3]"
                      />
                      <span className="text-xs font-bold text-[#536255]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3.5 px-4 border-2 border-[#1A1C1B] font-black uppercase tracking-wider text-xs transition-all cursor-pointer ${
                    plan.highlight
                      ? "bg-[#1A1C1B] text-white shadow-[4px_4px_0px_0px_#C5A880] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#C5A880] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#C5A880]"
                      : "bg-[#F1F1EF] text-[#1A1C1B] hover:bg-white active:translate-x-[1px] active:translate-y-[1px]"
                  }`}
                >
                  {plan.name === "Free" ? "Current Plan" : "Get Started"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="border-t-2 border-[#1A1C1B] bg-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-serif-brutalist font-bold text-[#1A1C1B] mb-8">
            Frequently Asked Questions
          </h2>

          <div ref={faqRef} className="space-y-6">
            {[
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
            ].map((faq, i) => (
              <div key={i} className="p-5 border-2 border-[#1A1C1B] bg-[#F9F9F7] shadow-[2px_2px_0px_0px_#1A1C1B]">
                <h3 className="font-extrabold text-sm text-[#1A1C1B] mb-2">
                  {faq.q}
                </h3>
                <p className="text-xs font-semibold text-[#536255] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
