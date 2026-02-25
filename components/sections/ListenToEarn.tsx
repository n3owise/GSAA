"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionContent from "@/components/ui/SectionContent";
import { Play, Disc, Wallet, IndianRupee, SkipBack, SkipForward, Pause } from "lucide-react";

// The playlist data
const TRACKS = [
    {
        title: "Aaj Phir De Zara Sharab",
        artist: "GSAA",
        audioSrc: "https://res.cloudinary.com/dgybminsu/video/upload/v1772026302/Aaj_Phir_De_Zara_Sharab_jcgksb.mp3",
        artGradient: "from-indigo-600 via-purple-600 to-pink-500",
    },
    {
        title: "Peene De Sharab",
        artist: "GSAA",
        audioSrc: "https://res.cloudinary.com/dgybminsu/video/upload/v1772026302/Peene_De_Sharab_fdf3en.mp3",
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
    const [isPlaying, setIsPlaying] = useState(false); // Start paused

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0); // in seconds
    const [duration, setDuration] = useState(0);

    const audioRef = useRef<HTMLAudioElement>(null);
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

    // Handle play/pause commands based on isPlaying state
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => {
                    console.error("Playback failed (possibly due to browser autoplay policies)", e);
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrackIndex]);

    const handleNext = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
        setIsPlaying(true);
    };

    const handlePrev = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
        setIsPlaying(true);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setElapsedTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleAudioEnded = () => {
        handleNext(); // Auto skip to next track
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    }

    // Calculate progress percentage
    const progressPercent = duration > 0 ? (elapsedTime / duration) * 100 : 0;

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
                        {/* Hidden Audio Element */}
                        <audio
                            ref={audioRef}
                            src={track.audioSrc}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onEnded={handleAudioEnded}
                            onError={(e) => console.log("Audio failed to load:", e)}
                        />

                        {/* Top Bar - Wallet */}
                        <div className="flex justify-between items-center w-full relative z-30">
                            <span className="text-white/50 text-xs font-semibold tracking-wider">NOW PLAYING</span>
                            <motion.div
                                key={walletAmount} // This forces a re-render/re-mount animation when the amount changes!
                                initial={{ scale: 1.2, backgroundColor: "rgba(250, 204, 21, 0.4)" }} // Flash yellow
                                animate={{ scale: 1, backgroundColor: "rgba(0, 0, 0, 0.6)" }} // Fade back to black
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="flex items-center justify-center gap-2 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg min-w-[70px]"
                            >
                                <Wallet size={14} className="text-yellow-400 shrink-0" />
                                <span className="text-yellow-400 font-bold font-mono text-sm tracking-widest leading-none mt-0.5 w-[3ch] text-right">
                                    {walletAmount}
                                </span>
                            </motion.div>
                        </div>

                        {/* Album Art area with sprouting coins */}
                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 group mt-2 transition-all duration-700">
                            {/* Dynamic Album Art Base */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${track.artGradient} transition-colors duration-1000`} />
                            {/* Overlay lighting */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.4),_transparent_50%)]" />

                            {/* Spinning Vinyl */}
                            <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay opacity-40">
                                <Disc size={160} className={isPlaying ? "animate-spin [animation-duration:10s]" : ""} />
                            </div>

                            {/* Spawning Coins Animation */}
                            {isPlaying && (
                                <div className="absolute inset-0 pointer-events-none">
                                    {[
                                        { left: "30%", delay: "0s" },
                                        { left: "50%", delay: "1s" },
                                        { left: "70%", delay: "2s" },
                                    ].map((path, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                left: path.left,
                                                bottom: "15%",
                                                animationDelay: path.delay, // staggered floating intervals
                                            } as React.CSSProperties}
                                            className="absolute w-8 h-8 rounded-full bg-yellow-400 border border-yellow-200 flex items-center justify-center text-black shadow-[0_0_20px_rgba(250,204,21,0.6)] animate-listen-coin opacity-0 pointer-events-none z-20"
                                        >
                                            <IndianRupee size={16} strokeWidth={3} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Song Details & Visualizer */}
                        <div className="flex items-center justify-between mt-2">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1 line-clamp-1">{track.title}</h3>
                                <p className="text-white/60 text-sm">{track.artist}</p>
                            </div>

                            {/* Animated Equalizer */}
                            <div className="flex items-end gap-1 h-8">
                                <div className={`w-[5px] bg-yellow-400 rounded-t-sm origin-bottom ${isPlaying ? 'animate-eq-1' : 'scale-y-[0.3] transition-transform'}`} />
                                <div className={`w-[5px] bg-yellow-400 rounded-t-sm origin-bottom ${isPlaying ? 'animate-eq-2' : 'scale-y-[0.3] transition-transform'}`} />
                                <div className={`w-[5px] bg-yellow-400 rounded-t-sm origin-bottom ${isPlaying ? 'animate-eq-3' : 'scale-y-[0.3] transition-transform'}`} />
                                <div className={`w-[5px] bg-yellow-400 rounded-t-sm origin-bottom ${isPlaying ? 'animate-eq-4' : 'scale-y-[0.3] transition-transform'}`} />
                            </div>
                        </div>

                        {/* Scrubber */}
                        <div className="w-full mt-2 group relative">
                            {/* Drag invisible hitbox could go here */}
                            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden mb-2 cursor-pointer transition-colors hover:bg-white/30">
                                <div
                                    className="h-full bg-white rounded-full relative transition-[width] duration-100 ease-linear"
                                    style={{ width: `${progressPercent}%` }}
                                >
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] -mr-1.5" />
                                </div>
                            </div>
                            <div className="flex justify-between text-[11px] text-white/40 font-bold uppercase tracking-wider">
                                <span>{formatTime(elapsedTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center gap-8 text-white mt-1 mb-2">
                            <button
                                onClick={handlePrev}
                                className="text-white/60 hover:text-white transition-colors active:scale-95"
                            >
                                <SkipBack size={28} fill="currentColor" />
                            </button>
                            <button
                                onClick={togglePlay}
                                className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                            >
                                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                            </button>
                            <button
                                onClick={handleNext}
                                className="text-white/60 hover:text-white transition-colors active:scale-95"
                            >
                                <SkipForward size={28} fill="currentColor" />
                            </button>
                        </div>

                    </motion.div>
                </div>

            </div>
        </section>
    );
}
