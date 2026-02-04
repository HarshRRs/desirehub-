import { Button } from "@/components/ui/Button";
import { Upload, DollarSign, Eye, Users, TrendingUp } from "lucide-react";

export default function CreatorDashboard() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white font-kanit mb-2">Creator Studio</h1>
                    <p className="text-gray-400">Manage your content and earnings.</p>
                </div>
                <Button className="gap-2">
                    <Upload className="w-4 h-4" /> Upload New Video
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Revenue", value: "$12,450", icon: DollarSign, color: "text-green-400" },
                    { label: "Total Views", value: "1.2M", icon: Eye, color: "text-blue-400" },
                    { label: "Subscribers", value: "45.2K", icon: Users, color: "text-neon-pink" },
                    { label: "Growth", value: "+12%", icon: TrendingUp, color: "text-violet-400" },
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400 text-sm">{stat.label}</span>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <div className="text-3xl font-bold text-white font-kanit">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Recent Uploads */}
            <section>
                <h2 className="text-xl font-bold text-white font-kanit mb-6">Recent Uploads</h2>
                <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-sm">
                            <tr>
                                <th className="p-4 font-medium">Video</th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Views</th>
                                <th className="p-4 font-medium">Earnings</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[1, 2, 3, 4].map((i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-16 h-10 bg-gray-800 rounded overflow-hidden flex-shrink-0" />
                                            <span className="text-white font-medium">Premium Scene {i}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-400 text-sm">Oct 24, 2023</td>
                                    <td className="p-4 text-gray-300">12.5K</td>
                                    <td className="p-4 text-green-400">$145.00</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs border border-green-500/30">
                                            Published
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">Edit</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
