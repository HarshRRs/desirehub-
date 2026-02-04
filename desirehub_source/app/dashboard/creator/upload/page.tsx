import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Upload, X, Image as ImageIcon, Film } from "lucide-react";

export default function UploadPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white font-kanit mb-2">Upload New Content</h1>
                <p className="text-gray-400">Share your latest creation with your fans.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upload Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center hover:border-neon-pink/50 hover:bg-white/5 transition-all cursor-pointer group">
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-neon-pink/20 group-hover:text-neon-pink transition-colors">
                            <Upload className="w-8 h-8 text-white group-hover:text-neon-pink" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Drag & Drop Video</h3>
                        <p className="text-gray-400 text-sm mb-6">or click to browse files</p>
                        <p className="text-xs text-gray-500">MP4, MOV, AVI up to 10GB</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white font-kanit">Video Details</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Title</label>
                            <Input placeholder="Give your video a catchy title" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Description</label>
                            <textarea
                                className="w-full min-h-[120px] rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-neon-pink"
                                placeholder="Tell your viewers what this video is about..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Tags</label>
                            <Input placeholder="e.g., #exclusive, #4k, #photoshoot" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Category</label>
                                <select className="w-full h-12 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-neon-pink">
                                    <option>Select Category</option>
                                    <option>Amateur</option>
                                    <option>Professional</option>
                                    <option>Behind the Scenes</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Visibility</label>
                                <select className="w-full h-12 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-neon-pink">
                                    <option>Public (Everyone)</option>
                                    <option>Subscribers Only</option>
                                    <option>Pay Per View</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-lg font-bold text-white font-kanit mb-4">Thumbnail</h3>
                        <div className="aspect-video bg-black/40 rounded-lg border border-white/10 flex items-center justify-center mb-4">
                            <ImageIcon className="w-8 h-8 text-gray-600" />
                        </div>
                        <Button variant="outline" className="w-full">Upload Thumbnail</Button>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-lg font-bold text-white font-kanit mb-4">Monetization</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Enable Ads</span>
                                <input type="checkbox" className="rounded border-gray-600 bg-white/5 text-neon-pink focus:ring-neon-pink" />
                            </div>
                            <div className="space-y-2">
                                <span className="text-gray-300 text-sm">PPV Price ($)</span>
                                <Input type="number" placeholder="0.00" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="ghost" className="flex-1">Cancel</Button>
                        <Button className="flex-1">Publish</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
