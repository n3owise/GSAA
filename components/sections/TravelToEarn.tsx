"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionContent from "@/components/ui/SectionContent";
import { Plane, Building2, Bus, Wallet, IndianRupee, MapPin, Calendar, Users, Briefcase, ChevronRight, Globe, Search } from "lucide-react";

// Flight, Hotel, Bus, and Visa modes
const travelModes = [
    {
        id: "flight",
        icon: Plane,
        label: "Flights",
        placeholderObj: "Destination",
        price: 8500,
        cashback: 425,
        target: "New York (JFK)",
        bg: "from-blue-500/20 to-cyan-500/20",
        color: "text-cyan-400"
    },
    {
        id: "hotel",
        icon: Building2,
        label: "Hotels",
        placeholderObj: "City / Hotel",
        price: 12000,
        cashback: 1200,
        target: "The Grand Resort",
        bg: "from-purple-500/20 to-pink-500/20",
        color: "text-pink-400"
    },
    {
        id: "bus",
        icon: Bus,
        label: "Buses",
        placeholderObj: "Route",
        price: 1500,
        cashback: 75,
        target: "Mumbai → Pune",
        bg: "from-amber-500/20 to-orange-500/20",
        color: "text-amber-400"
    },
    {
        id: "visa",
        icon: Briefcase,
        label: "Visas",
        placeholderObj: "Country",
        price: 4500,
        cashback: 225,
        target: "Dubai (Tourist)",
        bg: "from-emerald-500/20 to-teal-500/20",
        color: "text-emerald-400"
    }
];

interface FlyingCoin {
    id: number;
    startX: string;
    startY: string;
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

            // Generate coins from the center-right (near the summary box)
            const newCoins: FlyingCoin[] = Array.from({ length: 12 }).map((_, i) => ({
                id: coinCount + i,
                startX: `${65 + Math.random() * 20}%`, // Right side of the screen
                startY: `${40 + Math.random() * 20}%`, // Middle vertically
                delay: i * 0.08 // Staggered delay
            }));

            setCoinCount(prev => prev + 12);
            setFlyingCoins(newCoins);

            // Add the cashback to the wallet exactly when the first coin lands
            setTimeout(() => {
                setWalletBalance((prev) => prev + activeMode.cashback);
            }, 800);

            // Reset UI after 4 seconds
            setTimeout(() => {
                setIsSuccess(false);
                setFlyingCoins([]);
            }, 4000);

        }, 1500); // 1.5s of "Processing..."
    };

    return (
        <section className="relative min-h-screen py-24 flex items-center overflow-hidden bg-bg-dark">
            {/* Background Accent - Subtle Map Effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] gap-16 lg:gap-20 items-center relative z-10 w-full">

                {/* Content Side (Left) */}
                <div className="order-2 xl:order-1 relative z-20">
                    <SectionContent
                        badge="TRAVEL REWARDS"
                        title="Journey Further, Earn Faster"
                        description="Experience our desktop-class travel portal. Turn every trip into a rewarding experience. Book flights, hotels, buses, and visas through GSAA and watch your cashback stack up instantly."
                        benefits={[
                            "Up to 10% instant cashback on Flights, Hotels, & Bus",
                            "Seamless Visa processing with guaranteed rewards",
                            "Use wallet balance for free travel & upgrades",
                        ]}
                        ctaText="Start Exploring"
                        align="left"
                    />
                </div>

                {/* Visual Side (Right) - Desktop/Monitor Website Mockup */}
                <div className="relative order-1 xl:order-2 flex justify-center perspective-1000 w-full h-full">

                    {/* The Monitor / Browser Wrapper */}
                    <motion.div
                        className="relative w-[120%] lg:w-[110%] max-w-[800px] aspect-[16/10] bg-[#0c0c0e] rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-[#333] overflow-hidden flex flex-col"
                        initial={{ opacity: 0, x: 50, rotateY: -10 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                    >
                        {/* Browser Top Bar */}
                        <div className="h-10 bg-[#1a1a1e] border-b border-[#333] flex items-center px-4 gap-4 shrink-0 z-20">
                            {/* Mac Window Controls */}
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>

                            {/* URL Bar */}
                            <div className="flex-1 max-w-sm h-6 bg-black/40 rounded-md border border-white/5 flex items-center px-3 mx-auto">
                                <Globe size={12} className="text-white/40 mr-2" />
                                <span className="text-[10px] text-white/50 font-mono tracking-wider w-full text-center pr-4">travel.gsaa.global</span>
                            </div>

                            {/* Wallet Display (Top Right of Browser) */}
                            <motion.div
                                key={walletBalance}
                                initial={{ scale: 1.1, backgroundColor: "rgba(234, 179, 8, 0.2)" }}
                                animate={{ scale: 1, backgroundColor: "transparent" }}
                                className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded pl-1"
                            >
                                <Wallet size={12} className="text-yellow-400" />
                                <span className="text-[11px] font-bold text-white tracking-widest">₹{walletBalance.toLocaleString()}</span>
                            </motion.div>
                        </div>

                        {/* Website Canvas Area */}
                        <div className="flex-1 bg-[#050505] relative flex flex-col z-10">

                            {/* Website Navbar (Internal) */}
                            <div className="h-14 border-b border-white/5 flex items-center px-8 justify-between bg-white/[0.02] shrink-0">
                                <h2 className="text-lg font-black text-white tracking-widest flex items-center gap-2">
                                    <Globe className="text-blue-500" size={20} />
                                    GSAA <span className="text-blue-500 font-light">TRAVEL</span>
                                </h2>

                                {/* Animated Instruction */}
                                <div className="hidden sm:block">
                                    <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full animate-pulse">
                                        👇 Tap a tab to explore
                                    </span>
                                </div>
                            </div>

                            {/* Main Content Layout */}
                            <div className="flex-1 flex flex-col p-6 sm:p-8 gap-6 relative">

                                {/* Top Navigation Tabs */}
                                <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-xl border border-white/5 w-fit shrink-0 backdrop-blur-sm">
                                    {travelModes.map((mode, idx) => (
                                        <button
                                            key={mode.id}
                                            onClick={() => { if (!isBooking && !isSuccess) setActiveTab(idx); }}
                                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-300 ${activeTab === idx
                                                ? `bg-gradient-to-r ${mode.bg} border border-${mode.color.replace('text-', '')}/30 shadow-lg`
                                                : "hover:bg-white/5 text-white/50 border border-transparent"
                                                }`}
                                        >
                                            <mode.icon size={16} className={activeTab === idx ? mode.color : "opacity-70"} />
                                            <span className={`text-xs font-bold uppercase tracking-wider ${activeTab === idx ? "text-white" : ""}`}>{mode.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Booking Interface Split (Left: Search Inputs | Right: Price/Action) */}
                                <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] gap-6 flex-1 bg-white/[0.01] border border-white/5 rounded-2xl p-6 shadow-inner relative z-20">

                                    {/* Left Side: Inputs */}
                                    <AnimatePresence mode="popLayout">
                                        <motion.div
                                            key={activeTab}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            transition={{ duration: 0.4 }}
                                            className="flex flex-col gap-4"
                                        >
                                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 group hover:bg-white/10 transition-colors">
                                                <div className={`p-2 rounded-lg bg-gradient-to-br ${activeMode.bg}`}>
                                                    <MapPin size={20} className={activeMode.color} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">{activeMode.placeholderObj}</p>
                                                    <p className="text-lg font-medium text-white">{activeMode.target}</p>
                                                </div>
                                                <Search size={16} className="text-white/20 group-hover:text-white/50" />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors">
                                                    <div className="p-2 rounded-lg bg-white/5">
                                                        <Calendar size={18} className="text-white/60" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Departure</p>
                                                        <p className="text-sm font-medium text-white">Next Friday</p>
                                                    </div>
                                                </div>
                                                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors">
                                                    <div className="p-2 rounded-lg bg-white/5">
                                                        <Users size={18} className="text-white/60" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Travelers</p>
                                                        <p className="text-sm font-medium text-white">2 Adults</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Right Side: Price Summary & Action */}
                                    <AnimatePresence mode="popLayout">
                                        <motion.div
                                            key={`summary-${activeTab}`}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="bg-[#0c0c0e] border border-white/10 rounded-xl p-6 flex flex-col justify-between shadow-2xl relative"
                                        >
                                            <div>
                                                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                                    <activeMode.icon size={16} className={activeMode.color} /> Booking Summary
                                                </h3>
                                                <div className="flex justify-between items-end mb-4 pb-4 border-b border-white/5">
                                                    <p className="text-[11px] text-white/50 uppercase tracking-widest">Total Price</p>
                                                    <p className="text-2xl font-bold text-white leading-none">₹{activeMode.price.toLocaleString()}</p>
                                                </div>

                                                <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/5 border border-yellow-500/20 rounded-lg p-3 flex justify-between items-center">
                                                    <p className="text-[10px] font-bold text-yellow-500/80 uppercase tracking-wider">Earn Cashback</p>
                                                    <p className="text-lg font-black text-yellow-400 flex items-center gap-1">
                                                        +₹{activeMode.cashback}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <button
                                                onClick={handleBook}
                                                disabled={isBooking || isSuccess}
                                                className={`w-full mt-6 py-4 rounded-lg text-sm font-bold flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden group ${isBooking || isSuccess
                                                    ? "bg-white/10 text-white cursor-wait"
                                                    : "bg-white text-black hover:bg-gray-200 hover:scale-[1.02] shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                                                    }`}
                                            >
                                                <AnimatePresence mode="wait">
                                                    {isBooking ? (
                                                        <motion.div
                                                            key="processing"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <motion.div
                                                                animate={{ rotate: 360 }}
                                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                                            />
                                                            Securely Processing...
                                                        </motion.div>
                                                    ) : isSuccess ? (
                                                        <motion.div
                                                            key="success"
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            className="flex items-center gap-2 text-yellow-400"
                                                        >
                                                            Booking Complete!
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div
                                                            key="idle"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            className="flex items-center justify-center gap-2"
                                                        >
                                                            Confirm & Pay <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {/* Success Loading Bar */}
                                                {isSuccess && (
                                                    <motion.div
                                                        initial={{ width: "0%" }}
                                                        animate={{ width: "100%" }}
                                                        transition={{ duration: 4, ease: "linear" }}
                                                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-amber-500"
                                                    />
                                                )}
                                            </button>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Animated Flying Cashback Coins */}
                        {flyingCoins.map(coin => (
                            <motion.div
                                key={coin.id}
                                initial={{
                                    y: coin.startY,
                                    x: coin.startX,
                                    scale: 0.5,
                                    opacity: 0,
                                }}
                                animate={{
                                    y: [coin.startY, "10%", "5%"], // Arc upwards to the wallet in the browser top bar
                                    x: [coin.startX, "85%", "95%"], // Move towards top right
                                    scale: [0.5, 1.5, 0.3], // Pop large, then shrink
                                    opacity: [0, 1, 0] // Fade in and out
                                }}
                                transition={{
                                    duration: 0.9,
                                    delay: coin.delay,
                                    ease: "easeInOut"
                                }}
                                className="absolute top-0 left-0 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 border-2 border-yellow-100 flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.9)] z-50 pointer-events-none"
                            >
                                <IndianRupee size={24} strokeWidth={3} className="text-yellow-800" />
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
