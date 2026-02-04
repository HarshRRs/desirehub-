import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Play, TrendingUp, Star, Crown } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-midnight">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-deep/20 via-midnight to-midnight z-0" />
        <div className="absolute inset-0 z-[-1]">
          <Image
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop"
            alt="Hero Background"
            fill
            priority
            className="object-cover opacity-20 mix-blend-overlay"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 px-4 text-center container mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full border-neon-pink/30 bg-neon-pink/10 backdrop-blur-sm">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-neon-pink"></span>
              <span className="relative inline-flex w-2 h-2 rounded-full bg-neon-pink"></span>
            </span>
            <span className="text-sm font-medium text-neon-pink">Premium Content Live Now</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight text-transparent md:text-7xl lg:text-8xl bg-clip-text bg-gradient-to-b from-white to-gray-400 font-kanit drop-shadow-2xl">
            Experience the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-deep via-neon-pink to-crimson animate-pulse">
              Ultimate Desire
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-400 md:text-xl">
            The world's most exclusive adult entertainment platform.
            Stream 4K videos, connect with top creators, and explore your deepest fantasies.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 text-lg h-14 px-10 group">
              <Play className="w-5 h-5 fill-current group-hover:animate-ping" />
              <span className="relative">
                Start Watching Free
              </span>
            </Button>
            <Button variant="outline" size="lg" className="gap-2 text-lg h-14 px-10 group border-gold/50 hover:border-gold hover:bg-gold/10 text-gold hover:text-gold">
              <Crown className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(242,193,78,0.8)] transition-all" />
              View Premium Plans
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 rounded-full border-white/20 flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Trending Section Preview */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-neon-pink" />
            <h2 className="text-3xl font-bold text-white font-kanit">Trending Now</h2>
          </div>
          <Button variant="link" className="text-neon-pink">View All</Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group relative aspect-video bg-gray-900 rounded-xl overflow-hidden border border-white/5 hover:border-neon-pink/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h3 className="text-white font-bold text-lg">Exclusive Scene {i}</h3>
                  <p className="text-gray-300 text-sm">Top Creator • 12K views</p>
                </div>
              </div>
              {/* Placeholder for thumbnail */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-600 group-hover:scale-105 transition-transform duration-500 -z-10">
                <Play className="w-12 h-12 opacity-20" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
