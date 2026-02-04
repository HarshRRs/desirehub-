"use client";

import Navbar from "@/components/layout/Navbar";
import { Check, Crown, Zap, Star } from "lucide-react";

const PLANS = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        features: [
            "Limited video access",
            "SD quality streaming",
            "Basic search",
            "Ads supported",
        ],
        icon: Star,
        gradient: "from-gray-600 to-gray-700",
        current: true,
    },
    {
        name: "Premium",
        price: "$9.99",
        period: "per month",
        features: [
            "Unlimited video access",
            "HD streaming",
            "Advanced search & filters",
            "Ad-free experience",
            "Download videos",
            "Early access to content",
        ],
        icon: Zap,
        gradient: "from-violet-deep to-neon-pink",
        popular: true,
    },
    {
        name: "VIP",
        price: "$19.99",
        period: "per month",
        features: [
            "Everything in Premium",
            "4K Ultra HD streaming",
            "Exclusive creator content",
            "Direct creator messaging",
            "Priority support",
            "VIP badge",
            "Behind-the-scenes content",
        ],
        icon: Crown,
        gradient: "from-gold to-amber-600",
    },
];

export default function UpgradePage() {
    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4 font-kanit">
                        Upgrade Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-deep via-neon-pink to-crimson">Experience</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Unlock premium features and support your favorite creators with exclusive content
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {PLANS.map((plan) => {
                        const Icon = plan.icon;
                        return (
                            <div
                                key={plan.name}
                                className={`relative backdrop-blur-xl bg-white/[0.03] border rounded-2xl p-8 transition-all ${plan.popular
                                        ? "border-neon-pink scale-105 shadow-[0_0_50px_rgba(255,27,109,0.3)]"
                                        : "border-white/10 hover:border-white/20"
                                    }`}
                            >
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-violet-deep to-neon-pink text-white text-sm font-semibold px-4 py-1 rounded-full">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Plan Name & Price */}
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-gray-400 ml-2">/ {plan.period}</span>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-neon-pink flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-300 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <button
                                    disabled={plan.current}
                                    className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.current
                                            ? "bg-white/5 text-gray-500 cursor-not-allowed"
                                            : plan.popular
                                                ? "bg-gradient-to-r from-violet-deep to-neon-pink text-white hover:shadow-[0_0_30px_rgba(255,27,109,0.4)]"
                                                : "bg-white/10 text-white hover:bg-white/20"
                                        }`}
                                >
                                    {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* FAQ */}
                <div className="mt-16 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                            <h3 className="text-white font-semibold mb-2">Can I cancel anytime?</h3>
                            <p className="text-gray-400 text-sm">Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.</p>
                        </div>
                        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                            <h3 className="text-white font-semibold mb-2">What payment methods do you accept?</h3>
                            <p className="text-gray-400 text-sm">We accept all major credit cards, PayPal, and cryptocurrency.</p>
                        </div>
                        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                            <h3 className="text-white font-semibold mb-2">Is my payment information secure?</h3>
                            <p className="text-gray-400 text-sm">Absolutely. We use industry-standard encryption and never store your payment details.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
