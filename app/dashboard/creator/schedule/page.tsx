"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Calendar, Plus, Clock, Video } from "lucide-react";

export default function CreatorSchedulePage() {
    const [scheduledContent, setScheduledContent] = useState([
        { id: 1, title: "New Video Upload", date: "2024-01-25", time: "14:00", type: "video" },
        { id: 2, title: "Live Stream Event", date: "2024-01-26", time: "20:00", type: "live" },
    ]);

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-neon-pink" />
                        <h1 className="text-3xl font-bold text-white font-kanit">Content Schedule</h1>
                    </div>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-violet-deep to-neon-pink text-white font-semibold px-6 py-3 rounded-xl hover:shadow-[0_0_30px_rgba(255,27,109,0.4)] transition-all">
                        <Plus className="w-5 h-5" />
                        Schedule Content
                    </button>
                </div>

                {/* Calendar View */}
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">This Week</h3>
                    <div className="h-96 flex items-center justify-center text-gray-500">
                        Calendar component - integrate react-calendar or similar
                    </div>
                </div>

                {/* Scheduled Items */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Upcoming</h3>
                    {scheduledContent.map((item) => (
                        <div
                            key={item.id}
                            className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-lg ${item.type === 'live' ? 'bg-red-500/20' : 'bg-neon-pink/20'} flex items-center justify-center`}>
                                        {item.type === 'live' ? <Video className="w-6 h-6 text-red-400" /> : <Clock className="w-6 h-6 text-neon-pink" />}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold">{item.title}</h4>
                                        <p className="text-gray-400 text-sm">{item.date} at {item.time}</p>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-white transition-colors">Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
