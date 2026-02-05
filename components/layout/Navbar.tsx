"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, User, LogOut, Upload, LayoutDashboard, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showCreatorMenu, setShowCreatorMenu] = useState(false);
    const [isCreator, setIsCreator] = useState(false);
    const { user, signOut } = useAuth();
    const supabase = createClient();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Check if user is a creator
    useEffect(() => {
        async function checkCreatorStatus() {
            if (!user) {
                setIsCreator(false);
                return;
            }

            const { data } = await supabase
                .from('profiles')
                .select('account_type')
                .eq('id', user.id)
                .single();

            setIsCreator(data?.account_type === 'creator');
        }

        checkCreatorStatus();
    }, [user]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Explore", href: "/categories" },
        { name: "Hottest", href: "/trending" },
        { name: "Channels", href: "/categories" },
        { name: "Pornstars", href: "/creators" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-transparent",
                isScrolled
                    ? "bg-midnight/80 backdrop-blur-md border-white/10 py-2"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container px-4 mx-auto">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative h-16 w-48 transition-transform group-hover:scale-105">
                        <Image
                            src="/logo.png"
                            alt="DesireHub"
                            fill
                            className="object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden gap-8 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-gray-300 transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link href="/search" className="p-2 text-gray-300 transition-colors hover:text-white hover:bg-white/10 rounded-full">
                            <Search className="w-5 h-5" />
                        </Link>

                        {user ? (
                            <div className="hidden gap-3 sm:flex items-center">
                                {/* Creator Dropdown */}
                                {isCreator && (
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowCreatorMenu(!showCreatorMenu)}
                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-deep to-neon-pink hover:shadow-[0_0_20px_rgba(255,27,109,0.5)] rounded-lg transition-all text-sm text-white font-medium"
                                        >
                                            Creator
                                            <ChevronDown className="w-4 h-4" />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {showCreatorMenu && (
                                            <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                                                <Link
                                                    href="/dashboard/creator/upload"
                                                    onClick={() => setShowCreatorMenu(false)}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-white"
                                                >
                                                    <Upload className="w-4 h-4 text-neon-pink" />
                                                    Upload Video
                                                </Link>
                                                <Link
                                                    href="/dashboard/creator/content"
                                                    onClick={() => setShowCreatorMenu(false)}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-white"
                                                >
                                                    <LayoutDashboard className="w-4 h-4 text-neon-pink" />
                                                    My Content
                                                </Link>
                                                <Link
                                                    href="/dashboard/creator/analytics"
                                                    onClick={() => setShowCreatorMenu(false)}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-white border-t border-white/10"
                                                >
                                                    Dashboard
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <Link href="/profile" className="p-2 text-gray-300 hover:text-white transition-colors">
                                    <User className="w-5 h-5" />
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm text-white"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="hidden gap-3 sm:flex">
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/login">Log In</Link>
                                </Button>
                                <Button size="sm" asChild>
                                    <Link href="/signup">Sign Up</Link>
                                </Button>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            className="p-2 text-gray-300 transition-colors md:hidden hover:text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden border-b bg-midnight/95 backdrop-blur-xl border-white/10 md:hidden"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-2 text-lg font-medium text-gray-300 rounded-lg hover:bg-white/5 hover:text-white"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-white/10">
                                <Button variant="outline" className="w-full">
                                    Log In
                                </Button>
                                <Button className="w-full">Sign Up</Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
