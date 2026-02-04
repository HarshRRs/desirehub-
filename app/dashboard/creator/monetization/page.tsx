import { Button } from "@/components/ui/Button";
import { DollarSign, TrendingUp, CreditCard, Lock } from "lucide-react";

export default function MonetizationPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white font-kanit mb-2">Monetization</h1>
                <p className="text-gray-400">Track your earnings and manage payout settings.</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-deep/20 to-neon-pink/10 border border-neon-pink/30">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-neon-pink/20">
                            <DollarSign className="w-6 h-6 text-neon-pink" />
                        </div>
                        <span className="text-gray-300 font-medium">Available Balance</span>
                    </div>
                    <div className="text-4xl font-bold text-white font-kanit mb-2">$2,450.00</div>
                    <Button size="sm" className="w-full mt-2">Request Payout</Button>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-green-500/20">
                            <TrendingUp className="w-6 h-6 text-green-400" />
                        </div>
                        <span className="text-gray-300 font-medium">This Month</span>
                    </div>
                    <div className="text-4xl font-bold text-white font-kanit mb-2">$850.00</div>
                    <p className="text-sm text-green-400">+12% from last month</p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-blue-500/20">
                            <Lock className="w-6 h-6 text-blue-400" />
                        </div>
                        <span className="text-gray-300 font-medium">Pending</span>
                    </div>
                    <div className="text-4xl font-bold text-white font-kanit mb-2">$120.00</div>
                    <p className="text-sm text-gray-400">Clears in 3 days</p>
                </div>
            </div>

            {/* Revenue Sources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h2 className="text-xl font-bold text-white font-kanit mb-6">Revenue Sources</h2>
                    <div className="space-y-4">
                        {[
                            { name: "Subscriptions", amount: "$1,200.00", percent: "60%" },
                            { name: "Pay-Per-View", amount: "$500.00", percent: "25%" },
                            { name: "Tips", amount: "$300.00", percent: "15%" },
                        ].map((source) => (
                            <div key={source.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-neon-pink" />
                                    <span className="text-gray-300">{source.name}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-white font-bold">{source.amount}</p>
                                    <p className="text-xs text-gray-500">{source.percent}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h2 className="text-xl font-bold text-white font-kanit mb-6">Payout Method</h2>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5 mb-4">
                        <div className="flex items-center gap-3">
                            <CreditCard className="w-6 h-6 text-white" />
                            <div>
                                <p className="text-white font-bold">Bank Transfer</p>
                                <p className="text-sm text-gray-400">**** **** **** 8842</p>
                            </div>
                        </div>
                        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">Active</span>
                    </div>
                    <Button variant="outline" className="w-full">Manage Payout Methods</Button>
                </section>
            </div>
        </div>
    );
}
