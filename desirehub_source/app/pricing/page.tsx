import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Check, Star, Crown, Zap } from "lucide-react";

export default function PricingPage() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "/month",
            icon: Star,
            features: ["Access to free content", "720p Streaming", "Ad-supported", "Basic Community Features"],
            cta: "Get Started",
            highlight: false
        },
        {
            name: "Premium",
            price: "$14.99",
            period: "/month",
            icon: Zap,
            features: ["Unlimited Premium Content", "4K Ultra HD Streaming", "Ad-free Experience", "Download for Offline", "Priority Support"],
            cta: "Start Free Trial",
            highlight: true
        },
        {
            name: "Elite",
            price: "$29.99",
            period: "/month",
            icon: Crown,
            features: ["Everything in Premium", "Exclusive Behind-the-Scenes", "Direct Messaging with Creators", "Virtual Reality (VR) Content", "VIP Badge"],
            cta: "Join Elite",
            highlight: false
        }
    ];

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 pt-24 pb-20">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white font-kanit mb-6">Choose Your Experience</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Unlock the full potential of DesireHub with our premium membership plans. Cancel anytime.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan) => {
                        const Icon = plan.icon;
                        return (
                            <div
                                key={plan.name}
                                className={`relative p-8 rounded-3xl border transition-all duration-300 ${plan.highlight
                                        ? "bg-white/10 border-neon-pink shadow-[0_0_30px_rgba(255,0,127,0.2)] scale-105 z-10"
                                        : "bg-white/5 border-white/10 hover:border-white/30"
                                    }`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-neon-pink text-white text-sm font-bold rounded-full">
                                        MOST POPULAR
                                    </div>
                                )}

                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-3 rounded-xl ${plan.highlight ? "bg-neon-pink" : "bg-white/10"}`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white font-kanit">{plan.name}</h3>
                                </div>

                                <div className="mb-8">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-gray-400">{plan.period}</span>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3 text-gray-300">
                                            <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    className={`w-full h-12 text-lg ${!plan.highlight && "bg-transparent border border-white/20 hover:bg-white/10"}`}
                                    variant={plan.highlight ? "default" : "outline"}
                                >
                                    {plan.cta}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
