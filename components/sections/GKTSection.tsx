"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Hexagon, Zap, Layers, Box } from "lucide-react"; // Using Hexagon for Polygon reference

export default function GKTSection() {
    const [nodes, setNodes] = useState<{ top: number; left: number; size: number }[]>([]);

    useEffect(() => {
        setNodes([...Array(6)].map(() => ({
            top: 20 + Math.random() * 60,
            left: 10 + Math.random() * 80,
            size: 24 + Math.random() * 40,
        })));
    }, []);

    return (
        <section className="relative min-h-[80vh] py-24 flex items-center justify-center overflow-hidden bg-bg-dark">

            {/* Background - Polygon Network Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
                {/* Animated Nodes */}
                {nodes.map((node, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5
                        }}
                        className="absolute text-white/20"
                        style={{
                            top: `${node.top}%`,
                            left: `${node.left}%`,
                        }}
                    >
                        <Hexagon size={node.size} strokeWidth={1} />
                    </motion.div>
                ))}
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">

                {/* Coming Soon Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-12 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-white animate-pulse">
                        Coming Soon
                    </span>
                </motion.div>

                {/* The GKT Coin */}
                <div className="relative mb-16 perspective-1000">
                    <motion.div
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-gray-300 via-white to-gray-400 shadow-[0_0_60px_rgba(255,255,255,0.15)] flex items-center justify-center relative transform-style-3d border-4 border-white/10"
                    >
                        {/* Inner Ring */}
                        <div className="absolute inset-2 rounded-full border border-gray-400/50" />
                        <div className="absolute inset-4 rounded-full border-2 border-dashed border-gray-400/30" />

                        {/* Coin Face */}
                        <div className="flex flex-col items-center justify-center backface-visible">
                            <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-black drop-shadow-sm tracking-tighter">
                                GKT
                            </span>
                            <span className="text-[10px] md:text-xs font-bold text-gray-600 tracking-[0.2em] mt-2">
                                KOMBAT TOKEN
                            </span>
                        </div>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 animate-shine pointer-events-none" />
                    </motion.div>

                    {/* Shadow underneath */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-40 h-8 bg-black/50 blur-xl rounded-[100%]"
                    />
                </div>

                {/* Text Content */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-6 tracking-tighter"
                >
                    GSAA KOMBAT TOKEN
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-text-gray max-w-xl mx-auto mb-10 font-light leading-relaxed"
                >
                    The currency of the arena. Built securely on the
                    <span className="text-white font-medium mx-1 relative inline-flex items-center gap-1">
                        <Hexagon size={14} className="inline fill-current text-white/80" />
                        Polygon
                    </span>
                    Chain for lightning-fast transactions and minimal fees.
                </motion.p>

                {/* Tech Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                        <Hexagon className="text-white" size={20} />
                        <span className="text-sm font-semibold text-white/80">Polygon Network</span>
                    </div>
                    <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                        <Layers className="text-white" size={20} />
                        <span className="text-sm font-semibold text-white/80">Layer 2 Scaling</span>
                    </div>
                    <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                        <Box className="text-white" size={20} />
                        <span className="text-sm font-semibold text-white/80">Utility Token</span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
