import { Input } from "@/components/ui/Input";
import { Search, Send } from "lucide-react";

export default function MessagesPage() {
    return (
        <div className="h-[calc(100vh-140px)] flex gap-6">
            {/* Sidebar List */}
            <div className="w-80 flex flex-col bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white font-kanit mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input placeholder="Search messages..." className="pl-9 h-10" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`p-4 hover:bg-white/5 cursor-pointer border-b border-white/5 ${i === 1 ? "bg-white/10" : ""}`}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-white font-medium truncate">User Name {i}</h3>
                                        <span className="text-xs text-gray-500">2m</span>
                                    </div>
                                    <p className="text-sm text-gray-400 truncate">Hey, I loved your latest video! When is the next one?</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700" />
                    <div>
                        <h3 className="text-white font-bold">User Name 1</h3>
                        <p className="text-xs text-green-400">Online</p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="flex justify-start">
                        <div className="max-w-[70%] bg-white/10 rounded-2xl rounded-tl-none p-3 text-gray-300">
                            Hello! I'm a big fan of your work.
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="max-w-[70%] bg-neon-pink/20 text-white rounded-2xl rounded-tr-none p-3">
                            Thank you so much! I appreciate the support ❤️
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <div className="max-w-[70%] bg-white/10 rounded-2xl rounded-tl-none p-3 text-gray-300">
                            When are you posting the next exclusive set?
                        </div>
                    </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                    <div className="flex gap-2">
                        <Input placeholder="Type a message..." className="flex-1" />
                        <button className="p-3 bg-neon-pink rounded-lg text-white hover:bg-neon-pink/80 transition-colors">
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
