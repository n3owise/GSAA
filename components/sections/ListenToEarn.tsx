"use client";
import React from 'react';

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionContent from "@/components/ui/SectionContent";
import { Play, Disc, Wallet, IndianRupee, SkipBack, SkipForward, Pause } from "lucide-react";
import ReactPlayer from 'react-player';

// The playlist data
const TRACKS = [
    {
        title: "Aaj Phir De Zara Sharab",
        artist: "GSAA",
        youtubeId: "SSMYReBw3X0",
        artGradient: "from-indigo-600 via-purple-600 to-pink-500",
    },
    {
        title: "Peene de sharab",
        artist: "GSAA",
        youtubeId: "rcqCEqMTzd0",
        artGradient: "from-red-600 via-orange-500 to-yellow-600",
    }
];

// Helper to format seconds to M:SS
const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export default function ListenToEarn() {
    const [walletAmount, setWalletAmount] = useState(12);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const track = TRACKS[currentTrackIndex];

    // Handle Wallet Earnings (Simplified to just run while component is mounted)
    useEffect(() => {
        const walletInterval = setInterval(() => {
            setWalletAmount((prev) => prev >= 500 ? 5 : prev + 1);
        }, 3000);

        return () => clearInterval(walletInterval);
    }, []);

    const handleNext = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
        setIsPlaying(true);
    };

    const handlePrev = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
        setIsPlaying(true);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <section className="relative min-h-screen py-24 flex items-center overflow-hidden bg-bg-dark">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl mix-blend-overlay" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                {/* Content Side */}
                <div className="order-2 lg:order-1">
                    <SectionContent
                        badge="LISTEN TO EARN"
                        title="Earn Rewards Listening to Music"
                        description="Transform your daily vibe into earning opportunities. Discover incredible artists, stream high-fidelity audio, and accumulate literal rewards for every minute you listen."
                        benefits={[
                            "Earn coins for every song streamed",
                            "Curated high-fidelity audio library",
                            "Ad-free premium listening experience",
                        ]}
                        ctaText="Start Listening"
                        align="left"
                    />
                </div>

                {/* Visual Side - Music Player UI */}
                <div className="relative order-1 lg:order-2 flex justify-center perspective-1000">
                    <motion.div
                        className="relative w-full max-w-sm glass-panel rounded-[2.5rem] shadow-2xl p-6 overflow-hidden flex flex-col gap-6 border border-white/10 bg-black/40 backdrop-blur-xl"
                        initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Visible YouTube Player with Pointer-Events Blocked to maintain custom cursor */}
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 mt-2 bg-black">

                            {/* Interactive Overlay - Captures mouse for smooth cursor and handles clicks */}
                            <div
                                className="absolute inset-0 z-20 cursor-none flex items-center justify-center group bg-black/10 hover:bg-black/20 transition-colors"
                                onClick={togglePlay}
                            >
                                <div className={`w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 ${!isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'}`}>
                                    {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} className="translate-x-1" fill="currentColor" />}
                                </div>
                            </div>

                            {/* Target Player Frame */}
                            <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
                                {React.createElement(ReactPlayer as any, {
                                    url: `https://www.youtube.com/watch?v=${track.youtubeId}`,
                                    playing: isPlaying,
                                    width: "100%",
                                    height: "100%",
                                    controls: false,
                                    onEnded: handleNext,
                                    config: {
                                        youtube: {
                                            playerVars: { modestbranding: 1, rel: 0, disablekb: 1 }
                                        }
                                    }
                                })}
                            </div>
                        </div>

                        {/* Song Details */}
                        <div className="flex items-center justify-between mt-4">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{track.title}</h3>
                                <p className="text-white/60 text-sm">{track.artist}</p>
                            </div>
                        </div>

                        {/* Controls (Next/Prev Songs) */}
                        <div className="flex items-center justify-center gap-12 text-white mt-4 mb-2">
                            <button
                                onClick={handlePrev}
                                className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors active:scale-95"
                            >
                                <SkipBack size={24} fill="currentColor" />
                                <span className="text-[10px] font-bold tracking-widest uppercase">Prev Track</span>
                            </button>

                            <button
                                onClick={handleNext}
                                className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors active:scale-95"
                            >
                                <SkipForward size={24} fill="currentColor" />
                                <span className="text-[10px] font-bold tracking-widest uppercase">Next Track</span>
                            </button>
                        </div>

                    </motion.div>
                </div>

            </div>
        </section>
    );
}
