"use client";

import { motion } from "framer-motion";
import SectionContent from "@/components/ui/SectionContent";
import { Play, Music, Film, Disc } from "lucide-react";
import Link from "next/link";

const songs = [
    { title: "Midnight City", artist: "M83", duration: "4:03" },
    { title: "Starboy", artist: "The Weeknd", duration: "3:50" },
    { title: "Nightcall", artist: "Kavinsky", duration: "4:18" },
];

export default function MediaSection() {
    return (
        <section className="relative min-h-screen py-24 flex items-center overflow-hidden bg-bg-navy">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl mix-blend-overlay" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl mix-blend-overlay" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

                <div className="order-2 lg:order-2">
                    <SectionContent
                        badge="ENTERTAINMENT"
                        title="Stream the Best. Anytime."
                        description="Experience a curated library of blockbusters and chart-topping hits. Watch exclusive premieres and listen to high-fidelity audio directly on the platform."
                        benefits={[
                            "Exclusive Movie Premieres",
                            "High-Fidelity Audio Streaming",
                            "Ad-free Experience",
                        ]}
                        ctaText="Start Streaming"
                        align="left"
                    />
                </div>

                {/* Visual Side (Left) - The Player UI */}
                <div className="relative order-1 lg:order-1 flex flex-col gap-8">

                    {/* Featured Movie Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/5 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <Link href="https://youtube.com" target="_blank" className="block relative aspect-video bg-black/50 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                            {/* Placeholder Backdrop - Dark Grayscale */}
                            <div className="absolute inset-0 bg-neutral-900 group-hover:scale-105 transition-transform duration-700 ease-out">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-black/80"></div>
                                {/* Simple Abstract Shape for placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                    <Film size={64} className="text-white" />
                                </div>
                            </div>

                            {/* Play Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                                    <Play size={24} className="text-white group-hover:text-black fill-current ml-1" />
                                </div>
                            </div>

                            <div className="absolute bottom-4 left-4">
                                <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Featured Movie</p>
                                <h3 className="text-xl font-bold text-white">Dahej Ka Chakravyu</h3>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Top Songs List */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <h4 className="text-white/80 font-medium flex items-center gap-2">
                                <Music size={16} /> Top Hits
                            </h4>
                        </div>

                        {songs.map((song, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                                className="group relative flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors cursor-pointer"
                            >
                                {/* Album Art Placeholder */}
                                <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center border border-white/5 relative overflow-hidden">
                                    <Disc size={20} className="text-white/40 group-hover:rotate-90 transition-transform duration-700" />
                                </div>

                                <div className="flex-1">
                                    <h5 className="text-white font-medium text-sm group-hover:text-white/90">{song.title}</h5>
                                    <p className="text-white/40 text-xs">{song.artist}</p>
                                </div>

                                <span className="text-white/20 text-xs mr-2">{song.duration}</span>

                                <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                                    <Play size={12} className="fill-current ml-0.5" />
                                </button>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
