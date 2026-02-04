"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { Upload, Video, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function UploadVideoPage() {
    const router = useRouter();
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Amateur",
        isPremium: false,
    });
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [error, setError] = useState("");

    const categories = [
        "Amateur", "MILF", "Teen (18+)", "Hentai", "VR", "Anal",
        "Lesbian", "BBW", "Solo", "Trans", "Group", "Fetish"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!videoFile) {
            setError("Please select a video file");
            return;
        }

        setUploading(true);
        setError("");
        setProgress(0);

        try {
            const data = new FormData();
            data.append("video", videoFile);
            if (thumbnailFile) data.append("thumbnail", thumbnailFile);
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("category", formData.category);
            data.append("isPremium", String(formData.isPremium));

            const response = await fetch("/api/upload/video", {
                method: "POST",
                body: data,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Upload failed");
            }

            // Success!
            alert("Video uploaded successfully!");
            router.push("/dashboard/creator/content");
        } catch (err: any) {
            setError(err.message || "Failed to upload video");
        } finally {
            setUploading(false);
            setProgress(0);
        }
    };

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white font-kanit mb-2">Upload New Video</h1>
                    <p className="text-gray-400">Share your content with your subscribers</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Video File Upload */}
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                        <label className="block text-white font-semibold mb-4">Video File *</label>
                        {videoFile ? (
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Video className="w-6 h-6 text-neon-pink" />
                                    <div>
                                        <p className="text-white font-medium">{videoFile.name}</p>
                                        <p className="text-gray-400 text-sm">{(videoFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setVideoFile(null)}
                                    className="text-gray-400 hover:text-red-400 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-neon-pink/50 transition-colors">
                                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                                <span className="text-gray-400">Click to select video file</span>
                                <span className="text-gray-500 text-sm mt-1">MP4, WebM, or MOV (max 500MB)</span>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>

                    {/* Thumbnail Upload */}
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                        <label className="block text-white font-semibold mb-4">Thumbnail (Optional)</label>
                        {thumbnailFile ? (
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <ImageIcon className="w-6 h-6 text-neon-pink" />
                                    <div>
                                        <p className="text-white font-medium">{thumbnailFile.name}</p>
                                        <p className="text-gray-400 text-sm">{(thumbnailFile.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setThumbnailFile(null)}
                                    className="text-gray-400 hover:text-red-400 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-neon-pink/50 transition-colors">
                                <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                                <span className="text-gray-400">Click to select thumbnail</span>
                                <span className="text-gray-500 text-sm mt-1">JPG, PNG (recommended: 1280x720)</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>

                    {/* Title */}
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                        <label className="block text-white font-semibold mb-4">Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            placeholder="Enter video title..."
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-pink transition-all"
                        />
                    </div>

                    {/* Description */}
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                        <label className="block text-white font-semibold mb-4">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe your video..."
                            rows={4}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-pink transition-all resize-none"
                        />
                    </div>

                    {/* Category */}
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                        <label className="block text-white font-semibold mb-4">Category *</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-pink transition-all"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat} className="bg-midnight">
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Premium Toggle */}
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isPremium}
                                onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
                                className="w-5 h-5 rounded border-white/10 bg-white/5 text-neon-pink focus:ring-neon-pink focus:ring-offset-0"
                            />
                            <div>
                                <span className="text-white font-semibold">Premium Content</span>
                                <p className="text-gray-400 text-sm">Only subscribers can view this video</p>
                            </div>
                        </label>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500">
                            {error}
                        </div>
                    )}

                    {/* Upload Progress */}
                    {uploading && (
                        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-white font-semibold">Uploading...</span>
                                <span className="text-gray-400">{progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-violet-deep to-neon-pink transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => router.back()}
                            disabled={uploading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={uploading || !videoFile}
                            className="bg-gradient-to-r from-violet-deep to-neon-pink disabled:opacity-50"
                        >
                            {uploading ? "Uploading..." : "Upload Video"}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
