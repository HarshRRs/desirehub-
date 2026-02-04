import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowLeft } from "lucide-react";

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-midnight relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-crimson/20 via-midnight to-midnight" />

            <div className="relative z-10 w-full max-w-md p-8 mx-4 border rounded-2xl border-white/10 bg-midnight/80 backdrop-blur-xl shadow-2xl">
                <Link href="/" className="inline-flex items-center gap-2 mb-8 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white font-kanit mb-2">Create Account</h1>
                    <p className="text-gray-400">Join the ultimate premium experience</p>
                </div>

                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">First Name</label>
                            <Input placeholder="John" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Last Name</label>
                            <Input placeholder="Doe" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email</label>
                        <Input type="email" placeholder="Enter your email" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Password</label>
                        <Input type="password" placeholder="Create a password" />
                    </div>

                    <div className="flex items-start gap-2 mt-4">
                        <input type="checkbox" className="mt-1 rounded border-gray-600 bg-white/5 text-neon-pink focus:ring-neon-pink" />
                        <span className="text-xs text-gray-400">
                            I confirm I am 18+ years old and agree to the <Link href="/terms" className="text-white hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-white hover:underline">Privacy Policy</Link>.
                        </span>
                    </div>

                    <Button className="w-full h-12 text-lg mt-6">
                        Create Account
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link href="/login" className="text-neon-pink hover:underline font-medium">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
