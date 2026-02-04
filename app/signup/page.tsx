"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, Eye, EyeOff, User, Chrome, Github, Sparkles, Crown } from "lucide-react";
import Image from "next/image";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const supabase = createClient();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        accountType: "user" as "user" | "creator",
        ageVerified: false,
        termsAccepted: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Sign up with Supabase
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        username: formData.username,
                        account_type: formData.accountType,
                    },
                },
            });

            if (authError) throw authError;

            // Redirect to homepage
            router.push("/");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to create account");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) setError(error.message);
    };

    const handleGithubSignup = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) setError(error.message);
    };

    const updateFormData = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <main className="min-h-screen bg-midnight flex items-center justify-center relative overflow-hidden py-12">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-deep/10 via-midnight to-midnight" />
            <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] opacity-5 bg-cover bg-center" />

            {/* Animated Gradient Orbs */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-violet-deep/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-neon-pink/20 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* Signup Container */}
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

                {/* Signup Card */}
                <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white font-kanit mb-2">
                            Create Your Account
                        </h1>
                        <p className="text-gray-400">
                            Join the ultimate premium platform
                        </p>
                    </div>

                    {/* Account Type Selection */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button
                            type="button"
                            onClick={() => updateFormData("accountType", "user")}
                            className={`p-4 rounded-lg border-2 transition-all ${formData.accountType === "user"
                                ? "border-neon-pink bg-neon-pink/10"
                                : "border-white/10 bg-gray-800/30 hover:border-white/20"
                                }`}
                        >
                            <User className={`w-6 h-6 mx-auto mb-2 ${formData.accountType === "user" ? "text-neon-pink" : "text-gray-400"
                                }`} />
                            <p className={`text-sm font-semibold ${formData.accountType === "user" ? "text-white" : "text-gray-400"
                                }`}>
                                User
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Watch & enjoy</p>
                        </button>
                        <button
                            type="button"
                            onClick={() => updateFormData("accountType", "creator")}
                            className={`p-4 rounded-lg border-2 transition-all ${formData.accountType === "creator"
                                ? "border-gold bg-gold/10"
                                : "border-white/10 bg-gray-800/30 hover:border-white/20"
                                }`}
                        >
                            <Crown className={`w-6 h-6 mx-auto mb-2 ${formData.accountType === "creator" ? "text-gold" : "text-gray-400"
                                }`} />
                            <p className={`text-sm font-semibold ${formData.accountType === "creator" ? "text-white" : "text-gray-400"
                                }`}>
                                Creator
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Create & earn</p>
                        </button>
                    </div>

                    {/* Social Signup */}
                    <div className="space-y-3 mb-6">
                        <Button
                            variant="outline"
                            className="w-full gap-3 hover:bg-white/5"
                            type="button"
                        >
                            <Chrome className="w-5 h-5" />
                            Continue with Google
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full gap-3 hover:bg-white/5"
                            type="button"
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
                                Or sign up with email
                            </span>
                        </div>
                    </div>

                    {/* Signup Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                    value={formData.email}
                                    onChange={(e) => updateFormData("email", e.target.value)}
                                    required
                                    placeholder="your@email.com"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Username Input */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => updateFormData("username", e.target.value)}
                                    required
                                    placeholder="choose a username"
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
                                    value={formData.password}
                                    onChange={(e) => updateFormData("password", e.target.value)}
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
                            <p className="text-xs text-gray-500 mt-1">
                                Must be at least 8 characters
                            </p>
                        </div>

                        {/* Checkboxes */}
                        <div className="space-y-3 pt-2">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={formData.ageVerified}
                                    onChange={(e) => updateFormData("ageVerified", e.target.checked)}
                                    required
                                    className="mt-0.5 w-4 h-4 rounded border-white/10 bg-gray-800/50 text-neon-pink focus:ring-neon-pink focus:ring-offset-0"
                                />
                                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                                    I confirm that I am 18 years or older
                                </span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={formData.termsAccepted}
                                    onChange={(e) => updateFormData("termsAccepted", e.target.checked)}
                                    required
                                    className="mt-0.5 w-4 h-4 rounded border-white/10 bg-gray-800/50 text-neon-pink focus:ring-neon-pink focus:ring-offset-0"
                                />
                                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                                    I agree to the{" "}
                                    <Link href="/terms" className="text-neon-pink hover:underline">
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="/privacy" className="text-neon-pink hover:underline">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full bg-gradient-to-r from-neon-pink to-crimson hover:from-neon-pink/80 hover:to-crimson/80 gap-2 mt-6"
                        >
                            <Sparkles className="w-5 h-5" />
                            Create Account
                        </Button>
                    </form>

                    {/* Login Link */}
                    <p className="mt-6 text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-neon-pink hover:text-neon-pink/80 font-semibold transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
