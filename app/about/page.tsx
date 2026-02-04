import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Users, Target, Award } from "lucide-react";

export const metadata = {
    title: "About Us | DesireHub",
    description: "Learn about DesireHub - the world's most exclusive adult entertainment platform connecting premium creators with their audience.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 px-4 container mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full border-neon-pink/30 bg-neon-pink/10 backdrop-blur-sm">
                    <Shield className="w-4 h-4 text-neon-pink" />
                    <span className="text-sm font-medium text-neon-pink">Est. 2024</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white font-kanit mb-6">
                    About{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-deep via-neon-pink to-crimson">
                        DesireHub
                    </span>
                </h1>

                <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
                    DesireHub is the world's premier adult entertainment platform, connecting top-tier content creators with a global audience. We're revolutionizing the industry with cutting-edge technology, premium content, and creator-first values.
                </p>
            </section>

            {/* Mission Cards */}
            <section className="pb-20 px-4 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 bg-gray-900/30 rounded-xl border border-white/5">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-deep to-neon-pink flex items-center justify-center mb-4">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2 font-kanit">Safety First</h3>
                        <p className="text-gray-400 text-sm">Age verification, creator verification, and secure payments protect our community.</p>
                    </div>

                    <div className="p-6 bg-gray-900/30 rounded-xl border border-white/5">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-pink to-crimson flex items-center justify-center mb-4">
                            <Award className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2 font-kanit">Premium Quality</h3>
                        <p className="text-gray-400 text-sm">Up to 8K ultra-HD content. Professional creators. Studio-grade production.</p>
                    </div>

                    <div className="p-6 bg-gray-900/30 rounded-xl border border-white/5">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-crimson to-violet-deep flex items-center justify-center mb-4">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2 font-kanit">Creator-Focused</h3>
                        <p className="text-gray-400 text-sm">80% revenue share for creators. Tools to grow. Direct fan connection.</p>
                    </div>

                    <div className="p-6 bg-gray-900/30 rounded-xl border border-white/5">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-deep to-neon-pink flex items-center justify-center mb-4">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2 font-kanit">Global Reach</h3>
                        <p className="text-gray-400 text-sm">50M+ users worldwide. Support in 20+ languages. Available 24/7.</p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="pb-20 px-4 container mx-auto max-w-4xl">
                <div className="prose prose-invert max-w-none">
                    <h2 className="text-3xl font-bold text-white font-kanit mb-6">Our Story</h2>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        Founded in 2024, DesireHub was born from a simple vision: to create the most premium, secure, and creator-friendly adult entertainment platform in the world. We saw an industry ripe for innovation and disruption.
                    </p>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        Traditional platforms took too much from creators while delivering too little to fans. We flipped that model. Today, DesireHub is home to thousands of verified creators earning sustainable incomes while delivering unparalleled content to millions of satisfied members.
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                        We're committed to pushing the boundaries of what's possible in adult entertainment - from revolutionary VR experiences to AI-powered personalization, all while maintaining the highest standards of safety, privacy, and respect for our community.
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
