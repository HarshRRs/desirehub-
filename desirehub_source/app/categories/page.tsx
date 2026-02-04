import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export default function CategoriesPage() {
    const categories = [
        { name: "Amateur", count: "12.5K videos", image: "bg-gradient-to-br from-purple-600 to-blue-600" },
        { name: "Asian", count: "8.2K videos", image: "bg-gradient-to-br from-red-600 to-orange-600" },
        { name: "Ebony", count: "5.1K videos", image: "bg-gradient-to-br from-yellow-600 to-red-600" },
        { name: "Latina", count: "9.3K videos", image: "bg-gradient-to-br from-green-600 to-teal-600" },
        { name: "Milf", count: "15K videos", image: "bg-gradient-to-br from-pink-600 to-rose-600" },
        { name: "Teen (18+)", count: "10K videos", image: "bg-gradient-to-br from-blue-600 to-cyan-600" },
        { name: "Hentai", count: "3.4K videos", image: "bg-gradient-to-br from-indigo-600 to-purple-600" },
        { name: "VR", count: "1.2K videos", image: "bg-gradient-to-br from-gray-600 to-black" },
        { name: "Massage", count: "2.1K videos", image: "bg-gradient-to-br from-teal-600 to-emerald-600" },
        { name: "POV", count: "18K videos", image: "bg-gradient-to-br from-orange-600 to-yellow-600" },
        { name: "Lesbian", count: "7.5K videos", image: "bg-gradient-to-br from-rose-600 to-pink-600" },
        { name: "Anal", count: "6.2K videos", image: "bg-gradient-to-br from-cyan-600 to-blue-600" },
    ];

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 pt-24 pb-20">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white font-kanit mb-4">Browse Categories</h1>
                    <p className="text-gray-400">Explore our vast collection of premium content sorted by your desires.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            href={`/search?category=${cat.name.toLowerCase()}`}
                            className="group relative aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-neon-pink/50 transition-all"
                        >
                            {/* Placeholder Background */}
                            <div className={`absolute inset-0 ${cat.image} opacity-50 group-hover:scale-110 transition-transform duration-500`} />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                <h3 className="text-2xl font-bold text-white font-kanit mb-1 group-hover:scale-110 transition-transform">{cat.name}</h3>
                                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{cat.count}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
