import { Button } from "@/components/ui/Button";
import { Check, CreditCard, Calendar } from "lucide-react";

export default function SubscriptionPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white font-kanit mb-2">Subscription</h1>
                <p className="text-gray-400">Manage your plan and billing details.</p>
            </div>

            {/* Current Plan */}
            <section className="p-8 rounded-2xl bg-gradient-to-br from-violet-deep/20 to-neon-pink/10 border border-neon-pink/30">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-pink/20 text-neon-pink text-sm font-bold mb-2">
                            CURRENT PLAN
                        </div>
                        <h2 className="text-3xl font-bold text-white font-kanit">Premium Membership</h2>
                        <p className="text-gray-300 mt-1">$14.99 / month</p>
                    </div>
                    <Button variant="outline" className="border-white/20 hover:bg-white/10">Change Plan</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/10">
                            <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Next Billing Date</p>
                            <p className="text-white font-medium">November 24, 2025</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/10">
                            <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Payment Method</p>
                            <p className="text-white font-medium">Visa ending in 4242</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Plan Features */}
            <section className="space-y-4">
                <h3 className="text-xl font-bold text-white font-kanit">Your Plan Includes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {["Unlimited 4K Streaming", "Ad-free Experience", "Offline Downloads", "Priority Support"].map((feature) => (
                        <div key={feature} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                            <Check className="w-5 h-5 text-green-400" />
                            <span className="text-gray-300">{feature}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Cancel Subscription */}
            <section className="pt-8 border-t border-white/10">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-white font-bold">Cancel Subscription</h3>
                        <p className="text-sm text-gray-400">Stop automatic billing at the end of the current period.</p>
                    </div>
                    <Button variant="ghost" className="text-gray-400 hover:text-white">Cancel Plan</Button>
                </div>
            </section>
        </div>
    );
}
