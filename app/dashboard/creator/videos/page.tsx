import { Button } from "@/components/ui/Button";
import { Edit, Trash2, Eye, MoreVertical } from "lucide-react";

export default function VideoManagerPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white font-kanit mb-2">Content Manager</h1>
                    <p className="text-gray-400">Edit, delete, and manage your videos.</p>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search videos..."
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-pink"
                    />
                    <Button>Filter</Button>
                </div>
            </div>

            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400 text-sm">
                        <tr>
                            <th className="p-4 font-medium">Video</th>
                            <th className="p-4 font-medium">Visibility</th>
                            <th className="p-4 font-medium">Date</th>
                            <th className="p-4 font-medium">Views</th>
                            <th className="p-4 font-medium">Comments</th>
                            <th className="p-4 font-medium">Likes</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-24 h-14 bg-gray-800 rounded overflow-hidden flex-shrink-0 relative">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Eye className="w-4 h-4 text-white/50" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium line-clamp-1">My Awesome Video Title {i}</p>
                                            <p className="text-xs text-gray-500">10:24 • HD</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs border border-green-500/30">
                                        Public
                                    </span>
                                </td>
                                <td className="p-4 text-gray-400 text-sm">Oct 24, 2023</td>
                                <td className="p-4 text-gray-300">12.5K</td>
                                <td className="p-4 text-gray-300">45</td>
                                <td className="p-4 text-gray-300">1.2K</td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 text-gray-400 hover:text-white" title="Edit">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-crimson" title="Delete">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-white">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
