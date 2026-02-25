"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Play, Film, Disc, Mic2, Star, Youtube, Music, ArrowRight, Ticket } from "lucide-react";
import Image from "next/image";

/* ─────────────────── SHARED COMPONENTS ─────────────────── */

function SectionHeader({ title, subtitle, align = "center" }: { title: string; subtitle: string; align?: "center" | "left" }) {
    return (
        <div className={`mb-16 relative z-10 ${align === "center" ? "text-center" : "text-left"}`}>
            <motion.h2
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-4 font-heading bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-600 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]"
            >
                {title}
            </motion.h2>
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: align === "center" ? 100 : 200 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className={`h-1 bg-amber-500 mb-4 ${align === "center" ? "mx-auto" : ""}`}
            />
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 max-w-2xl font-light tracking-widest uppercase text-sm"
            >
                {subtitle}
            </motion.p>
        </div>
    );
}

/* ─────────────────── HERO SECTION (SPOTLIGHT) ─────────────────── */

function EntertainmentHero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const moveX = clientX - window.innerWidth / 2;
        const moveY = clientY - window.innerHeight / 2;
        setMousePosition({ x: moveX, y: moveY });
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20"
        >
            {/* Dynamic Spotlight */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                    background: `radial-gradient(circle 600px at ${50 + mousePosition.x * 0.05}% ${50 + mousePosition.y * 0.05}%, rgba(255, 255, 255, 0.15), transparent)`,
                }}
            />

            {/* Curtain / Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-30 pointer-events-none mix-blend-overlay" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-3 border border-amber-500/30 bg-amber-500/5 px-6 py-2 rounded-full mb-8 backdrop-blur-sm">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-amber-200 text-xs font-mono tracking-[0.2em] uppercase">Premier Entertainment</span>
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    </div>

                    <h1 className="text-7xl md:text-9xl font-bold font-heading mb-6 leading-tight text-white tracking-tighter">
                        <span className="block drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">STUDIO</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-700">ORIGINALS</span>
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
                        Immersive storytelling and sonic mastery.
                        Experience the next generation of GSAA entertainment.
                    </p>

                    <div className="flex justify-center gap-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-black font-bold rounded-sm hover:bg-amber-400 transition-colors flex items-center gap-2"
                        >
                            <Play className="w-5 h-5 fill-black" />
                            LATEST PREMIERE
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 border border-white/20 text-white font-bold rounded-sm hover:bg-white/10 transition-colors backdrop-blur-md"
                        >
                            BROWSE ARCHIVE
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Floating Dust Particles (simulated with CSS for performance) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-float-particle" />
                <div className="absolute top-3/4 left-2/3 w-3 h-3 bg-amber-500/10 rounded-full animate-float-particle" style={{ animationDelay: "2s" }} />
            </div>
        </section>
    );
}

/* ─────────────────── MOVIES SECTION (FILM STRIP) ─────────────────── */

function MoviesSection() {
    // Fake Movie Data
    const movies = [
        { title: "Neon Horizon", genre: "Sci-Fi Thriller", duration: "1h 45m", color: "from-cyan-500 to-blue-600" },
        { title: "Dust & Glory", genre: "Post-Apocalyptic", duration: "2h 10m", color: "from-orange-500 to-red-600" },
        { title: "The Quantum Heist", genre: "Action", duration: "1h 55m", color: "from-purple-500 to-pink-600" },
        { title: "Silent Echoes", genre: "Mystery", duration: "2h 05m", color: "from-emerald-500 to-teal-600" },
        { title: "Cyber Protocol", genre: "Documentary", duration: "1h 30m", color: "from-blue-500 to-indigo-600" },
    ];

    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden">
            <div className="container mx-auto px-6 mb-12">
                <SectionHeader title="CINEMA" subtitle="Feature Films & Originals" align="left" />
            </div>

            {/* Scrolling Film Strip Container */}
            <div className="relative w-full overflow-x-hidden">
                <div className="flex gap-8 animate-film-scroll hover:[animation-play-state:paused] w-[200%] pl-6">
                    {/* Duplicate list for seamless loop */}
                    {[...movies, ...movies].map((movie, i) => (
                        <div key={i} className="relative group flex-shrink-0 w-[300px] md:w-[400px] aspect-[2/3] bg-gray-900 rounded-sm overflow-hidden border-x-8 border-black shadow-2xl">
                            {/* Film Sprocket Holes (Visual Only) */}
                            <div className="absolute left-0 top-0 bottom-0 w-4 bg-black flex flex-col justify-between py-2 z-20">
                                {Array.from({ length: 10 }).map((_, j) => (
                                    <div key={j} className="w-2 h-3 bg-white/10 rounded-sm mx-auto" />
                                ))}
                            </div>
                            <div className="absolute right-0 top-0 bottom-0 w-4 bg-black flex flex-col justify-between py-2 z-20">
                                {Array.from({ length: 10 }).map((_, j) => (
                                    <div key={j} className="w-2 h-3 bg-white/10 rounded-sm mx-auto" />
                                ))}
                            </div>

                            {/* Movie Poster Placeholder */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${movie.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

                            {/* "Cinema Mode" Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 z-10 bg-gradient-to-t from-black via-black/50 to-transparent">
                                <span className="text-xs font-mono text-gray-400 mb-1">{movie.genre} // {movie.duration}</span>
                                <h3 className="text-3xl font-bold text-white mb-4 leading-none">{movie.title.toUpperCase()}</h3>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-sm flex items-center justify-center gap-2 transition-colors uppercase text-sm tracking-wide"
                                >
                                    <Youtube size={16} />
                                    Watch Trailer
                                </motion.button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── MUSIC SECTION (VINYL) ─────────────────── */

function MusicSection() {
    const albums = [
        { title: "Midnight Validations", artist: "The Validators", color: "bg-purple-500" },
        { title: "Gas Fees Blues", artist: "Crypto King", color: "bg-blue-500" },
        { title: "Mint Condition", artist: "NFT Soul", color: "bg-emerald-500" },
    ];

    return (
        <section className="py-32 bg-black relative">
            <div className="container mx-auto px-6">
                <SectionHeader title="STUDIO SESSIONS" subtitle="Original Soundtracks & Albums" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
                    {albums.map((album, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-zinc-900/50 p-8 rounded-xl border border-white/5 hover:border-white/20 transition-all group"
                        >
                            {/* Vinyl Record Visualization */}
                            <div className="relative w-64 h-64 mx-auto mb-8 perspective-1000">
                                {/* Record Sleeve (Back) */}
                                <div className={`absolute inset-0 ${album.color} opacity-20 rounded-sm transform rotate-3 scale-105 transition-transform group-hover:rotate-6 group-hover:translate-x-4`} />

                                {/* Vinyl Disc */}
                                <div className="absolute inset-0 rounded-full bg-black border border-gray-800 shadow-2xl flex items-center justify-center group-hover:animate-vinyl-spin">
                                    {/* Grooves */}
                                    <div className="absolute inset-2 rounded-full border border-gray-800/50" />
                                    <div className="absolute inset-4 rounded-full border border-gray-800/50" />
                                    <div className="absolute inset-8 rounded-full border border-gray-800/50" />
                                    <div className="absolute inset-16 rounded-full border border-gray-800/50" />

                                    {/* Label */}
                                    <div className={`w-24 h-24 rounded-full ${album.color} flex items-center justify-center`}>
                                        <div className="w-2 h-2 bg-black rounded-full" />
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-1">{album.title}</h3>
                                <p className="text-gray-500 mb-6">{album.artist}</p>

                                <div className="flex justify-center gap-4">
                                    <button className="p-3 bg-white text-black rounded-full hover:bg-amber-400 transition-colors">
                                        <Play className="w-5 h-5 fill-current" />
                                    </button>
                                    <button className="p-3 border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors">
                                        <Disc className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── UPCOMING SECTION (BLUR REVEAL) ─────────────────── */

function UpcomingSection() {
    return (
        <section className="py-32 bg-zinc-950 relative overflow-hidden">
            {/* Background spotlight */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div className="text-left">
                        <h2 className="text-5xl font-bold text-white mb-2 font-heading">COMING SOON</h2>
                        <p className="text-gray-500 tracking-widest uppercase">Production Pipeline 2026</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {[
                        { title: "PROJECT: ETHER", type: "Feature Film", date: "Coming Fall 2026", image: "bg-purple-900" },
                        { title: "SONIC FRONTIERS", type: "Album Drop", date: "Late 2026", image: "bg-indigo-900" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ filter: "blur(20px)", opacity: 0 }}
                            whileInView={{ filter: "blur(0px)", opacity: 1 }}
                            viewport={{ margin: "-100px" }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            className="relative aspect-video bg-black rounded-lg overflow-hidden group cursor-pointer"
                        >
                            {/* Placeholder Image */}
                            <div className={`absolute inset-0 ${item.image} opacity-50 transition-transform duration-700 group-hover:scale-110`} />

                            {/* Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 group-hover:bg-black/60 transition-colors backdrop-blur-[2px] group-hover:backdrop-blur-none">
                                <span className="px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-sm mb-4">
                                    {item.type.toUpperCase()}
                                </span>
                                <h3 className="text-4xl font-bold text-white mb-2 tracking-tighter">{item.title}</h3>
                                <p className="text-gray-300 font-mono text-sm">{item.date}</p>
                            </div>

                            {/* Ticket Icon on Hover */}
                            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                <div className="flex items-center gap-2 text-amber-400">
                                    <Ticket size={20} />
                                    <span className="text-sm font-bold">GET NOTIFIED</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── MAIN PAGE COMPONENT ─────────────────── */

export default function EntertainmentPage() {
    return (
        <main className="bg-black min-h-screen text-white overflow-x-hidden selection:bg-amber-500/30">
            <EntertainmentHero />
            <MoviesSection />
            <MusicSection />
            <UpcomingSection />

            {/* Simple Footer */}
            <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
                <p>&copy; 2026 GSAA Studios. All rights reserved.</p>
            </footer>
        </main>
    );
}
