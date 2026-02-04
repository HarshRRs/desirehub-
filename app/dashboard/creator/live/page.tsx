"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Video, Users, Radio, Settings, Eye } from "lucide-react";

export default function CreatorLivePage() {
    const [isLive, setIsLive] = useState(false);
    const [viewers, setViewers] = useState(0);

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <Radio className="w-8 h-8 text-red-500" />
                    <h1 className="text-3xl font-bold text-white font-kanit">Live Streaming</h1>
                </div>

                {!isLive ? (
                    <div className="max-w-4xl mx-auto">
                        {/* Setup Live Stream */}
                        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-8 mb-6">
                            <h2 className="text-2xl font-bold text-white mb-6">Start Your Live Stream</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Stream Title</label>
                                    <input
                                        type="text"
                                        placeholder="What's your stream about?"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-pink/50 focus:ring-2 focus:ring-neon-pink/20 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Tell viewers what to expect..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-pink/50 focus:ring-2 focus:ring-neon-pink/20 transition-all resize-none"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-white/10 bg-white/5 text-neon-pink focus:ring-neon-pink/20"
                                        />
                                        <span className="text-gray-300 text-sm">Premium subscribers only</span>
                                    </label>
                                </div>

                                <button
                                    onClick={() => setIsLive(true)}
                                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-4 rounded-xl hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all flex items-center justify-center gap-2"
                                >
                                    <Radio className="w-5 h-5" />
                                    Go Live
                                </button>
                            </div>
                        </div>

                        {/* Live Stream Guide */}
                        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Live Streaming Tips</h3>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li>• Ensure good lighting and audio quality</li>
                                <li>• Test your setup before going live</li>
                                <li>• Engage with your viewers in real-time</li>
                                <li>• Schedule your streams in advance</li>
                                <li>• Keep your content within community guidelines</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-6xl mx-auto">
                        {/* Live Stream Active */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Video Feed */}
                            <div className="lg:col-span-2">
                                <div className="aspect-video bg-black rounded-xl mb-4 relative">
                                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full">
                                        <Radio className="w-4 h-4 animate-pulse" />
                                        <span className="font-semibold">LIVE</span>
                                    </div>
                                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm">
                                        <Eye className="w-4 h-4" />
                                        <span>{viewers} viewers</span>
                                    </div>
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        Live stream video feed - integrate WebRTC or streaming service
                                    </div>
                                </div>

                                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                                    <h3 className="text-white font-semibold mb-4">Stream Controls</h3>
                                    <div className="flex gap-4">
                                        <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition-all">
                                            <Settings className="w-5 h-5 mx-auto" />
                                        </button>
                                        <button
                                            onClick={() => setIsLive(false)}
                                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-all font-semibold"
                                        >
                                            End Stream
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Live Chat */}
                            <div className="lg:col-span-1">
                                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6 h-[600px] flex flex-col">
                                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                        <Users className="w-5 h-5" />
                                        Live Chat
                                    </h3>
                                    <div className="flex-1 overflow-y-auto mb-4">
                                        <p className="text-gray-500 text-center py-8">No messages yet</p>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-pink/50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
