"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, Eye, EyeOff, Chrome, Github, Sparkles } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // Redirect to homepage on success
            router.push("/");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to sign in");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) setError(error.message);
    };

    const handleGithubLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) setError(error.message);
    };

    return (
        <main className="min-h-screen bg-midnight flex items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-deep/10 via-midnight to-midnight" />
            <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] opacity-5 bg-cover bg-center" />

            {/* Animated Gradient Orbs */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-violet-deep/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-neon-pink/20 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* Login Container */}
            <div className="relative z-10 w-full max-w-md px-6">
                {/* Logo */}
                <Link href="/" className="block mb-8">
                    <div className="relative h-16 w-48 mx-auto">
                        <Image
                            src="/logo-new.jpg"
                            alt="DesireHub"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Login Card */}
                <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white font-kanit mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-400">
                            Sign in to access your premium content
                        </p>
                        {error && (
                            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Social Login */}
                    <div className="space-y-3 mb-6">
                        <Button
                            variant="outline"
                            className="w-full gap-3 hover:bg-white/5"
                            type="button"
                            onClick={handleGoogleLogin}
                        >
                            <Chrome className="w-5 h-5" />
                            Continue with Google
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full gap-3 hover:bg-white/5"
                            type="button"
                            onClick={handleGithubLogin}
                        >
                            <Github className="w-5 h-5" />
                            Continue with GitHub
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-gray-900/50 text-gray-400">
                                Or continue with email
                            </span>
                        </div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="your@email.com"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-3 bg-gray-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-transparent transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-white/10 bg-gray-800/50 text-neon-pink focus:ring-neon-pink focus:ring-offset-0"
                                />
                                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                                    Remember me
                                </span>
                            </label>
                            <Link
                                href="/auth/forgot-password"
                                className="text-sm text-neon-pink hover:text-neon-pink/80 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            size="lg"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-neon-pink to-crimson hover:from-neon-pink/80 hover:to-crimson/80 gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Sparkles className="w-5 h-5" />
                            {loading ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="mt-6 text-center text-sm text-gray-400">
                        Don't have an account?{" "}
                        <Link
                            href="/signup"
                            className="text-neon-pink hover:text-neon-pink/80 font-semibold transition-colors"
                        >
                            Sign up for free
                        </Link>
                    </p>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-gray-500">
                    By continuing, you agree to our{" "}
                    <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </main>
    );
}
