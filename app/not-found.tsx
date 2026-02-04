"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Home, Search, TrendingUp, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-midnight flex items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-deep/10 via-midnight to-midnight" />

            {/* Animated Gradient Orbs */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-violet-deep/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-neon-pink/20 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
                {/* 404 Number */}
                <div className="mb-8">
                    <h1 className="text-9xl md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-deep via-neon-pink to-crimson animate-pulse leading-none font-kanit">
                        404
                    </h1>
                </div>

                {/* Message */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-kanit">
                    Oops! Page Not Found
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                    The page you're looking for doesn't exist or has been moved. Let's get you back on track!
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/">
                        <Button size="lg" className="gap-2 bg-gradient-to-r from-neon-pink to-crimson hover:from-neon-pink/80 hover:to-crimson/80">
                            <Home className="w-5 h-5" />
                            Go Home
                        </Button>
                    </Link>
                    <Link href="/trending">
                        <Button size="lg" variant="outline" className="gap-2">
                            <TrendingUp className="w-5 h-5" />
                            Browse Trending
                        </Button>
                    </Link>
                    <Link href="/search">
                        <Button size="lg" variant="outline" className="gap-2">
                            <Search className="w-5 h-5" />
                            Search Content
                        </Button>
                    </Link>
                </div>

                {/* Go Back Link */}
                <button
                    onClick={() => window.history.back()}
                    className="mt-8 inline-flex items-center gap-2 text-gray-400 hover:text-neon-pink transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Go back to previous page
                </button>

                {/* Helpful Links */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <p className="text-gray-500 text-sm mb-4">Popular pages:</p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link href="/creators" className="text-neon-pink hover:underline text-sm">
                            Top Creators
                        </Link>
                        <span className="text-gray-700">•</span>
                        <Link href="/categories" className="text-neon-pink hover:underline text-sm">
                            Categories
                        </Link>
                        <span className="text-gray-700">•</span>
                        <Link href="/pricing" className="text-neon-pink hover:underline text-sm">
                            Pricing
                        </Link>
                        <span className="text-gray-700">•</span>
                        <Link href="/faq" className="text-neon-pink hover:underline text-sm">
                            Help Center
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
