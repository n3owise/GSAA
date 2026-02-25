"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionContent from "@/components/ui/SectionContent";
import { Plane, Building2, Bus, FileCheck, MapPin, Globe, Banknote, Wallet, IndianRupee, Compass } from "lucide-react";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";

const travelModes = [
    { icon: Plane, label: "Flight" },
    { icon: Building2, label: "Hotel" },
    { icon: Bus, label: "Bus" },
    { icon: FileCheck, label: "Visa" },
    { icon: Banknote, label: "Cashback" },
    { icon: Wallet, label: "Wallet" },
    { icon: IndianRupee, label: "Rupees" },
    { icon: Compass, label: "Travel" },
];

export default function TravelToEarn() {
    const [activeMode, setActiveMode] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveMode((prev) => (prev + 1) % travelModes.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const CurrentIcon = travelModes[activeMode].icon;

    return (
        <section className="relative min-h-screen py-24 flex items-center overflow-hidden bg-bg-dark">
            {/* Background Accent - Subtle Map Effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

                {/* Visual Side (Left) */}
                {/* Visual Side (Left in DOM, Visual Right via order) - Orbiting Circles */}
                <div className="relative flex h-[500px] w-full max-w-[500px] items-center justify-center overflow-hidden rounded-full mx-auto order-1 lg:order-2">
                    <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-white to-gray-400 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-gray-400">
                        <Globe size={100} className="text-white/80" />
                    </span>

                    {/* Inner Orbit (Radius 80, Duration 10 - Fast) */}
                    <OrbitingCircles className="size-[30px] border-none bg-transparent" duration={10} delay={10} radius={80}>
                        <div className="bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/20">
                            <Plane size={20} className="text-white" />
                        </div>
                        <div className="bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/20">
                            <Building2 size={20} className="text-white" />
                        </div>
                        <div className="bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/20">
                            <Wallet size={20} className="text-white" />
                        </div>
                    </OrbitingCircles>

                    {/* Middle Orbit (Radius 140, Duration 14 - Medium Fast, Reverse) */}
                    <OrbitingCircles className="size-[50px] border-none bg-transparent" radius={140} duration={14} reverse delay={14}>
                        <div className="bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/20">
                            <Bus size={24} className="text-white" />
                        </div>
                        <div className="bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/20">
                            <FileCheck size={24} className="text-white" />
                        </div>
                        <div className="bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/20">
                            <Compass size={24} className="text-white" />
                        </div>
                    </OrbitingCircles>

                    {/* Outer Orbit (Radius 200, Duration 18 - Medium) */}
                    <OrbitingCircles className="size-[60px] border-none bg-transparent" radius={200} duration={18} delay={18}>
                        <div className="bg-white/10 p-4 rounded-full backdrop-blur-md border border-white/20 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                            <Banknote size={28} className="text-yellow-400" />
                        </div>
                        <div className="bg-white/10 p-4 rounded-full backdrop-blur-md border border-white/20 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                            <IndianRupee size={28} className="text-yellow-400" />
                        </div>
                    </OrbitingCircles>
                </div>

                {/* Content Side (Right in DOM, Visual Left via order) */}
                <div className="order-2 lg:order-1">
                    <SectionContent
                        badge="TRAVEL REWARDS"
                        title="Journey Further, Earn Faster"
                        description="Turn every trip into a rewarding experience. Book flights, hotels, buses, and visas through GSAA and watch your miles stack up."
                        benefits={[
                            "Earn miles on Flights, Hotels, & Bus bookings",
                            "Seamless Visa processing with rewards",
                            "Redeem points for free travel & upgrades",
                        ]}
                        ctaText="Start Exploring"
                    />
                </div>

            </div>
        </section>
    );
}
