"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import SectionContent from "@/components/ui/SectionContent";
import { Play, IndianRupee, Wallet } from "lucide-react";

export default function WatchToEarn() {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<any>(null);
    const [playerReady, setPlayerReady] = useState(false);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const [walletAmount, setWalletAmount] = useState(5);
    const [isPlaying, setIsPlaying] = useState(false);
    const [coins, setCoins] = useState<{ id: number; cleft: string; ctop: string }[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isPlaying) {
            // Generate 1 coin and 1 rupee every 1 second
            interval = setInterval(() => {
                const newId = Date.now();
                // Pick a random curve point for the coin to travel through
                const randomLeft = `${20 + Math.random() * 60}%`;
                const randomTop = `${20 + Math.random() * 60}%`;

                setCoins(prev => [...prev, { id: newId, cleft: randomLeft, ctop: randomTop }]);

                // Wallet increment timed to when the coin visually hits the top right
                setTimeout(() => setWalletAmount((prev) => prev >= 500 ? 5 : prev + 1), 2125); // 85% of 2.5s animation is ~2.125s

                // Clean up the DOM element after animation ends
                setTimeout(() => {
                    setCoins(prev => prev.filter(c => c.id !== newId));
                }, 2500);

            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isPlaying]);

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const rotateX = useTransform(scrollYProgress, [0.2, 0.8], [15, -5]);

    // Initialize YouTube iframe API
    useEffect(() => {
        // Load YouTube API
        if (!(window as any).YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }

        const initPlayer = () => {
            setTimeout(() => {
                if ((window as any).YT && (window as any).YT.Player) {
                    playerRef.current = new (window as any).YT.Player('youtube-player', {
                        events: {
                            onReady: () => {
                                console.log('YouTube player ready');
                                setPlayerReady(true);
                            },
                            onStateChange: (event: any) => {
                                console.log('State change:', event.data);
                                setIsPlaying(event.data === 1);
                            },
                        },
                    });
                }
            }, 500);
        };

        if ((window as any).YT && (window as any).YT.Player) {
            initPlayer();
        } else {
            (window as any).onYouTubeIframeAPIReady = initPlayer;
        }

        return () => {
            if (playerRef.current && playerRef.current.destroy) {
                playerRef.current.destroy();
            }
        };
    }, []);

    const togglePlay = () => {
        console.log('Toggle play clicked, player ready:', playerReady, 'playerRef:', playerRef.current);
        if (playerRef.current && playerReady) {
            if (isPlaying) {
                console.log('Pausing...');
                playerRef.current.pauseVideo();
            } else {
                console.log('Playing...');
                playerRef.current.playVideo();
            }
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen py-24 flex items-center overflow-hidden bg-bg-navy"
        >
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl pointer-events-none opacity-20" />

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Visual Side (Left) */}
                <div className="relative z-10 perspective-1000">
                    <motion.div
                        style={{ y, rotateX }}
                        className="relative aspect-video w-full glass-panel rounded-3xl shadow-2xl overflow-hidden group border border-white/10"
                    >
                        {/* YouTube iframe */}
                        <iframe
                            id="youtube-player"
                            src="https://www.youtube.com/embed/pP5iMkFLfIw?enablejsapi=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=pP5iMkFLfIw"
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />

                        {/* Transparent overlay for cursor tracking */}
                        <div
                            className="absolute inset-0 z-[5]"
                            onClick={togglePlay}
                            style={{ pointerEvents: isPlaying ? 'auto' : 'none' }}
                        />

                        {/* Interactive UI Overlay when Paused */}
                        <AnimatePresence>
                            {!isPlaying && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-black/50 z-10 flex flex-col justify-between p-6 cursor-pointer"
                                    onClick={togglePlay}
                                >
                                    {/* Title at the top */}
                                    <motion.div
                                        className="flex flex-col items-center gap-2 mt-4"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <h3 className="text-white text-2xl font-bold tracking-tight">
                                            Click to Play & Start Earning
                                        </h3>
                                        <p className="text-white/80 text-sm font-medium">
                                            Watch videos and earn rewards instantly
                                        </p>
                                    </motion.div>

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:scale-110 transition-transform duration-500">
                                            <Play size={32} fill="black" className="text-black ml-1" />
                                            {/* Pulse Rings */}
                                            <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-white" />
                                        </div>
                                    </div>

                                    {/* Progress Bar (Decorative) */}
                                    <div className="mt-auto w-full pointer-events-none">
                                        <div className="flex justify-between text-white/70 text-sm font-medium mb-2">
                                            <span>0:00</span>
                                            <span>0:15</span>
                                        </div>
                                        <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                                            <div className="h-full w-0 bg-white rounded-full transition-all duration-1000" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Reward Coin Animation (Shooting to Wallet - dynamically managed array) */}
                        <AnimatePresence>
                            {coins.map((coin) => (
                                <div
                                    key={coin.id}
                                    style={{
                                        "--curve-left": coin.cleft,
                                        "--curve-top": coin.ctop,
                                    } as React.CSSProperties}
                                    className="absolute w-6 h-6 rounded-full bg-yellow-400 border border-yellow-200 flex items-center justify-center text-black shadow-[0_0_15px_rgba(250,204,21,0.5)] animate-shoot-coin opacity-0 pointer-events-none z-20"
                                >
                                    <IndianRupee size={12} strokeWidth={3} />
                                </div>
                            ))}
                        </AnimatePresence>

                        {/* Wallet receiver at the top right */}
                        <motion.div
                            key={walletAmount}
                            className="absolute top-4 right-4 flex items-center justify-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full z-30 border border-white/20 shadow-lg min-w-[70px]"
                            initial={{ scale: 1.15, borderColor: "rgba(250,204,21,0.8)" }}
                            animate={{ scale: 1, borderColor: "rgba(255,255,255,0.2)" }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <Wallet size={16} className="text-yellow-400 shrink-0" />
                            <span className="text-yellow-400 font-bold font-mono text-sm tracking-widest leading-none mt-0.5 relative z-10 w-[3ch] text-right">
                                {walletAmount}
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Floating Bg Cards */}
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
                        className="absolute -top-10 -right-10 w-40 h-28 glass-panel rounded-xl blur-sm -z-10"
                    />
                </div>

                {/* Content Side (Right) */}
                <div>
                    <SectionContent
                        badge="WATCH TO EARN"
                        title="Earn Rewards Watching Content"
                        description="Transform your entertainment time into earning opportunities. Watch videos, shows, and content you love while accumulating rewards."
                        benefits={[
                            "Earn coins for every video watched",
                            "Redeem rewards for premium content",
                            "Unlock exclusive entertainment access",
                        ]}
                        ctaText="Start Watching"
                        ctaLink="/earnings#watch-section"
                        align="left"
                    />
                </div>

            </div>
        </section>
    );
}
