"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/layout/Navbar";
import { MessageCircle, Send, Search } from "lucide-react";

export default function CreatorMessagesPage() {
    const [conversations, setConversations] = useState<any[]>([]);
    const [selectedConvo, setSelectedConvo] = useState<any>(null);
    const [message, setMessage] = useState("");
    const supabase = createClient();

    useEffect(() => {
        loadConversations();
    }, []);

    async function loadConversations() {
        // Mock data - would load from messages table
        setConversations([
            {
                id: 1,
                user: { username: "user123", avatar: null },
                lastMessage: "Thanks for the great content!",
                timestamp: "2 hours ago",
            },
            {
                id: 2,
                user: { username: "fan456", avatar: null },
                lastMessage: "When is the next video?",
                timestamp: "1 day ago",
            },
        ]);
    }

    function sendMessage() {
        if (!message.trim()) return;
        setMessage("");
    }

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <MessageCircle className="w-8 h-8 text-neon-pink" />
                    <h1 className="text-3xl font-bold text-white font-kanit">Messages</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                    {/* Conversation List */}
                    <div className="lg:col-span-1 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-white/10">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search conversations..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-neon-pink/50"
                                />
                            </div>
                        </div>

                        <div className="overflow-y-auto h-[calc(100%-80px)]">
                            {conversations.map((convo) => (
                                <button
                                    key={convo.id}
                                    onClick={() => setSelectedConvo(convo)}
                                    className={`w-full p-4 border-b border-white/5 hover:bg-white/5 transition-colors text-left ${selectedConvo?.id === convo.id ? 'bg-white/10' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-deep to-neon-pink flex items-center justify-center text-white text-sm font-semibold">
                                            {convo.user.username[0].toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-medium truncate">{convo.user.username}</p>
                                            <p className="text-gray-400 text-xs">{convo.timestamp}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm truncate">{convo.lastMessage}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message View */}
                    <div className="lg:col-span-2 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl flex flex-col">
                        {selectedConvo ? (
                            <>
                                <div className="p-4 border-b border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-deep to-neon-pink flex items-center justify-center text-white text-sm font-semibold">
                                            {selectedConvo.user.username[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">{selectedConvo.user.username}</p>
                                            <p className="text-gray-400 text-xs">Active now</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 p-4 overflow-y-auto">
                                    <div className="text-center text-gray-500 py-8">
                                        Start of conversation with {selectedConvo.user.username}
                                    </div>
                                </div>

                                <div className="p-4 border-t border-white/10">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                            placeholder="Type a message..."
                                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-pink/50"
                                        />
                                        <button
                                            onClick={sendMessage}
                                            className="bg-gradient-to-r from-violet-deep to-neon-pink text-white p-2 rounded-lg hover:shadow-[0_0_20px_rgba(255,27,109,0.4)] transition-all"
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-500">
                                <div className="text-center">
                                    <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                    <p>Select a conversation to start messaging</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
