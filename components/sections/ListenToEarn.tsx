"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionContent from "@/components/ui/SectionContent";
import { Wallet, SkipBack, SkipForward } from "lucide-react";
import ReactPlayer from "react-player";

// The playlist data
const TRACKS = [
    {
        title: "Aaj Phir De Zara Sharab",
        artist: "GSAA",
        youtubeId: "SSMYReBw3X0",
        artGradient: "from-indigo-600 via-purple-600 to-pink-500",
    },
    {
        title: "Peene De Sharab",
        artist: "GSAA",
        youtubeId: "rcqCEqMTzd0",
        artGradient: "from-red-600 via-orange-500 to-yellow-600",
    }
];

export default function ListenToEarn() {
    const [walletAmount, setWalletAmount] = useState(12);
    const [isPlaying, setIsPlaying] = useState(false); // Used to trigger wallet animations

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const track = TRACKS[currentTrackIndex];

    // Handle Wallet Earnings & Playback Synchronization
    useEffect(() => {
        // Wallet earning tick (runs exactly every 3 seconds)
        // Drops +₹1 into the wallet
        let walletInterval: NodeJS.Timeout;
        if (isPlaying) {
            walletInterval = setInterval(() => {
                setWalletAmount((prev) => prev >= 500 ? 5 : prev + 1);
            }, 3000);
        }

        return () => {
            if (walletInterval) clearInterval(walletInterval);
        };
    }, [isPlaying]);

    const handleNext = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
        setIsPlaying(true);
    };

    const handlePrev = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
        setIsPlaying(true);
    };

    const handleEnded = () => {
        handleNext(); // Auto skip to next track
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
                        {/* Visible YouTube Player Wrapper */}
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 mt-2 bg-black">
                            {/* @ts-ignore - react-player type definitions are outdated for this React version */}
                            {React.createElement(ReactPlayer as any, {
                                url: `https://www.youtube.com/watch?v=${track.youtubeId}`,
                                playing: isPlaying,
                                width: "100%",
                                height: "100%",
                                controls: true, // Show native YouTube controls
                                onPlay: () => setIsPlaying(true),
                                onPause: () => setIsPlaying(false),
                                onEnded: handleEnded,
                                config: {
                                    youtube: {
                                        playerVars: { modestbranding: 1, rel: 0 }
                                    }
                                }
                            })}
                        </div>

                        {/* Song Details */}
                        <div className="flex items-center justify-between mt-2">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{track.title}</h3>
                                <p className="text-white/60 text-sm">{track.artist}</p>
                            </div>
                        </div>

                        {/* Controls (Next / Prev only) */}
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
