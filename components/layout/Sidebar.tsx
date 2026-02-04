"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Compass, Heart, Clock, Settings, Upload, LogOut, User } from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();

    const links = [
        { name: "Home", href: "/dashboard", icon: Home },
        { name: "Explore", href: "/dashboard/explore", icon: Compass },
        { name: "Favorites", href: "/dashboard/favorites", icon: Heart },
        { name: "History", href: "/dashboard/history", icon: Clock },
        { name: "Creator Studio", href: "/dashboard/creator", icon: Upload },
        { name: "Profile", href: "/dashboard/profile", icon: User },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ];

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-midnight border-r border-white/10 flex flex-col z-30 pt-20">
            <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-gradient-to-r from-violet-deep/20 to-neon-pink/10 text-white border border-neon-pink/30"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-neon-pink" : "group-hover:text-white")} />
                            <span className="font-medium">{link.name}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-white/10">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-crimson hover:bg-crimson/10 rounded-xl transition-all">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Log Out</span>
                </button>
            </div>
        </aside>
    );
}
