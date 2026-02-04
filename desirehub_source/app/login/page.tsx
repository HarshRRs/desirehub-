import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-midnight relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-deep/20 via-midnight to-midnight" />

            <div className="relative z-10 w-full max-w-md p-8 mx-4 border rounded-2xl border-white/10 bg-midnight/80 backdrop-blur-xl shadow-2xl">
                <Link href="/" className="inline-flex items-center gap-2 mb-8 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white font-kanit mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to access your premium content</p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email</label>
                        <Input type="email" placeholder="Enter your email" />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <Link href="#" className="text-xs text-neon-pink hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <Input type="password" placeholder="Enter your password" />
                    </div>

                    <Button className="w-full h-12 text-lg mt-6">
                        Sign In
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-neon-pink hover:underline font-medium">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
