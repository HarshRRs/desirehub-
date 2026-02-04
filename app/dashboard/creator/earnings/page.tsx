"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/layout/Navbar";
import { DollarSign, TrendingUp, Calendar, Download } from "lucide-react";

export default function CreatorEarningsPage() {
    const [earnings, setEarnings] = useState({
        total: 0,
        thisMonth: 0,
        lastMonth: 0,
        pending: 0,
    });
    const [transactions, setTransactions] = useState<any[]>([]);
    const supabase = createClient();

    useEffect(() => {
        loadEarnings();
    }, []);

    async function loadEarnings() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: creator } = await supabase
            .from("creators")
            .select("total_earnings")
            .eq("id", user.id)
            .single();

        const total = parseFloat(creator?.total_earnings || "0");

        setEarnings({
            total,
            thisMonth: total * 0.15, // Mock data
            lastMonth: total * 0.12,
            pending: total * 0.05,
        });

        // Mock transactions
        setTransactions([
            { id: 1, date: "2024-01-20", amount: 125.50, type: "Subscription", status: "Paid" },
            { id: 2, date: "2024-01-18", amount: 89.00, type: "Tips", status: "Paid" },
            { id: 3, date: "2024-01-15", amount: 210.00, type: "PPV Content", status: "Pending" },
        ]);
    }

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <DollarSign className="w-8 h-8 text-gold" />
                        <h1 className="text-3xl font-bold text-white font-kanit">Earnings</h1>
                    </div>
                    <button className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all">
                        <Download className="w-5 h-5" />
                        Download Report
                    </button>
                </div>

                {/* Earnings Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                        <p className="text-gray-400 text-sm mb-2">Total Earnings</p>
                        <h3 className="text-3xl font-bold text-white">${earnings.total.toFixed(2)}</h3>
                    </div>

                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                        <p className="text-gray-400 text-sm mb-2">This Month</p>
                        <h3 className="text-3xl font-bold text-green-400">${earnings.thisMonth.toFixed(2)}</h3>
                    </div>

                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                        <p className="text-gray-400 text-sm mb-2">Last Month</p>
                        <h3 className="text-3xl font-bold text-white">${earnings.lastMonth.toFixed(2)}</h3>
                    </div>

                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                        <p className="text-gray-400 text-sm mb-2">Pending</p>
                        <h3 className="text-3xl font-bold text-amber-400">${earnings.pending.toFixed(2)}</h3>
                    </div>
                </div>

                {/* Earnings Chart */}
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">Earnings Over Time</h3>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                        Chart placeholder - integrate Chart.js for line graph
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="backdrop-blur-xl bg-white/[0. 03] border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left text-gray-400 text-sm font-medium pb-3">Date</th>
                                    <th className="text-left text-gray-400 text-sm font-medium pb-3">Type</th>
                                    <th className="text-left text-gray-400 text-sm font-medium pb-3">Amount</th>
                                    <th className="text-left text-gray-400 text-sm font-medium pb-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx) => (
                                    <tr key={tx.id} className="border-b border-white/5">
                                        <td className="py-3 text-white">{tx.date}</td>
                                        <td className="py-3 text-gray-300">{tx.type}</td>
                                        <td className="py-3 text-white font-semibold">${tx.amount.toFixed(2)}</td>
                                        <td className="py-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${tx.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                                                }`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
