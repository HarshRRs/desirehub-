import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Check, Crown, Zap, Star, Sparkles, Heart } from "lucide-react";
import { pricingMetadata } from "@/lib/seo";

export const metadata = pricingMetadata;

const plans = [
    {
        id: "free",
        name: "Free",
        price: 0,
        period: "forever",
        description: "Perfect for exploring the platform",
        icon: Heart,
        color: "from-gray-600 to-gray-700",
        popular: false,
        features: [
            "Access to free content",
            "Basic video quality",
            "Limited creator interactions",
            "Ad-supported experience",
            "Community features",
            "1 favorite list",
        ],
        cta: "Get Started",
        limitations: [
            "No premium content",
            "Standard definition only",
            "Ads displayed",
        ],
    },
    {
        id: "premium",
        name: "Premium",
        price: 19.99,
        period: "month",
        description: "Unlock the full experience",
        icon: Star,
        color: "from-neon-pink to-crimson",
        popular: true,
        features: [
            "Access to all premium content",
            "4K ultra HD quality",
            "Ad-free experience",
            "Direct messaging with creators",
            "Unlimited favorites",
            "Early access to new content",
            "Download for offline viewing",
            "Priority customer support",
            "Exclusive badges",
            "Monthly creator spotlight",
        ],
        cta: "Upgrade to Premium",
        savings: "Save $40/year with annual plan",
    },
    {
        id: "vip",
        name: "VIP Elite",
        price: 49.99,
        period: "month",
        description: "The ultimate VIP experience",
        icon: Crown,
        color: "from-violet-deep via-gold to-neon-pink",
        popular: false,
        features: [
            "Everything in Premium",
            "Exclusive VIP-only content",
            "8K ultra HD quality (where available)",
            "Custom content requests",
            "Private video calls with creators",
            "VIP-only live shows",
            "Personal concierge service",
            "Verified VIP badge",
            "Behind-the-scenes access",
            "Exclusive merchandise discounts",
            "Priority content delivery",
            "Annual VIP event invitation",
        ],
        cta: "Go VIP Elite",
        savings: "Save $120/year with annual plan",
    },
];

const additionalFeatures = [
    {
        title: "Creator Support",
        description: "Your subscription directly supports creators you love",
        icon: Sparkles,
    },
    {
        title: "Secure Payments",
        description: "256-bit encryption and secure payment processing",
        icon: Zap,
    },
    {
        title: "Cancel Anytime",
        description: "No long-term commitments, cancel with one click",
        icon: Check,
    },
];

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-12 px-4 container mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full border-neon-pink/30 bg-neon-pink/10 backdrop-blur-sm">
                    <Crown className="w-4 h-4 text-neon-pink" />
                    <span className="text-sm font-medium text-neon-pink">Premium Membership Plans</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white font-kanit mb-6">
                    Choose Your{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-deep via-neon-pink to-crimson">
                        Perfect Plan
                    </span>
                </h1>

                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Unlock exclusive content, connect with top creators, and experience premium entertainment
                </p>
            </section>

            {/* Pricing Cards */}
            <section className="pb-20 px-4 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {plans.map((plan) => {
                        const IconComponent = plan.icon;

                        return (
                            <div
                                key={plan.id}
                                className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""
                                    }`}
                            >
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                                        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-neon-pink to-crimson text-white text-sm font-bold shadow-lg">
                                            🔥 MOST POPULAR
                                        </div>
                                    </div>
                                )}

                                <div
                                    className={`relative h-full bg-gray-900/50 rounded-2xl overflow-hidden border ${plan.popular
                                            ? "border-neon-pink shadow-[0_0_50px_rgba(255,0,127,0.3)]"
                                            : "border-white/10"
                                        } backdrop-blur-sm transition-all duration-300 hover:border-neon-pink/50`}
                                >
                                    {/* Gradient Background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-5`} />

                                    <div className="relative p-8">
                                        {/* Icon */}
                                        <div className="mb-6">
                                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${plan.color}`}>
                                                <IconComponent className="w-8 h-8 text-white" />
                                            </div>
                                        </div>

                                        {/* Plan Name */}
                                        <h3 className="text-2xl font-bold text-white font-kanit mb-2">
                                            {plan.name}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-6">
                                            {plan.description}
                                        </p>

                                        {/* Price */}
                                        <div className="mb-6">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-5xl font-bold text-white">
                                                    ${plan.price}
                                                </span>
                                                <span className="text-gray-400">
                                                    /{plan.period}
                                                </span>
                                            </div>
                                            {plan.savings && (
                                                <p className="text-neon-pink text-sm mt-2 font-medium">
                                                    {plan.savings}
                                                </p>
                                            )}
                                        </div>

                                        {/* CTA Button */}
                                        <Button
                                            size="lg"
                                            className={`w-full mb-8 ${plan.popular
                                                    ? "bg-gradient-to-r from-neon-pink to-crimson hover:from-neon-pink/80 hover:to-crimson/80"
                                                    : ""
                                                }`}
                                            variant={plan.popular ? "default" : "outline"}
                                        >
                                            {plan.cta}
                                        </Button>

                                        {/* Features List */}
                                        <div className="space-y-4">
                                            <p className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
                                                What's Included:
                                            </p>
                                            <ul className="space-y-3">
                                                {plan.features.map((feature, index) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        <Check className="w-5 h-5 text-neon-pink flex-shrink-0 mt-0.5" />
                                                        <span className="text-gray-300 text-sm">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Additional Features */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {additionalFeatures.map((feature, index) => {
                        const IconComponent = feature.icon;

                        return (
                            <div
                                key={index}
                                className="text-center p-6 rounded-xl bg-gray-900/30 border border-white/5"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neon-pink/20 mb-4">
                                    <IconComponent className="w-6 h-6 text-neon-pink" />
                                </div>
                                <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* FAQ Section */}
                <div className="mt-20 max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white font-kanit mb-6">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4 text-left">
                        <details className="group bg-gray-900/30 rounded-xl border border-white/5 overflow-hidden">
                            <summary className="p-6 cursor-pointer text-white font-semibold flex items-center justify-between hover:text-neon-pink transition-colors">
                                Can I cancel my subscription anytime?
                                <span className="text-neon-pink group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-6 pb-6 text-gray-400">
                                Yes! You can cancel your subscription at any time with just one click. There are no long-term commitments or cancellation fees.
                            </div>
                        </details>

                        <details className="group bg-gray-900/30 rounded-xl border border-white/5 overflow-hidden">
                            <summary className="p-6 cursor-pointer text-white font-semibold flex items-center justify-between hover:text-neon-pink transition-colors">
                                What payment methods do you accept?
                                <span className="text-neon-pink group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-6 pb-6 text-gray-400">
                                We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and cryptocurrency payments.
                            </div>
                        </details>

                        <details className="group bg-gray-900/30 rounded-xl border border-white/5 overflow-hidden">
                            <summary className="p-6 cursor-pointer text-white font-semibold flex items-center justify-between hover:text-neon-pink transition-colors">
                                Can I upgrade or downgrade my plan?
                                <span className="text-neon-pink group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-6 pb-6 text-gray-400">
                                Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.
                            </div>
                        </details>

                        <details className="group bg-gray-900/30 rounded-xl border border-white/5 overflow-hidden">
                            <summary className="p-6 cursor-pointer text-white font-semibold flex items-center justify-between hover:text-neon-pink transition-colors">
                                Is my payment information secure?
                                <span className="text-neon-pink group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-6 pb-6 text-gray-400">
                                Yes! We use industry-standard 256-bit SSL encryption and never store your payment information on our servers. All transactions are processed through secure payment gateways.
                            </div>
                        </details>
                    </div>
                </div>
            </section>
        </main>
    );
}
