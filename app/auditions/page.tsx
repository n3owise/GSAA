"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Music, Mic2, Star, User, Edit3, Film, ArrowRight, CheckCircle, Clapperboard, Feather, Laugh, Sparkles } from "lucide-react";
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
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
            {/* Iris Reveal Effect Container */}
            <div className="absolute inset-0 z-10 animate-iris-open bg-gradient-to-b from-red-950/30 to-black pointer-events-none" />

            {/* Stage Curtains (Visual Only) */}
            <div className="absolute inset-0 flex justify-between pointer-events-none z-20">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                    className="w-1/2 h-full bg-red-900 shadow-[10px_0_50px_rgba(0,0,0,0.8)]"
                    style={{ backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 50%, transparent 100%)", backgroundSize: "100px 100%" }}
                />
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                    className="w-1/2 h-full bg-red-900 shadow-[-10px_0_50px_rgba(0,0,0,0.8)]"
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

/* ─────────────────── ROLES SECTION (POLAROIDS) ─────────────────── */

function RolesSection({ onSelectRole }: { onSelectRole: (role: any) => void }) {
    const roles = [
        { id: 1, title: "Actor", subtitle: "Lead / Negative", icon: Sparkles, desc: "Charismatic performers capable of carrying a scene. Experience in drama or action preferred.", color: "from-blue-600/80 to-black/90", bgColor: "bg-blue-900" },
        { id: 2, title: "Actress", subtitle: "Lead / Negative", icon: Star, desc: "Versatile talent for emotionally demanding roles. Dancing skills are a plus.", color: "from-pink-600/80 to-black/90", bgColor: "bg-pink-900" },
        { id: 3, title: "Comic", subtitle: "Supporting", icon: Laugh, desc: "Natural timing and improvisational skills to bring levity to intense narratives.", color: "from-green-600/80 to-black/90", bgColor: "bg-green-900" },
        { id: 4, title: "Singer", subtitle: "Composer", icon: Mic2, desc: "Unique vocal textures for playback and originals. Composers must submit demos.", color: "from-purple-600/80 to-black/90", bgColor: "bg-purple-900" },
        { id: 5, title: "Writer", subtitle: "Script / Screenplay", icon: Feather, desc: "Creative minds to craft compelling stories for our next big blockbuster.", color: "from-amber-600/80 to-black/90", bgColor: "bg-amber-900" },
        { id: 6, title: "Director", subtitle: "Action / Drama", icon: Clapperboard, desc: "Visionary leaders to steer our massive productions.", color: "from-red-600/80 to-black/90", bgColor: "bg-red-900" },
    ];

    return (
        <section className="py-32 bg-[#1a1a1a] relative overflow-hidden"
            style={{ backgroundImage: "radial-gradient(circle at center, #2a2a2a 0%, #111 100%)" }}
        >
            <div className="container mx-auto px-6">
                <SectionHeader title="CURRENT OPENINGS" subtitle="Find your role in our upcoming productions" />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 perspective-1000">
                    {roles.map((role, i) => (
                        <div key={i} className="group relative w-full h-[280px] [transform-style:preserve-3d] cursor-pointer">
                            {/* Front of Card (Polaroid Style) */}
                            <div className="absolute inset-0 bg-white p-3 pb-20 shadow-2xl transition-all duration-700 [backface-visibility:hidden] group-hover:[transform:rotateY(180deg)] flex flex-col items-center justify-between rotate-1 hover:rotate-0">
                                <div className={`w-full h-full ${role.bgColor} flex items-center justify-center relative overflow-hidden ring-4 ring-black/5`}>
                                    {/* Role Icon */}
                                    <role.icon size={48} className="text-white/90 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] transform group-hover:scale-110 transition-transform duration-500" />

                                    {/* Premium Texture Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />
                                </div>
                                <div className="absolute bottom-4 left-0 right-0 text-center px-4">
                                    <h3 className="text-lg font-bold font-heading text-black uppercase tracking-tighter mb-0.5">{role.title}</h3>
                                    <p className="text-gray-500 font-serif italic text-xs">{role.subtitle}</p>
                                </div>
                                {/* Paper Clip Visual */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-12 border-4 border-gray-400 rounded-full z-20 bg-[#1a1a1a]" />
                            </div>

                            {/* Back of Card (Details) */}
                            <div className="absolute inset-0 bg-yellow-500 p-4 shadow-2xl transition-all duration-700 [transform:rotateY(180deg)] [backface-visibility:hidden] group-hover:[transform:rotateY(0deg)] flex flex-col items-center justify-center text-center -rotate-1 border-4 border-white overflow-hidden">
                                <role.icon size={20} className="text-black mb-2 opacity-50" />
                                <h3 className="text-sm font-bold text-black mb-1 uppercase border-b-2 border-black pb-1">{role.title}</h3>
                                <p className="text-black/80 font-medium mb-3 leading-snug text-[11px] italic line-clamp-4">"{role.desc}"</p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectRole({
                                            title: role.title,
                                            icon: role.icon,
                                            color: role.bgColor
                                        });
                                    }}
                                    className="px-4 py-1.5 bg-black text-white font-bold uppercase text-[10px] hover:bg-white hover:text-black transition-colors border-2 border-black tracking-widest">
                                    Apply Now
                                </button>
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
        <section className="py-32 bg-red-950 relative overflow-hidden flex items-center justify-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)" }} />

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

/* ─────────────────── ROLE SELECTION MODAL ─────────────────── */

/* ─────────────────── ROLE SELECTION MODAL ─────────────────── */

/* ─────────────────── ROLE SELECTION MODAL ─────────────────── */

/* ─────────────────── ROLE SELECTION MODAL ─────────────────── */

function RoleSelectionModal({ isOpen, onClose, onSelectRole }: { isOpen: boolean; onClose: () => void; onSelectRole: (role: any) => void }) {
    if (!isOpen) return null;

    const roles = [
        { title: "Actor", icon: Sparkles, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&auto=format&fit=crop", color: "from-blue-600/80 to-black/90" },
        { title: "Actress", icon: Star, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop", color: "from-pink-600/80 to-black/90" },
        { title: "Comic", icon: Laugh, image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=500&auto=format&fit=crop", color: "from-green-600/80 to-black/90" },
        { title: "Singer", icon: Mic2, image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=500&auto=format&fit=crop", color: "from-purple-600/80 to-black/90" },
        { title: "Writer", icon: Feather, image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=500&auto=format&fit=crop", color: "from-amber-600/80 to-black/90" },
        { title: "Director", icon: Clapperboard, image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500&auto=format&fit=crop", color: "from-red-600/80 to-black/90" },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
            {/* Darker, Blurry Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Compact Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        onClick={(e) => e.stopPropagation()} // Prevent close on modal click
                        className="relative w-full max-w-3xl bg-[#0a0a0a] border border-white/20 rounded-3xl overflow-hidden shadow-2xl shadow-yellow-500/10"
                    >
                        {/* Header */}
                        <div className="absolute top-0 left-0 right-0 z-20 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                            <h2 className="text-2xl font-bold font-heading text-white uppercase tracking-wider drop-shadow-md">
                                Cast <span className="text-yellow-500">Selection</span>
                            </h2>
                            <button
                                onClick={onClose}
                                className="pointer-events-auto bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors backdrop-blur-md"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 h-[500px] md:h-[400px]">
                            {roles.map((role, i) => (
                                <motion.div
                                    key={i}
                                    className="group relative cursor-pointer overflow-hidden border-r border-b border-white/10 last:border-r-0"
                                    whileHover="hover"
                                    initial="rest"
                                    animate="rest"
                                    onClick={() => onSelectRole(role)}
                                >
                                    {/* Background Image */}
                                    <motion.div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${role.image})` }}
                                        variants={{
                                            rest: { scale: 1, filter: "grayscale(100%)" },
                                            hover: { scale: 1.1, filter: "grayscale(0%)" }
                                        }}
                                        transition={{ duration: 0.5 }}
                                    />

                                    {/* Gradient Overlay */}
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-t ${role.color} opacity-80 group-hover:opacity-60 transition-opacity duration-300`}
                                    />

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                                        <motion.div
                                            variants={{
                                                rest: { scale: 1, y: 0 },
                                                hover: { scale: 1.2, y: -10 }
                                            }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                            className="mb-3"
                                        >
                                            <role.icon className="w-8 h-8 text-white drop-shadow-lg" />
                                        </motion.div>

                                        <motion.h3
                                            className="text-lg font-bold text-white uppercase tracking-widest text-center"
                                            variants={{
                                                rest: { y: 0 },
                                                hover: { y: -5 }
                                            }}
                                        >
                                            {role.title}
                                        </motion.h3>

                                        <motion.div
                                            className="absolute bottom-6 opacity-0 text-[10px] font-bold bg-white text-black px-3 py-1 rounded-full uppercase tracking-wider"
                                            variants={{
                                                rest: { opacity: 0, y: 10 },
                                                hover: { opacity: 1, y: 0 }
                                            }}
                                        >
                                            Select
                                        </motion.div>
                                    </div>

                                    {/* Selection Flash Effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-white opacity-0"
                                        whileTap={{ opacity: 0.3 }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─────────────────── MAIN PAGE COMPONENT ─────────────────── */

import AuditionFormModal from "../../components/auditions/AuditionFormModal";

export default function AuditionsPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<any>(null);

    const handleRoleSelect = (role: any) => {
        setSelectedRole(role);
        setIsFormOpen(true);
    };

    return (
        <main className="bg-black min-h-screen text-white overflow-x-hidden selection:bg-yellow-500/30">
            <AuditionsHero onOpenModal={() => {
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            }} />
            <RolesSection onSelectRole={handleRoleSelect} />
            <ApplySection />

            <AnimatePresence>
                {isFormOpen && <AuditionFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} selectedRole={selectedRole} />}
            </AnimatePresence>

            {/* Simple Footer */}
            <footer className="py-12 bg-black border-t border-white/10 text-center text-gray-500 text-sm">
                <p>&copy; 2026 GSAA Casting. All rights reserved.</p>
            </footer>
        </main>
    );
}
