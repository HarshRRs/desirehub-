"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AgeGate() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasVerified = localStorage.getItem("age-verified");
        if (!hasVerified) {
            setIsVisible(true);
        }
    }, []);

    const handleVerify = () => {
        localStorage.setItem("age-verified", "true");
        setIsVisible(false);
    };

    const handleExit = () => {
        window.location.href = "https://www.google.com";
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/95 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-lg p-8 mx-4 text-center border rounded-2xl border-violet-deep/50 bg-midnight shadow-[0_0_50px_-12px_rgba(92,46,145,0.5)]"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-violet-deep/10 to-transparent pointer-events-none" />

                        <h1 className="mb-2 text-4xl font-bold text-white font-kanit drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                            DesireHub
                        </h1>
                        <p className="mb-8 text-lg text-gray-400">
                            Premium Adult Entertainment
                        </p>

                        <div className="mb-8 space-y-4">
                            <h2 className="text-2xl font-semibold text-crimson animate-pulse">
                                AGE VERIFICATION REQUIRED
                            </h2>
                            <p className="text-gray-300">
                                This website contains age-restricted materials including nudity and explicit sexual content. By entering, you affirm that you are at least 18 years of age or the age of majority in the jurisdiction you are accessing the website from.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <button
                                onClick={handleVerify}
                                className="px-8 py-3 text-lg font-bold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-violet-deep to-neon-pink hover:shadow-[0_0_20px_rgba(255,0,127,0.5)] hover:scale-105 active:scale-95"
                            >
                                I AM 18+ - ENTER
                            </button>
                            <button
                                onClick={handleExit}
                                className="px-8 py-3 text-lg font-medium text-gray-400 transition-all duration-300 border border-gray-700 rounded-full hover:bg-gray-800 hover:text-white"
                            >
                                EXIT
                            </button>
                        </div>

                        <p className="mt-6 text-xs text-gray-500">
                            By entering this site you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
