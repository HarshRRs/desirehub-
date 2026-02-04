import { Play, Heart, MoreVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function FavoritesPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white font-kanit mb-2">My Favorites</h1>
                    <p className="text-gray-400">Videos you've liked and saved for later.</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Play className="w-4 h-4" /> Play All
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-neon-pink/50 transition-all">
                        {/* Thumbnail */}
                        <Link href={`/watch/${i}`} className="block relative aspect-video bg-gray-900 overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <Play className="w-10 h-10 text-white fill-current" />
                            </div>
                            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded text-xs text-white font-medium">
                                14:20
                            </div>
                        </Link>

                        {/* Info */}
                        <div className="p-4">
                            <div className="flex justify-between items-start gap-2 mb-2">
                                <Link href={`/watch/${i}`} className="text-white font-bold hover:text-neon-pink transition-colors line-clamp-2">
                                    Favorite Video Title {i}
                                </Link>
                                <button className="text-gray-400 hover:text-white">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <span className="text-xs text-gray-400">Added 2 days ago</span>
                                <button className="text-gray-500 hover:text-crimson transition-colors" title="Remove from favorites">
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
