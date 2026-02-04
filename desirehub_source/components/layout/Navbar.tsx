"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, User, Bell } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Trending", href: "/trending" },
        { name: "Categories", href: "/categories" },
        { name: "Creators", href: "/creators" },
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
                    {/* Logo */}
                    <Link href="/" className="relative h-12 w-40 transition-transform group-hover:scale-105">
                        <Image
                            src="/logo.jpg"
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
                        <button className="p-2 text-gray-300 transition-colors hover:text-white hover:bg-white/10 rounded-full">
                            <Search className="w-5 h-5" />
                        </button>
                        <div className="hidden gap-3 sm:flex">
                            <Button variant="ghost" size="sm">
                                Log In
                            </Button>
                            <Button size="sm">Sign Up</Button>
                        </div>

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
