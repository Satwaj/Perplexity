import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import { FiCheck, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router";

const Pricing = () => {
  const theme = useTheme();
  const navigate = useNavigate();

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
    <div
      className={`min-h-screen ${theme.bg.primary} transition-colors duration-200`}
    >
      {/* Header */}
      <div className={`${theme.bg.secondary} border-b ${theme.border.primary}`}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <button
            onClick={() => navigate("/")}
            className={`flex items-center gap-2 ${theme.text.secondary} hover:${theme.text.primary} transition-colors mb-6`}
          >
            <FiArrowLeft size={20} />
            Back to Chat
          </button>
          <h1 className={`text-4xl font-bold ${theme.text.primary} mb-2`}>
            Simple, Transparent Pricing
          </h1>
          <p className={`text-lg ${theme.text.secondary}`}>
            Choose the perfect plan for your needs
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl border-2 overflow-hidden transition-all transform hover:scale-105 ${
                plan.highlight
                  ? `${theme.isDark ? "border-gray-600 bg-gray-900" : "border-gray-400 bg-stone-200"} shadow-2xl`
                  : `${theme.border.primary} ${theme.bg.secondary}`
              }`}
            >
              {/* Plan Header */}
              <div
                className={`px-8 py-8 ${
                  plan.highlight
                    ? theme.isDark
                      ? "bg-gray-800"
                      : "bg-stone-300"
                    : theme.isDark
                      ? "bg-gray-950"
                      : "bg-stone-100"
                }`}
              >
                <h3 className={`text-2xl font-bold ${theme.text.primary} mb-2`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className={`text-4xl font-bold ${theme.text.primary}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm ${theme.text.secondary}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm ${theme.text.secondary}`}>
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <div className="px-8 py-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FiCheck
                        size={20}
                        className={`shrink-0 mt-1 ${
                          theme.isDark ? "text-gray-400" : "text-gray-700"
                        }`}
                      />
                      <span className={theme.text.secondary}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all hover:scale-95 ${
                    plan.highlight
                      ? `${theme.button.primary} text-white`
                      : `${theme.bg.tertiary} ${theme.text.primary} hover:${theme.bg.secondary}`
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
      <div
        className={`${theme.bg.secondary} border-t ${theme.border.primary} py-16`}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2 className={`text-3xl font-bold ${theme.text.primary} mb-8`}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
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
              <div key={i}>
                <h3 className={`font-semibold ${theme.text.primary} mb-2`}>
                  {faq.q}
                </h3>
                <p className={theme.text.secondary}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
