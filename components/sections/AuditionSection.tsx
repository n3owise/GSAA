"use client";

import { motion } from "framer-motion";
import SectionContent from "@/components/ui/SectionContent";
import { Mic, PenTool, Smile, Clapperboard, Video, ArrowRight } from "lucide-react";
import Link from "next/link";

const roles = [
    { title: "Actor", subtitle: "Lead & Negative Roles", icon: Clapperboard },
    { title: "Actress", subtitle: "Lead & Negative Roles", icon: Video },
    { title: "Comic Role", subtitle: "Stand-up / Character Artist", icon: Smile },
    { title: "Singer / Composer", subtitle: "Vocals & Music Production", icon: Mic },
    { title: "Writer", subtitle: "Script & Screenplay", icon: PenTool },
];

export default function AuditionSection() {
    return (
        <section className="relative min-h-screen py-24 flex items-center overflow-hidden bg-bg-navy">
            {/* Spotlight Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[800px] bg-gradient-to-b from-white/5 to-transparent pointer-events-none blur-3xl" />

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

                {/* Content Side (Left) */}
                <div>
                    <SectionContent
                        badge="CASTING CALL"
                        title="Your Role Awaits."
                        description="We are scouting for the next generation of talent. Whether you thrive in front of the lens or behind the scenes, GSAA is your platform to shine."
                        benefits={[
                            "Global Production Exposure",
                            "Professional Mentorship",
                            "Direct Industry Access",
                        ]}
                        ctaText="Register for Audition"
                        ctaLink="/audition" // Placeholder link
                        align="left"
                    />

                    {/* Roles List */}
                    <div className="mt-12 space-y-3">
                        {roles.map((role, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                                        <role.icon size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium">{role.title}</h4>
                                        <p className="text-white/40 text-xs">{role.subtitle}</p>
                                    </div>
                                </div>
                                <ArrowRight size={16} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Visual Side (Right) - Animated Clapperboard */}
                <div className="relative flex justify-center items-center h-[500px]">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-80 h-72"
                    >
                        {/* Clapperboard Stick (Top) */}
                        <motion.div
                            animate={{ rotate: [0, -20, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                                ease: "easeInOut",
                                times: [0, 0.2, 0.4] // Snap shut effect
                            }}
                            className="absolute top-0 left-0 w-full h-12 bg-white border-2 border-black origin-bottom-left z-20 flex overflow-hidden shadow-xl"
                            style={{ transformOrigin: "0% 100%" }}
                        >
                            {/* Chevron Pattern */}
                            <div className="absolute inset-0 flex">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="flex-1 bg-black -skew-x-[30deg] border-r-2 border-white translate-x-4"></div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Clapperboard Body (Bottom) */}
                        <div className="absolute top-12 left-0 w-full h-60 bg-neutral-900 border-t-4 border-white rounded-b-lg shadow-2xl flex flex-col p-6 text-white font-mono">
                            <div className="flex justify-between items-end border-b-2 border-white/20 pb-4 mb-4">
                                <div>
                                    <p className="text-xs text-white/40 uppercase mb-1">Production</p>
                                    <h3 className="text-xl font-bold tracking-widest">GSAA ORIGINAL</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-white/40 uppercase mb-1">Director</p>
                                    <h3 className="text-lg font-bold">N3OWISE</h3>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="border border-white/20 p-2 rounded">
                                    <p className="text-[10px] text-white/40 uppercase">Scene</p>
                                    <p className="text-2xl font-bold">24</p>
                                </div>
                                <div className="border border-white/20 p-2 rounded">
                                    <p className="text-[10px] text-white/40 uppercase">Take</p>
                                    <motion.p
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="text-2xl font-bold"
                                    >
                                        1
                                    </motion.p>
                                </div>
                                <div className="border border-white/20 p-2 rounded">
                                    <p className="text-[10px] text-white/40 uppercase">Roll</p>
                                    <p className="text-2xl font-bold">A01</p>
                                </div>
                            </div>

                            <div className="mt-auto flex justify-between items-center text-xs text-white/30 pt-4">
                                <span>DATE: 2026/02/19</span>
                                <span>FPS: 60</span>
                            </div>
                        </div>

                    </motion.div>

                    {/* Floating Film Reel / Deco Elements for depth */}
                    <motion.div
                        animate={{ y: [0, -15, 0], rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 right-0 w-32 h-32 border-4 border-dashed border-white/5 rounded-full -z-10"
                    />
                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[-20px] left-[-20px] w-24 h-24 bg-white/5 blur-xl rounded-full -z-10"
                    />

                </div>
            </div>
        </section>
    );
}
