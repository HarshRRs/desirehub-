import Navbar from "@/components/layout/Navbar";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { ThumbsUp, ThumbsDown, Share2, Flag, MessageSquare, Heart, Play } from "lucide-react";
import Link from "next/link";

const VideoPlayer = dynamic(() => import("@/components/ui/VideoPlayer"), {
    loading: () => <div className="w-full aspect-video bg-black/50 animate-pulse rounded-xl" />,
});

export default function WatchPage({ params }: { params: { id: string } }) {
    // Mock data - in a real app, fetch based on params.id
    const video = {
        title: "Exclusive: Behind the Scenes Photoshoot",
        views: "1.2M",
        likes: "45K",
        date: "2 days ago",
        description: "Get an exclusive look at our latest premium photoshoot. Full 4K quality available for subscribers.",
        creator: {
            name: "Angelina Rose",
            subscribers: "500K",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Angelina"
        }
    };

    return (
        <main className="min-h-screen bg-midnight pb-20">
            <Navbar />

            <div className="container mx-auto px-4 pt-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Video Player */}
                        <VideoPlayer
                            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                            poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
                        />

                        {/* Video Info */}
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white font-kanit mb-2">{video.title}</h1>
                            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                                <div className="text-gray-400 text-sm">
                                    {video.views} views • {video.date}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" className="gap-2 text-gray-300 hover:text-neon-pink">
                                        <ThumbsUp className="w-5 h-5" /> {video.likes}
                                    </Button>
                                    <Button variant="ghost" size="sm" className="gap-2 text-gray-300 hover:text-white">
                                        <ThumbsDown className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="gap-2 text-gray-300 hover:text-white">
                                        <Share2 className="w-5 h-5" /> Share
                                    </Button>
                                    <Button variant="ghost" size="sm" className="gap-2 text-gray-300 hover:text-crimson">
                                        <Flag className="w-5 h-5" /> Report
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Creator Info */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-neon-pink">
                                    <img src={video.creator.avatar} alt={video.creator.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">{video.creator.name}</h3>
                                    <p className="text-xs text-gray-400">{video.creator.subscribers} Subscribers</p>
                                </div>
                            </div>
                            <Button className="gap-2">
                                <Heart className="w-4 h-4 fill-current" /> Subscribe
                            </Button>
                        </div>

                        {/* Description */}
                        <div className="p-4 rounded-xl bg-black/20 text-gray-300 text-sm leading-relaxed">
                            {video.description}
                        </div>

                        {/* Comments Section */}
                        <div className="pt-6">
                            <h3 className="text-xl font-bold text-white font-kanit mb-6 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-neon-pink" /> 248 Comments
                            </h3>

                            {/* Comment Input */}
                            <div className="flex gap-4 mb-8">
                                <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0" />
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        className="w-full bg-transparent border-b border-gray-700 focus:border-neon-pink outline-none py-2 text-white transition-colors"
                                    />
                                    <div className="flex justify-end mt-2">
                                        <Button size="sm" disabled>Comment</Button>
                                    </div>
                                </div>
                            </div>

                            {/* Mock Comments */}
                            <div className="space-y-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-800 flex-shrink-0" />
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-white font-medium text-sm">User {i}</span>
                                                <span className="text-gray-500 text-xs">2 hours ago</span>
                                            </div>
                                            <p className="text-gray-300 text-sm">This is amazing content! Keep it up.</p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1">
                                                    <ThumbsUp className="w-3 h-3" /> 12
                                                </button>
                                                <button className="text-gray-500 hover:text-white text-xs">Reply</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Recommendations */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white font-kanit">Up Next</h3>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Link key={i} href={`/watch/${i}`} className="flex gap-3 group">
                                    <div className="relative w-40 aspect-video bg-gray-900 rounded-lg overflow-hidden border border-white/5 group-hover:border-neon-pink/50 transition-all flex-shrink-0">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Play className="w-8 h-8 text-white/20 group-hover:text-white/80 transition-colors" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium text-sm line-clamp-2 group-hover:text-neon-pink transition-colors">
                                            Recommended Video Title {i}
                                        </h4>
                                        <p className="text-gray-500 text-xs mt-1">Channel Name</p>
                                        <p className="text-gray-500 text-xs">50K views</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
