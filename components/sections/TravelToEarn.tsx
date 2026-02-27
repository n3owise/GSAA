"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionContent from "@/components/ui/SectionContent";
import { Plane, Building2, Bus, Wallet, IndianRupee, MapPin, Calendar, Users, Briefcase, ChevronRight, Globe, Search, ArrowRight } from "lucide-react";

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
    const [view, setView] = useState<"store" | "ticket">("store"); // Manage view states
    const [ticketData, setTicketData] = useState<typeof travelModes[0] | null>(null);

    const activeMode = travelModes[activeTab];

    const handleBook = () => {
        if (isBooking) return;

        setIsBooking(true);

        // Simulate network booking delay
        setTimeout(() => {
            setIsBooking(false);
            setTicketData(activeMode);
            setView("ticket"); // Switch to ticket view
        }, 1500); // 1.5s of "Processing..."
    };

    const handleBookAgain = () => {
        setView("store");
        setTicketData(null);
    };

    return (
        <section className="relative min-h-screen py-24 flex items-center overflow-hidden bg-bg-dark">
            {/* Background Accent - Subtle Map Effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10 w-full">

                {/* Content Side (Left) */}
                <div className="order-2 lg:order-1 relative z-20">
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
                        ctaLink="/earnings#travel-section"
                        align="left"
                    />
                </div>

                {/* Visual Side (Right) - Web Widget Mockup */}
                <div className="relative order-1 lg:order-2 flex justify-center perspective-1000 w-full">

                    {/* The Mini Browser Wrapper */}
                    <motion.div
                        className="relative w-full max-w-[480px] aspect-[4/5] bg-[#0c0c0e] rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-[#333] overflow-hidden flex flex-col"
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
                            <div className="flex-1 max-w-[200px] h-6 bg-black/40 rounded-md border border-white/5 flex items-center px-3 mx-auto">
                                <Globe size={10} className="text-white/40 mr-2 shrink-0" />
                                <span className="text-[9px] text-white/50 font-mono tracking-wider w-full truncate text-center">travel.gsaa.global</span>
                            </div>

                            {/* Wallet Display (Static for design) */}
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded pl-1 shrink-0">
                                <Wallet size={12} className="text-white/40" />
                                <span className="text-[10px] font-bold text-white/40 tracking-widest leading-none mt-0.5">WALLET</span>
                            </div>
                        </div>

                        {/* Website Canvas Area */}
                        <div className="flex-1 bg-[#050505] relative flex flex-col z-10">

                            {/* Website Navbar (Internal) */}
                            <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between bg-white/[0.02] shrink-0">
                                <h2 className="text-sm font-black text-white tracking-widest flex items-center gap-2">
                                    <Globe className="text-blue-500" size={16} />
                                    GSAA <span className="text-blue-500 font-light">TRAVEL</span>
                                </h2>

                                {/* Animated Instruction */}
                                <div className="hidden sm:block">
                                    <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[9px] font-bold px-3 py-1 rounded-full animate-pulse uppercase tracking-wider">
                                        👇 Tap a tab
                                    </span>
                                </div>
                            </div>

                            {/* Main Content Layout */}
                            <div className="flex-1 flex flex-col p-4 sm:p-5 gap-4 relative overflow-hidden">

                                {/* Top Navigation Tabs */}
                                <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5 w-full shrink-0 backdrop-blur-sm">
                                    {travelModes.map((mode, idx) => (
                                        <button
                                            key={mode.id}
                                            onClick={() => { if (!isBooking) setActiveTab(idx); }}
                                            className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-lg transition-all duration-300 ${activeTab === idx
                                                ? `bg-gradient-to-r ${mode.bg} border border-${mode.color.replace('text-', '')}/30 shadow-lg`
                                                : "hover:bg-white/5 text-white/50 border border-transparent"
                                                }`}
                                        >
                                            <mode.icon size={14} className={activeTab === idx ? mode.color : "opacity-70"} />
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${activeTab === idx ? "text-white" : ""}`}>{mode.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Booking Interface (Stacked layout) */}
                                <div className="flex flex-col gap-4 flex-1 bg-white/[0.01] border border-white/5 rounded-2xl p-4 shadow-inner relative z-20">

                                    {/* Top Half: Inputs */}
                                    <AnimatePresence mode="popLayout">
                                        <motion.div
                                            key={activeTab}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            transition={{ duration: 0.4 }}
                                            className="flex flex-col gap-3"
                                        >
                                            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3 group hover:bg-white/10 transition-colors">
                                                <div className={`p-2 rounded-lg bg-gradient-to-br ${activeMode.bg} shrink-0`}>
                                                    <MapPin size={16} className={activeMode.color} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold mb-0.5">{activeMode.placeholderObj}</p>
                                                    <p className="text-[13px] font-medium text-white truncate">{activeMode.target}</p>
                                                </div>
                                                <Search size={14} className="text-white/20 group-hover:text-white/50 shrink-0" />
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5 hover:bg-white/10 transition-colors">
                                                    <div className="p-1.5 rounded-lg bg-white/5 shrink-0">
                                                        <Calendar size={14} className="text-white/60" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-[8px] text-white/40 uppercase tracking-widest font-bold mb-0.5">Departure</p>
                                                        <p className="text-[11px] font-medium text-white truncate">Next Friday</p>
                                                    </div>
                                                </div>
                                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5 hover:bg-white/10 transition-colors">
                                                    <div className="p-1.5 rounded-lg bg-white/5 shrink-0">
                                                        <Users size={14} className="text-white/60" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-[8px] text-white/40 uppercase tracking-widest font-bold mb-0.5">Travelers</p>
                                                        <p className="text-[11px] font-medium text-white truncate">2 Adults</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Bottom Half: Price Summary & Action */}
                                    <div className="flex-1 flex flex-col justify-end relative">
                                        <AnimatePresence mode="popLayout">
                                            <motion.div
                                                key={`summary-${activeTab}`}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                className="bg-[#0c0c0e] border border-white/10 rounded-xl p-4 shadow-2xl relative"
                                            >
                                                <div>
                                                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                                        <activeMode.icon size={16} className={activeMode.color} /> Booking Summary
                                                    </h3>
                                                    <div className="flex justify-between items-end mb-3 pb-3 border-b border-white/5">
                                                        <p className="text-[10px] text-white/50 uppercase tracking-widest leading-none">Total Price</p>
                                                        <p className="text-xl font-bold text-white leading-none">₹{activeMode.price.toLocaleString()}</p>
                                                    </div>

                                                    <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/5 border border-yellow-500/20 rounded-lg p-2.5 flex justify-between items-center">
                                                        <p className="text-[9px] font-bold text-yellow-500/80 uppercase tracking-wider leading-none">Earn Cashback</p>
                                                        <p className="text-base font-black text-yellow-400 flex items-center gap-1 leading-none">
                                                            +₹{activeMode.cashback}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Action Button */}
                                                <button
                                                    onClick={handleBook}
                                                    disabled={isBooking}
                                                    className={`w-full mt-4 py-3.5 rounded-lg text-sm font-bold flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden group ${isBooking
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
                                                </button>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            {/* Ticket Overlay View */}
                            <AnimatePresence>
                                {view === "ticket" && ticketData && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                                        className="absolute inset-0 z-50 bg-[#050505] p-5 flex flex-col items-center justify-center"
                                    >
                                        {/* Ticket Core */}
                                        <div className="w-full max-w-[320px] bg-white text-black rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] mx-auto relative group">

                                            {/* Ticket Header */}
                                            <div className={`p-5 text-white bg-gradient-to-br ${ticketData.bg.replace('/20', '/80').replace('/20', '/90')} relative overflow-hidden`}>
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                                <div className="relative z-10 flex justify-between items-start">
                                                    <div>
                                                        <p className="text-[10px] uppercase font-bold tracking-widest text-white/80 mb-1">E-Ticket Confirmed</p>
                                                        <h3 className="text-2xl font-black">{ticketData.label.replace('s', '')}</h3>
                                                    </div>
                                                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                                                        <ticketData.icon size={24} className="text-white" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Ticket Body */}
                                            <div className="p-6 pb-8 bg-white relative">
                                                {/* Tear Drop cutouts */}
                                                <div className="absolute top-0 left-[-10px] w-5 h-5 bg-[#050505] rounded-full -translate-y-1/2" />
                                                <div className="absolute top-0 right-[-10px] w-5 h-5 bg-[#050505] rounded-full -translate-y-1/2" />
                                                <div className="absolute top-0 left-4 right-4 h-px border-t-2 border-dashed border-gray-300 -translate-y-[1px]" />

                                                <div className="space-y-4">
                                                    <div>
                                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">{ticketData.placeholderObj}</p>
                                                        <p className="text-base font-bold text-gray-900">{ticketData.target}</p>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">Date</p>
                                                            <p className="text-sm font-bold text-gray-900">Next Friday</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">Time</p>
                                                            <p className="text-sm font-bold text-gray-900">09:00 AM</p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center bg-gray-50 rounded-lg p-3">
                                                        <div>
                                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">Paid Amount</p>
                                                            <p className="text-lg font-black text-gray-900">₹{ticketData.price.toLocaleString()}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-[10px] text-yellow-600 uppercase tracking-widest font-bold mb-0.5">Cashback Earned</p>
                                                            <p className="text-base font-black text-yellow-500 bg-yellow-100 px-2 rounded">
                                                                +₹{ticketData.cashback}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Barcode Mock */}
                                            <div className="bg-gray-100 p-4 flex flex-col items-center justify-center border-t border-gray-200">
                                                <div className="w-full max-w-[200px] h-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAnIGhlaWdodD0nMTAwJz48cGF0aCBkPSdNMCAwaDR2MTAwSDB6bTYgMGgydjEwMEg2em00IDBoNHYxMDBIMTB6bTYgMGgydjEwMEgxNnptNCAwaDN2MTAwSDIwem01IDBoMnYxMDBIMjV6bTMgMGg0djEwMEgyOHptNiAwaDJ2MTAwSDM0em00IDBoNHYxMDBIMzh6bTYgMGgydjEwMEg0NHptNCAwaDN2MTAwSDQ4em01IDBoMnYxMDBINTN6bTMgMGg0djEwMEg1NnptNiAwaDJ2MTAwSDYyem00IDBoNHYxMDBINjZ6bTYgMGgydjEwMEg3MnptNCAwaDN2MTAwSDc2em01IDBoMnYxMDBIODE6Jz48L3BhdGg+PC9zdmc+')] bg-repeat-x opacity-60 mix-blend-multiply" />
                                                <p className="text-[8px] tracking-[0.3em] text-gray-400 mt-2">GSAA-TRVL-843924</p>
                                            </div>
                                        </div>

                                        {/* Book Again Button */}
                                        <button
                                            onClick={handleBookAgain}
                                            className="mt-6 px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs font-bold text-white transition-colors flex items-center gap-2"
                                        >
                                            Book Another <ArrowRight size={14} />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
