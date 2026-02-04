import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DollarSign, AlertCircle } from "lucide-react";

export default function WithdrawalPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white font-kanit mb-2">Withdraw Funds</h1>
                <p className="text-gray-400">Transfer your earnings to your bank account.</p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 rounded-full bg-green-500/20">
                        <DollarSign className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Available for Withdrawal</p>
                        <p className="text-4xl font-bold text-white font-kanit">$2,450.00</p>
                    </div>
                </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Amount to Withdraw</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                            <Input type="number" placeholder="0.00" className="pl-8 text-lg" />
                        </div>
                        <p className="text-xs text-gray-500">Minimum withdrawal amount is $50.00</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Select Payout Method</label>
                        <select className="w-full h-12 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-neon-pink">
                            <option>Bank Transfer (**** 8842)</option>
                            <option>PayPal (john@example.com)</option>
                            <option>Crypto Wallet (BTC)</option>
                        </select>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        <p className="text-sm text-blue-300">
                            Withdrawals are processed within 3-5 business days. A 2% processing fee applies to instant transfers.
                        </p>
                    </div>

                    <Button className="w-full h-12 text-lg">Confirm Withdrawal</Button>
                </form>
            </div>
        </div>
    );
}
