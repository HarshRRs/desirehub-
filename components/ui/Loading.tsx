"use client";

import { Loader2 } from "lucide-react";

interface LoadingProps {
    fullScreen?: boolean;
    text?: string;
    size?: "sm" | "md" | "lg";
}

export default function Loading({
    fullScreen = false,
    text = "Loading...",
    size = "md",
}: LoadingProps = {}) {
    const sizeClasses = {
        sm: "w-6 h-6",
        md: "w-12 h-12",
        lg: "w-16 h-16",
    };

    const containerClasses = fullScreen
        ? "fixed inset-0 bg-midnight flex items-center justify-center z-50"
        : "flex items-center justify-center py-12";

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-deep via-neon-pink to-crimson opacity-20 blur-xl animate-pulse" />

                    {/* Spinning loader */}
                    <Loader2
                        className={`${sizeClasses[size]} text-neon-pink animate-spin relative z-10`}
                    />
                </div>

                {text && (
                    <p className="text-gray-400 text-sm font-medium animate-pulse">
                        {text}
                    </p>
                )}
            </div>
        </div>
    );
}
