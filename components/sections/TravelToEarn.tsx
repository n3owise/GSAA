"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionContent from "@/components/ui/SectionContent";
import { Plane, Building2, Bus, Wallet, IndianRupee, MapPin, Calendar, Users, ArrowRight } from "lucide-react";

// Flight, Hotel, and Bus modes
const travelModes = [
    {
        id: "flight",
        icon: Plane,
        label: "Flight",
        placeholderObj: "Destination",
        price: 8500,
        cashback: 425,
        bg: "from-blue-500/20 to-cyan-500/20",
        color: "text-cyan-400"
    },
    {
        id: "hotel",
        icon: Building2,
        label: "Hotel",
        placeholderObj: "City / Hotel",
        price: 12000,
        cashback: 1200,
        bg: "from-purple-500/20 to-pink-500/20",
        color: "text-pink-400"
    },
    {
        id: "bus",
        icon: Bus,
        label: "Bus",
        placeholderObj: "Route",
        price: 1500,
        cashback: 75,
        bg: "from-amber-500/20 to-orange-500/20",
        color: "text-amber-400"
    },
];

interface FlyingCoin {
    id: number;
    startX: string;
    delay: number;
}

export default function TravelToEarn() {
    const [activeTab, setActiveTab] = useState(0);
    const [isBooking, setIsBooking] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [walletBalance, setWalletBalance] = useState(12450); // Initial balance
    const [flyingCoins, setFlyingCoins] = useState<FlyingCoin[]>([]);
    const [coinCount, setCoinCount] = useState(0);

    const activeMode = travelModes[activeTab];

    const handleBook = () => {
        if (isBooking || isSuccess) return;

        setIsBooking(true);

        // Simulate network booking delay
        setTimeout(() => {
            setIsBooking(false);
            setIsSuccess(true);

            // Generate coins
            const newCoins: FlyingCoin[] = Array.from({ length: 8 }).map((_, i) => ({
                id: coinCount + i,
                startX: `${30 + Math.random() * 40}%`, // Random horizontal start position
                delay: i * 0.1 // Staggered delay
            }));

            setCoinCount(prev => prev + 8);
            setFlyingCoins(newCoins);

            // Add the cashback to the wallet exactly when the first coin lands (roughly 0.6s)
            setTimeout(() => {
                setWalletBalance((prev) => prev + activeMode.cashback);
            }, 600);

            // Reset UI after 3.5 seconds
            setTimeout(() => {
                setIsSuccess(false);
                setFlyingCoins([]);
            }, 3500);

        }, 1500); // 1.5s of "Processing..."
    };

    return (
        <section className="relative min-h-screen py-24 flex items-center overflow-hidden bg-bg-dark">
            {/* Background Accent - Subtle Map Effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

                {/* Visual Side (Left) - Interactive Booking Widget */}
                <div className="relative flex justify-center perspective-1000 h-full order-1 lg:order-2">
                    <motion.div
                        className="relative w-full max-w-[340px] h-[600px] bg-[#0c0c0e] rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5),inset_0_2px_1px_rgba(255,255,255,0.1)] p-4 flex flex-col border-[8px] border-[#222] overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Status Bar Mock */}
                        <div className="flex justify-between items-center px-4 pt-1 pb-2 text-[10px] text-white/50 font-medium z-10">
                            <span>9:41</span>
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-white/20" />
                                <div className="w-3 h-3 rounded-full bg-white/20" />
                                <div className="w-4 h-3 rounded-sm bg-white/80" />
                            </div>
                        </div>

                        {/* Interactive App Canvas */}
                        <div className="relative flex-1 flex flex-col bg-[#050505] rounded-[2rem] border border-white/5 overflow-hidden z-20">

                            {/* Header / Wallet */}
                            <div className="flex justify-between items-center p-5 border-b border-white/5 bg-white/[0.02] backdrop-blur-md">
                                <h2 className="text-base font-bold text-white tracking-wide">GSAA TRAVEL</h2>
                                <motion.div
                                    key={walletBalance} // Animate on balance change
                                    initial={{ scale: 1.2, color: "#eab308" }}
                                    animate={{ scale: 1, color: "#ffffff" }}
                                    transition={{ duration: 0.5 }}
                                    className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
                                >
                                    <Wallet size={12} className="text-blue-400" />
                                    <span className="text-[11px] font-mono font-bold tracking-widest mt-0.5">₹{walletBalance.toLocaleString()}</span>
                                </motion.div>
                            </div>

                            <div className="p-4 flex flex-col flex-1 relative">
                                {/* Instruction Hint */}
                                <div className="mb-4 text-center">
                                    <span className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold px-3 py-1.5 rounded-full animate-pulse tracking-wide uppercase">
                                        Select mode & book to earn!
                                    </span>
                                </div>

                                {/* Tabs */}
                                <div className="flex items-center gap-2 mb-6">
                                    {travelModes.map((mode, idx) => (
                                        <button
                                            key={mode.id}
                                            onClick={() => { if (!isBooking && !isSuccess) setActiveTab(idx); }}
                                            className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border transition-all duration-300 ${activeTab === idx
                                                ? `bg-gradient-to-br ${mode.bg} border-${mode.color.replace('text-', '')}/30 shadow-[0_5px_20px_rgba(0,0,0,0.3)]`
                                                : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10 text-white/50"
                                                }`}
                                        >
                                            <mode.icon size={20} className={activeTab === idx ? mode.color : "opacity-70"} />
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${activeTab === idx ? "text-white" : ""}`}>{mode.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Booking Form Mock UI */}
                                <AnimatePresence mode="popLayout">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-col gap-3"
                                    >
                                        <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-3.5">
                                            <MapPin size={16} className="text-white/40" />
                                            <div className="flex-1">
                                                <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">{activeMode.placeholderObj}</p>
                                                <p className="text-sm font-semibold text-white">Select Location</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex-1 flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-3.5">
                                                <Calendar size={16} className="text-white/40" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">Date</p>
                                                    <p className="text-[12px] font-semibold text-white truncate">Today</p>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-3.5">
                                                <Users size={16} className="text-white/40" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">Travelers</p>
                                                    <p className="text-[12px] font-semibold text-white truncate">1 Adult</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Price & Cashback summary */}
                                        <div className="mt-2 flex items-center justify-between p-4 bg-gradient-to-r from-yellow-500/10 to-amber-500/5 rounded-xl border border-yellow-500/20">
                                            <div>
                                                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Total Price</p>
                                                <p className="text-xl font-bold text-white flex items-center">
                                                    ₹{activeMode.price.toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-yellow-500/80 uppercase font-bold tracking-widest mb-1">Earn Cashback</p>
                                                <p className="text-lg font-black text-yellow-400 flex items-center justify-end gap-1">
                                                    +₹{activeMode.cashback}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Action Button */}
                                <div className="mt-auto pt-4 relative z-50">
                                    <button
                                        onClick={handleBook}
                                        disabled={isBooking || isSuccess}
                                        className={`w-full py-4 rounded-xl text-sm font-bold flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden ${isBooking || isSuccess
                                            ? "bg-white/10 text-white cursor-wait"
                                            : "bg-white text-black hover:opacity-90 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                            }`}
                                    >
                                        <AnimatePresence mode="wait">
                                            {isBooking ? (
                                                <motion.div
                                                    key="processing"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                                    />
                                                    Confirming...
                                                </motion.div>
                                            ) : isSuccess ? (
                                                <motion.div
                                                    key="success"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 1.2 }}
                                                    className="flex items-center gap-2 text-yellow-400"
                                                >
                                                    Booking Confirmed!
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="idle"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex flex-col items-center gap-0.5"
                                                >
                                                    <span className="flex items-center gap-2 text-[15px]">
                                                        Book {activeMode.label} <ArrowRight size={16} />
                                                    </span>
                                                    <span className="text-[9px] text-black/60 font-medium">Earn ₹{activeMode.cashback} instantly!</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Success Progress Bar */}
                                        {isSuccess && (
                                            <motion.div
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 3.5, ease: "linear" }}
                                                className="absolute bottom-0 left-0 h-1 bg-yellow-400"
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Spawning Coins Animation (rendered absolute to the widget) */}
                        {flyingCoins.map(coin => (
                            <motion.div
                                key={coin.id}
                                initial={{
                                    y: "90%",
                                    x: coin.startX,
                                    scale: 0.5,
                                    opacity: 0
                                }}
                                animate={{
                                    y: ["80%", "40%", "10%"], // Arch up, then drop to top right wallet
                                    x: [coin.startX, "50%", "85%"],
                                    scale: [0.5, 1.2, 0.4],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 0.7,
                                    delay: coin.delay,
                                    ease: "easeInOut"
                                }}
                                className="absolute top-0 left-0 w-8 h-8 rounded-full bg-yellow-400 border border-yellow-200 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.8)] z-50 pointer-events-none"
                            >
                                <IndianRupee size={20} strokeWidth={3} className="text-yellow-700" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Content Side (Right in DOM, Visual Left via order) */}
                <div className="order-2 lg:order-1">
                    <SectionContent
                        badge="TRAVEL REWARDS"
                        title="Journey Further, Earn Faster"
                        description="Turn every trip into a rewarding experience. Book flights, hotels, buses, and visas through GSAA and watch your cashback stack up instantly in your wallet."
                        benefits={[
                            "Up to 10% instant cashback on Flights, Hotels, & Bus",
                            "Seamless Visa processing with guaranteed rewards",
                            "Use wallet balance for free travel & upgrades",
                        ]}
                        ctaText="Start Exploring"
                        align="left"
                    />
                </div>

            </div>
        </section>
    );
}
