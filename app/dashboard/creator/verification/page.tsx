"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Shield, Upload, CheckCircle, AlertCircle } from "lucide-react";

export default function CreatorVerificationPage() {
    const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified" | "rejected" | null>(null);

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="flex items-center gap-3 mb-8">
                    <Shield className="w-8 h-8 text-neon-pink" />
                    <h1 className="text-3xl font-bold text-white font-kanit">Creator Verification</h1>
                </div>

                {verificationStatus === "verified" ? (
                    <div className="backdrop-blur-xl bg-green-500/[0.1] border border-green-500/30 rounded-xl p-8 text-center">
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">You're Verified!</h2>
                        <p className="text-gray-300">Your account has been verified. You now have access to all creator features.</p>
                    </div>
                ) : verificationStatus === "pending" ? (
                    <div className="backdrop-blur-xl bg-amber-500/[0.1] border border-amber-500/30 rounded-xl p-8 text-center">
                        <AlertCircle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">Verification Pending</h2>
                        <p className="text-gray-300">Your verification request is being reviewed. This usually takes 24-48 hours.</p>
                    </div>
                ) : (
                    <>
                        {/* Verification Info */}
                        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-8 mb-6">
                            <h2 className="text-xl font-semibold text-white mb-4">Why Get Verified?</h2>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span>Verified badge on your profile</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span>Increased trust from subscribers</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span>Access to premium features</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span>Priority support</span>
                                </li>
                            </ul>
                        </div>

                        {/* Verification Form */}
                        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-8">
                            <h2 className="text-xl font-semibold text-white mb-6">Submit Verification Request</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Legal Name</label>
                                    <input
                                        type="text"
                                        placeholder="Full legal name"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-pink/50 focus:ring-2 focus:ring-neon-pink/20 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
                                    <input
                                        type="date"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-pink/50 focus:ring-2 focus:ring-neon-pink/20 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Government ID</label>
                                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-neon-pink/50 transition-all cursor-pointer">
                                        <Upload className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                                        <p className="text-gray-400 text-sm mb-1">Upload government-issued ID</p>
                                        <p className="text-gray-600 text-xs">Passport, Driver's License, or National ID</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Selfie Verification</label>
                                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-neon-pink/50 transition-all cursor-pointer">
                                        <Upload className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                                        <p className="text-gray-400 text-sm mb-1">Upload a selfie holding your ID</p>
                                        <p className="text-gray-600 text-xs">Ensure your face and ID are clearly visible</p>
                                    </div>
                                </div>

                                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                                    <p className="text-amber-400 text-sm">
                                        <strong>Privacy Notice:</strong> Your personal information is encrypted and only used for verification purposes. We comply with all data protection regulations.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setVerificationStatus("pending")}
                                    className="w-full bg-gradient-to-r from-violet-deep via-neon-pink to-crimson text-white font-semibold py-4 rounded-xl hover:shadow-[0_0_30px_rgba(255,27,109,0.4)] transition-all"
                                >
                                    Submit Verification Request
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
