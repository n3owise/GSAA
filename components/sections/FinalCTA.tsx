"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Headphones, Gamepad2, Database, ShoppingBag, ArrowRight } from "lucide-react";

export default function FinalCTA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    const featureIcons = [
        { icon: Play, color: "#ffffff" },
        { icon: Headphones, color: "#eeeeee" },
        { icon: Gamepad2, color: "#dddddd" },
        { icon: Database, color: "#cccccc" },
        { icon: ShoppingBag, color: "#bbbbbb" },
    ];

    const [particles, setParticles] = useState<{ top: number, left: number, width: number, height: number, opacity: number, duration: number, delay: number }[]>([]);

    useEffect(() => {
        setParticles([...Array(30)].map(() => ({
            top: Math.random() * 100,
            left: Math.random() * 100,
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            opacity: Math.random() * 0.5,
            duration: 10 + Math.random() * 20,
            delay: Math.random() * 5
        })));
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative py-32 flex flex-col items-center justify-center overflow-hidden bg-bg-black"
        >
            {/* Background Gradient & Particles */}
            {/* Background Gradient & Particles - Subdued */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg-dark to-bg-black" />

            {/* Particle System (Simplified CSS animation) */}
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-white/20 animate-float-particle"
                    style={{
                        top: `${p.top}%`,
                        left: `${p.left}%`,
                        width: `${p.width}px`,
                        height: `${p.height}px`,
                        opacity: p.opacity,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`
                    }}
                />
            ))}

            <motion.div
                style={{ scale, opacity }}
                className="relative z-10 max-w-4xl mx-auto px-6 text-center"
            >
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-heading text-white mb-6">
                    Ready to Start <span className="text-white">Earning?</span>
                </h2>

                <p className="text-base sm:text-xl text-text-gray mb-12 md:mb-16 max-w-2xl mx-auto">
                    Join GSAA Global today and transform entertainment into rewards.
                </p>

                {/* Feature Icons Row */}
                <div className="flex justify-center gap-6 md:gap-10 mb-20 flex-wrap">
                    {featureIcons.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0, rotate: -180 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                            whileHover={{ scale: 1.2, rotate: 10, filter: "brightness(1.5)" }}
                            className="w-16 h-16 rounded-full bg-white/5 backdrop-blur border border-white/10 flex items-center justify-center group"
                        >
                            <item.icon size={28} className="text-white group-hover:scale-110 transition-transform opacity-70 group-hover:opacity-100" />
                        </motion.div>
                    ))}
                </div>

                {/* Main CTA Button - Pure White */}
                <div className="relative inline-block group">
                    <button className="relative z-20 px-8 md:px-12 py-4 md:py-6 rounded-full bg-white text-black font-bold text-base md:text-xl tracking-wide hover:scale-105 hover:bg-gray-100 transition-all duration-300 flex items-center gap-3 md:gap-4">
                        Join GSAA Global
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>

                    {/* Orbiting Elements */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute inset-0 animate-spin-slow"
                                style={{ animationDuration: `${15 + i * 5}s`, animationDirection: i % 2 === 0 ? 'normal' : 'reverse' }}
                            >
                                <div
                                    className="absolute bg-white/50 w-2 h-2 rounded-full"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: `translate(-50%, -50%) translateX(${140 + i * 20}px)`
                                    }}
                                />
                            </div>
                        ))}
                        <div className="absolute inset-0 rounded-full border border-white/5 scale-150" />
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-white/40 text-sm"
                >
                    No credit card required • Join thousands of earners
                </motion.p>
            </motion.div>
        </section>
    );
}
