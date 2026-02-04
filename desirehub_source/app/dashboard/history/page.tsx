import { Play, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function HistoryPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white font-kanit mb-2">Watch History</h1>
                    <p className="text-gray-400">Continue where you left off.</p>
                </div>
                <Button variant="ghost" className="text-crimson hover:bg-crimson/10 hover:text-crimson gap-2">
                    <Trash2 className="w-4 h-4" /> Clear History
                </Button>
            </div>

            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                        {/* Thumbnail */}
                        <Link href={`/watch/${i}`} className="relative w-full sm:w-64 aspect-video bg-gray-900 rounded-lg overflow-hidden flex-shrink-0">
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <Play className="w-8 h-8 text-white fill-current" />
                            </div>
                            {/* Progress Bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                                <div className="h-full bg-neon-pink" style={{ width: '65%' }} />
                            </div>
                        </Link>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between py-1">
                            <div>
                                <Link href={`/watch/${i}`} className="text-lg font-bold text-white hover:text-neon-pink transition-colors mb-1 block">
                                    Watched Video Title {i}
                                </Link>
                                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    Creator Name
                                </Link>
                            </div>

                            <div className="flex items-center justify-between mt-4 sm:mt-0">
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Watched 4 hours ago
                                </p>
                                <button className="text-gray-500 hover:text-crimson opacity-0 group-hover:opacity-100 transition-all p-2">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
