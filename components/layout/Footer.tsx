import Link from "next/link";
import { Heart, Twitter, Instagram, Youtube, Mail, Shield } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        platform: [
            { name: "Hottest", href: "/trending" },
            { name: "Pornstars", href: "/creators" },
            { name: "Channels", href: "/categories" },
            { name: "Search", href: "/search" },
        ],
        company: [
            { name: "About Us", href: "/about" },
            { name: "Careers", href: "/careers" },
            { name: "Press Kit", href: "/press" },
            { name: "Contact", href: "/contact" },
        ],
        resources: [
            { name: "Help Center", href: "/faq" },
            { name: "Model Academy", href: "/creator-guide" },
            { name: "Community Rules", href: "/guidelines" },
            { name: "Safety Center", href: "/safety" },
        ],
        legal: [
            { name: "Terms of Service", href: "/terms" },
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Cookie Policy", href: "/cookies" },
            { name: "DMCA", href: "/dmca" },
        ],
    };

    const socialLinks = [
        { name: "Twitter", icon: Twitter, href: "https://twitter.com/desirehub" },
        { name: "Instagram", icon: Instagram, href: "https://instagram.com/desirehub" },
        { name: "YouTube", icon: Youtube, href: "https://youtube.com/desirehub" },
    ];

    return (
        <footer className="bg-gray-950 border-t border-white/10">
            <div className="container mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="block mb-4">
                            <div className="relative h-12 w-36">
                                <Image
                                    src="/logo-new.jpg"
                                    alt="DesireHub"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm mb-6 max-w-xs">
                            The world's most exclusive adult entertainment platform. Experience premium content from top creators worldwide.
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-gray-800/50 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-pink hover:bg-neon-pink/10 transition-all duration-300"
                                        aria-label={social.name}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 font-kanit">Platform</h3>
                        <ul className="space-y-3">
                            {footerLinks.platform.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 text-sm hover:text-neon-pink transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 font-kanit">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 text-sm hover:text-neon-pink transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 font-kanit">Resources</h3>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 text-sm hover:text-neon-pink transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 font-kanit">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 text-sm hover:text-neon-pink transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="border-t border-white/10 pt-8 mb-8">
                    <div className="max-w-md">
                        <h3 className="text-white font-semibold mb-2 font-kanit flex items-center gap-2">
                            <Mail className="w-5 h-5 text-neon-pink" />
                            Stay Updated
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Get exclusive updates, new creator alerts, and special offers.
                        </p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-gradient-to-r from-neon-pink to-crimson rounded-lg text-white text-sm font-semibold hover:from-neon-pink/80 hover:to-crimson/80 transition-all"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <span>© {currentYear} DesireHub. All rights reserved.</span>
                            <span className="hidden md:inline">•</span>
                            <span className="flex items-center gap-1">
                                Made with <Heart className="w-4 h-4 text-neon-pink fill-current" /> by DesireHub Team
                            </span>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center gap-4 text-gray-500 text-xs">
                            <div className="flex items-center gap-1">
                                <Shield className="w-4 h-4 text-green-500" />
                                <span>Secure & Encrypted</span>
                            </div>
                            <span>•</span>
                            <span>18+ Only</span>
                            <span>•</span>
                            <span>Privacy Protected</span>
                        </div>
                    </div>
                </div>

                {/* Age Verification Notice */}
                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <p className="text-yellow-500 text-xs text-center">
                        <strong>RTA (Restricted To Adults):</strong> This website contains age-restricted materials including nudity and explicit sexual content. By entering, you affirm that you are at least 18 years of age or the age of majority in the jurisdiction you are accessing the website from.
                    </p>
                </div>
                <div className="mt-2 text-center">
                    <span className="text-[10px] text-gray-600 font-mono">RTA-5042-1996-1400-1577-RTA</span>
                </div>
            </div>
        </footer>
    );
}
