"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Music, Mic2, Star, User, Edit3, Film, ArrowRight, CheckCircle, Clapperboard, Feather, Laugh, Sparkles, X } from "lucide-react";
import Image from "next/image";

/* ─────────────────── SHARED COMPONENTS ─────────────────── */

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <div className="text-center mb-16 relative z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block mb-4"
            >
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2 animate-pulse" />
            </motion.div>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold mb-4 font-heading text-white drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]"
            >
                {title}
            </motion.h2>
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 150 }}
                transition={{ duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-4"
            />
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-gray-300 max-w-2xl mx-auto font-serif italic text-lg"
            >
                {subtitle}
            </motion.p>
        </div>
    );
}

/* ─────────────────── HERO SECTION (SPOTLIGHT) ─────────────────── */

function AuditionsHero({ onOpenModal }: { onOpenModal: () => void }) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050500] pt-20">
            {/* Background Pixel/Grid Effect */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />
            {/* Ambient glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Stage Curtains (Visual Only) */}
            <div className="absolute inset-0 flex justify-between pointer-events-none z-20">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                    className="w-1/2 h-full bg-red-950 shadow-[10px_0_50px_rgba(0,0,0,0.8)]"
                    style={{ backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 50%, transparent 100%)", backgroundSize: "100px 100%" }}
                />
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                    className="w-1/2 h-full bg-red-950 shadow-[-10px_0_50px_rgba(0,0,0,0.8)]"
                    style={{ backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 50%, transparent 100%)", backgroundSize: "100px 100%" }}
                />
            </div>

            {/* Flash Bulbs Background */}
            <div className="absolute inset-0 z-0 opacity-30">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_20px_white]"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `flash-bulb ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-30 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    <span className="block text-yellow-500 font-serif text-2xl italic mb-4">The Stage Is Yours</span>
                    <h1 className="text-6xl md:text-8xl font-bold font-heading mb-6 text-white uppercase tracking-widest drop-shadow-2xl">
                        CASTING <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600">CALL</span>
                    </h1>
                    <p className="text-gray-300 text-xl max-w-xl mx-auto mb-10 leading-relaxed">
                        Join the next generation of GSAA superstars.
                        We are looking for fresh talent for our upcoming movies, albums, and web series.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────── ROLES SECTION (NOTICEBOARD) ─────────────────── */

function RolesSection({ onSelectRole }: { onSelectRole: (role: any) => void }) {
    const roles = [
        {
            id: 1,
            title: "Lead Actor",
            subtitle: "- Action Thriller",
            icon: Clapperboard,
            category: "Feature Film",
            gender: "Male",
            formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfs-mhiPAridGMUjcuspYYOD8RcvYTs3Bp6Sp6bkSpluObNUQ/viewform?usp=header",
            requirements: ["Martial Arts skills", "Hindi fluency"],
            color: "text-amber-400",
            bgColor: "bg-red-950"
        },
        {
            id: 2,
            title: "Lead Actress",
            subtitle: "- Period Drama",
            icon: Star,
            category: "Web Series",
            gender: "Female",
            formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe2IHLiR2aneRyGYE64SEsy7szYX9VxqVNyzELYHwmdZvJw6A/viewform?usp=header",
            requirements: ["Classical dance", "Urdu diction"],
            color: "text-amber-400",
            bgColor: "bg-red-950"
        },
        {
            id: 3,
            title: "Comic Artist",
            subtitle: "- Comedy Series",
            icon: Laugh,
            category: "Sitcom / TV Series",
            gender: "Any",
            formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe7p0Ok4l0b7s7H5ElBOe4EsA_iZ-r0FjYY5zyKeKycShN9Nw/viewform?usp=header",
            requirements: ["Improvisational skills", "Comic timing"],
            color: "text-amber-400",
            bgColor: "bg-red-950"
        },
        {
            id: 4,
            title: "Singer-Composer",
            subtitle: "- Musical Feature",
            icon: Mic2,
            category: "Music Album / Film",
            gender: "Any",
            formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeBc01waaf3B210sRkjmJgClxjxtNQs1yeOJN3Kmvs78DM8ug/viewform?usp=header",
            requirements: ["Classical training", "Studio experience"],
            color: "text-amber-400",
            bgColor: "bg-red-950"
        },
        {
            id: 5,
            title: "Writer",
            subtitle: "- Web Series",
            icon: Edit3,
            category: "Digital Originals",
            gender: "Any",
            formUrl: "https://docs.google.com/forms/d/e/1FAIpQLScuxZgL_LT47FTtJVFyTerx-ancz-L2RfQOzzkNtXN_Vnhvaw/viewform?usp=header",
            requirements: ["Thriller experience", "Sample scripts"],
            color: "text-amber-400",
            bgColor: "bg-red-950"
        },
        {
            id: 6,
            title: "Director",
            subtitle: "- Feature Film",
            icon: Film,
            category: "Feature Film",
            gender: "Any",
            formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfZftKWmeOndaBD_J_NGgfmQEQ0d2xPu7e9JwkfxOq4xk5LKw/viewform?usp=header",
            requirements: ["Scheduling", "On-set management"],
            color: "text-amber-400",
            bgColor: "bg-red-950"
        },
    ];

    return (
        <section className="py-32 bg-[#050400] relative overflow-hidden">
            {/* Spotlights */}
            <div className="absolute top-[-10%] left-[10%] w-[30vw] h-[120%] bg-gradient-to-b from-white/10 to-transparent transform -skew-x-[25deg] pointer-events-none blur-3xl opacity-50 z-0" />
            <div className="absolute top-[-10%] right-[10%] w-[30vw] h-[120%] bg-gradient-to-b from-white/10 to-transparent transform skew-x-[25deg] pointer-events-none blur-3xl opacity-50 z-0" />

            {/* Dark Pattern Texture representing corkboard/wall */}
            <div className="absolute inset-0 pointer-events-none opacity-20 z-0"
                style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-linen.png')" }}
            />

            {/* Stage Curtains Overlay */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-red-950/80 to-transparent pointer-events-none z-0 blur-md" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-red-950/80 to-transparent pointer-events-none z-0 blur-md" />

            {/* Ambient glows */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-900/30 rounded-t-full blur-[120px] pointer-events-none z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <SectionHeader title="CURRENT OPENINGS" subtitle="Find your role in our upcoming productions" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 mt-20 max-w-7xl mx-auto">
                    {roles.map((role, i) => (
                        <div key={i} className="relative w-full group transform transition-transform duration-300 hover:-translate-y-2">
                            {/* Realistic Drop Shadow beneath paper */}
                            <div className="absolute -inset-1 bg-black/60 translate-y-3 translate-x-3 blur-md rounded-md pointer-events-none" />

                            {/* Main Paper Card */}
                            <div className="relative bg-[#ebe6d5] w-full p-6 sm:p-8 pb-20 shadow-inner border-[1px] border-[#c4ba9f] rounded flex flex-col items-start overflow-hidden hover:bg-[#fffdf8] transition-colors duration-300 h-[220px]">

                                {/* Paper Clip (Top Center) */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-[44px] border-2 border-[#5a5043] rounded-full bg-gradient-to-b from-[#b8a99a] to-[#8c7b6d] shadow-[3px_3px_5px_rgba(0,0,0,0.5)] z-20" />

                                {/* Header Row */}
                                <div className="flex items-start gap-4 sm:gap-6 border-b-[3px] border-[#c4ba9f]/50 pb-5 mb-0 w-full relative z-10 text-left">
                                    {/* Icon Box inside dark red bg */}
                                    <div className={`w-[60px] h-[60px] sm:w-[75px] sm:h-[75px] rounded flex-shrink-0 flex flex-col items-center justify-center shadow-inner border border-black/30 bg-gradient-to-br from-[#1c0808] to-[#2b0808] relative overflow-hidden`}>
                                        <div className="absolute top-0 left-0 right-0 h-4 sm:h-5 bg-black/40 flex justify-around px-1 items-center border-b border-black/50">
                                            <div className="w-2 sm:w-3 h-1 sm:h-1.5 bg-white/70 skew-x-[20deg]" />
                                            <div className="w-2 sm:w-3 h-1 sm:h-1.5 bg-white/70 skew-x-[20deg]" />
                                            <div className="w-2 sm:w-3 h-1 sm:h-1.5 bg-white/70 skew-x-[20deg]" />
                                        </div>
                                        <role.icon size={36} className={`${role.color} mt-2 sm:mt-3 drop-shadow-md`} />
                                    </div>

                                    <div className="flex flex-col flex-1 justify-center pt-2">
                                        <h3 className="text-[22px] sm:text-[28px] font-bold font-serif text-[#1c1c1c] leading-none tracking-tight drop-shadow-sm mb-1">{role.title}</h3>
                                        <p className="text-sm sm:text-[17px] font-bold text-[#5e5443] tracking-wider uppercase">{role.subtitle}</p>
                                    </div>
                                </div>

                                {/* Cards now ONLY show title, subtitle, icon, and apply button - keeping it simple and elegant */}
                                <div className="w-full flex-grow relative z-10 px-1" />

                                {/* Apply Button */}
                                <div className="absolute bottom-6 left-6 right-6 z-20">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(role.formUrl, "_blank");
                                        }}
                                        className="w-full py-3.5 sm:py-4 bg-gradient-to-b from-[#2b0808] to-[#140202] hover:from-black hover:to-black text-[#f6f2e6] font-bold text-[13px] uppercase tracking-[0.2em] rounded transition-all duration-300 border border-[#1a0505] shadow-[0_5px_15px_rgba(0,0,0,0.4)]"
                                    >
                                        Apply Now
                                    </button>
                                </div>

                                {/* Paper texture overlay - faint noise */}
                                <div className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-multiply" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


/* ─────────────────── APPLY SECTION (TICKET) ─────────────────── */

function ApplySection() {
    return (
        <section className="py-32 bg-[#050000] relative overflow-hidden flex items-center justify-center">
            {/* Background Pixel/Grid Effect */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />
            {/* Ambient glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto bg-[#fffdf0] text-black p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-1 border-t-8 border-b-8 border-double border-red-900 relative"
                >
                    {/* Perforated Edges */}
                    <div className="absolute top-0 left-0 bottom-0 w-4 border-r-2 border-dashed border-gray-400" />
                    <div className="absolute top-0 right-0 bottom-0 w-4 border-l-2 border-dashed border-gray-400" />

                    <h2 className="text-5xl font-bold font-heading mb-4 uppercase text-red-900">Official Casting Form</h2>
                    <p className="text-gray-700 mb-8 font-serif italic text-lg">
                        "Your journey to stardom begins with a single step. Complete the form to register for the upcoming season."
                    </p>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                        <div className="flex items-center gap-2 text-green-700 font-bold">
                            <CheckCircle size={20} />
                            <span>No Fees Required</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-700 font-bold">
                            <CheckCircle size={20} />
                            <span>Direct Selection</span>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button
                            onClick={() => {
                                // Scroll to RolesSection to start the application
                                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-3 px-12 py-5 bg-black text-white font-bold text-xl hover:bg-red-800 transition-colors shadow-lg group"
                        >
                            <span>START APPLICATION</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="mt-4 text-xs text-gray-500 uppercase tracking-widest">Limited Slots Available</p>
                    </div>

                    {/* Stamp */}
                    <div className="absolute bottom-8 right-8 w-24 h-24 border-4 border-red-800 rounded-full flex items-center justify-center opacity-50 transform -rotate-12 pointer-events-none">
                        <span className="text-red-800 font-bold text-xs uppercase text-center leading-tight">GSAA<br />OFFICIAL<br />2026</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────── MAIN PAGE COMPONENT ─────────────────── */

export default function AuditionsPage() {
    return (
        <main className="bg-black min-h-screen text-white overflow-x-hidden selection:bg-yellow-500/30">
            <AuditionsHero onOpenModal={() => {
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            }} />
            <RolesSection onSelectRole={() => { }} />
            <ApplySection />

            {/* Simple Footer */}
            <footer className="py-12 bg-black border-t border-white/10 text-center text-gray-500 text-sm">
                <p>&copy; 2026 GSAA Casting. All rights reserved.</p>
            </footer>
        </main>
    );
}
