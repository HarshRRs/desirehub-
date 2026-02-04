import { Button } from "@/components/ui/Button";
import { Plus, CreditCard, Trash2 } from "lucide-react";

export default function PaymentPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white font-kanit mb-2">Payment Methods</h1>
                    <p className="text-gray-400">Manage your saved cards and billing history.</p>
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" /> Add New Card
                </Button>
            </div>

            {/* Saved Cards */}
            <div className="space-y-4">
                {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-8 bg-gray-700 rounded flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-white font-bold">Visa ending in 424{i}</p>
                                <p className="text-sm text-gray-400">Expires 12/2{4 + i}</p>
                            </div>
                            {i === 1 && (
                                <span className="px-2 py-1 rounded-full bg-white/10 text-xs text-white border border-white/20 ml-2">
                                    Default
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <button className="p-2 text-gray-500 hover:text-crimson transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Billing History */}
            <section className="pt-8">
                <h2 className="text-xl font-bold text-white font-kanit mb-6">Billing History</h2>
                <div className="rounded-2xl border border-white/10 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-sm">
                            <tr>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Description</th>
                                <th className="p-4 font-medium">Amount</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-white">Oct 24, 2023</td>
                                    <td className="p-4 text-gray-300">Premium Subscription</td>
                                    <td className="p-4 text-white font-medium">$14.99</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs border border-green-500/30">
                                            Paid
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <Button variant="link" size="sm" className="text-neon-pink h-auto p-0">Download</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
