"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionContent from "@/components/ui/SectionContent";
import { SkipBack, SkipForward, Music, IndianRupee, Wallet } from "lucide-react";

const TRACKS = [
    { title: "Aaj Phir De Zara Sharab", artist: "GSAA", youtubeId: "SSMYReBw3X0" },
    { title: "Peene De Sharab", artist: "GSAA", youtubeId: "rcqCEqMTzd0" },
];

interface Coin { id: number; cleft: string; ctop: string; }

export default function ListenToEarn() {
    const [walletAmount, setWalletAmount] = useState(12);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [iframeSrc, setIframeSrc] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [coins, setCoins] = useState<Coin[]>([]);
    const coinTimer = useRef<ReturnType<typeof setInterval> | null>(null);

    const track = TRACKS[currentTrack];

    const buildSrc = (id: string) =>
        `https://www.youtube.com/embed/${id}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`;

    /* ── Coin animation loop — 1 coin every 2 s while playing ── */
    useEffect(() => {
        if (coinTimer.current) clearInterval(coinTimer.current);
        if (!isPlaying) return;

        const spawnCoin = () => {
            const id = Date.now();
            const cleft = `${25 + Math.random() * 50}%`;
            const ctop = `${30 + Math.random() * 40}%`;

            setCoins(prev => [...prev, { id, cleft, ctop }]);

            // Wallet ticks ~85% through the 2.5 s shoot-coin animation
            setTimeout(() => setWalletAmount(p => p >= 999 ? 12 : p + 1), 2125);

            // Clean up coin DOM element after animation ends
            setTimeout(() => setCoins(prev => prev.filter(c => c.id !== id)), 2500);
        };

        spawnCoin(); // fire immediately on start
        coinTimer.current = setInterval(spawnCoin, 2000); // then every 2 s

        return () => { if (coinTimer.current) clearInterval(coinTimer.current); };
    }, [isPlaying]);

    /* ── Handlers ── */
    const handlePlay = () => {
        setIframeSrc(buildSrc(track.youtubeId));
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIframeSrc(null);
        setIsPlaying(false);
    };

    const switchTrack = (dir: 1 | -1) => {
        const next = (currentTrack + dir + TRACKS.length) % TRACKS.length;
        setCurrentTrack(next);
        if (isPlaying) {
            setIframeSrc(buildSrc(TRACKS[next].youtubeId));
        } else {
            setIframeSrc(null);
        }
    };

    return (
        <section className="relative min-h-screen py-24 flex items-center overflow-hidden bg-bg-dark">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

                {/* Text */}
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
                        ctaLink="/earnings#listen-section"
                        align="left"
                    />
                </div>

                {/* Player */}
                <div className="relative order-1 lg:order-2 flex justify-center perspective-1000">
                    <motion.div
                        className="relative w-full max-w-sm rounded-[2.5rem] shadow-2xl p-5 flex flex-col gap-4 border border-white/10 bg-black/50 backdrop-blur-xl z-10"
                        initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* ── Header bar with wallet receiver ── */}
                        <div className="flex items-center justify-between px-2 mb-1">
                            <div className="flex items-center gap-1.5">
                                <Music size={12} className="text-white/40" />
                                <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">GSAA Player</span>
                            </div>

                            {/* Wallet badge — coins fly INTO here */}
                            <motion.div
                                key={walletAmount}
                                initial={{ scale: 1.25, borderColor: "rgba(250,204,21,0.8)" }}
                                animate={{ scale: 1, borderColor: "rgba(255,255,255,0.1)" }}
                                transition={{ duration: 0.35 }}
                                className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border px-3 py-1.5 rounded-full"
                            >
                                <Wallet size={12} className="text-yellow-400 shrink-0" />
                                <span className="text-yellow-400 text-xs font-black font-mono tracking-wider">₹{walletAmount}</span>
                            </motion.div>
                        </div>

                        {/* ── Video screen (coin source + iframe) ── */}
                        <div
                            className="relative w-full rounded-2xl overflow-hidden bg-black border border-white/10"
                            style={{ paddingTop: "56.25%" }}
                        >
                            {/* YouTube thumbnail */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`https://img.youtube.com/vi/${track.youtubeId}/hqdefault.jpg`}
                                alt={track.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Live iframe — mounted only after play click */}
                            {iframeSrc && (
                                <iframe
                                    key={iframeSrc}
                                    className="absolute inset-0 w-full h-full z-10"
                                    src={iframeSrc}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            )}

                            {/* ── Flying coins (spawn from inside video, fly to wallet) ── */}
                            <AnimatePresence>
                                {coins.map(coin => (
                                    <div
                                        key={coin.id}
                                        style={{
                                            "--curve-left": coin.cleft,
                                            "--curve-top": coin.ctop,
                                        } as React.CSSProperties}
                                        className="absolute w-6 h-6 rounded-full bg-yellow-400 border border-yellow-200 flex items-center justify-center text-black shadow-[0_0_15px_rgba(250,204,21,0.7)] animate-shoot-coin opacity-0 pointer-events-none z-20"
                                    >
                                        <IndianRupee size={12} strokeWidth={3} />
                                    </div>
                                ))}
                            </AnimatePresence>

                            {/* Tap-to-play overlay */}
                            <AnimatePresence>
                                {!isPlaying && (
                                    <motion.div
                                        key="overlay"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, transition: { duration: 0.3 } }}
                                        className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-black/60 backdrop-blur-[2px] cursor-pointer"
                                        onClick={handlePlay}
                                    >
                                        {/* Pulsing rings */}
                                        <div className="relative flex items-center justify-center">
                                            <motion.span
                                                className="absolute w-20 h-20 rounded-full bg-white/15"
                                                animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                                                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                                            />
                                            <motion.span
                                                className="absolute w-20 h-20 rounded-full bg-white/15"
                                                animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                                                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut", delay: 0.7 }}
                                            />
                                            <motion.div
                                                className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.5)] relative z-10"
                                                whileHover={{ scale: 1.08 }}
                                                whileTap={{ scale: 0.93 }}
                                            >
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="black" className="translate-x-[2px]">
                                                    <path d="M5 3.868C5 2.651 6.384 1.956 7.35 2.688L19.49 11.82C20.268 12.408 20.268 13.592 19.49 14.18L7.35 23.312C6.384 24.044 5 23.349 5 22.132V3.868Z" />
                                                </svg>
                                            </motion.div>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-white text-sm font-bold">Tap to Play</p>
                                            <p className="text-white/50 text-xs mt-0.5">earn rewards while you listen</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Track info */}
                        <div className="flex flex-col items-center text-center px-2">
                            <p className="text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase mb-1">
                                {currentTrack + 1} / {TRACKS.length}
                            </p>
                            <h3 className="text-lg font-black text-white leading-snug line-clamp-1">{track.title}</h3>
                            <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-semibold mt-0.5">{track.artist}</p>
                        </div>

                        {/* iPod controls */}
                        <div className="flex items-center justify-center gap-6 py-3 px-5 bg-white/[0.04] rounded-full border border-white/10 mx-2 mb-1">
                            <button
                                onClick={() => switchTrack(-1)}
                                className="p-2 text-white/40 hover:text-white transition-all active:scale-90 hover:scale-110 rounded-full"
                                aria-label="Previous"
                            >
                                <SkipBack size={22} fill="currentColor" />
                            </button>

                            <button
                                onClick={isPlaying ? handlePause : handlePlay}
                                className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.2)]"
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
                                        <rect x="6" y="4" width="4" height="16" rx="1.5" />
                                        <rect x="14" y="4" width="4" height="16" rx="1.5" />
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="black" className="translate-x-[2px]">
                                        <path d="M5 3.868C5 2.651 6.384 1.956 7.35 2.688L19.49 11.82C20.268 12.408 20.268 13.592 19.49 14.18L7.35 23.312C6.384 24.044 5 23.349 5 22.132V3.868Z" />
                                    </svg>
                                )}
                            </button>

                            <button
                                onClick={() => switchTrack(1)}
                                className="p-2 text-white/40 hover:text-white transition-all active:scale-90 hover:scale-110 rounded-full"
                                aria-label="Next"
                            >
                                <SkipForward size={22} fill="currentColor" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
