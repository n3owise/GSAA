"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionContentProps {
    badge: string;
    badgeColor?: string; // Optional, now mostly unused or for subtle tint
    title: string;
    description: string;
    benefits: string[];
    ctaText: string;
    ctaLink?: string; // Creative liberty: Added generic link support
    gradient?: string; // Kept for types but repurposed for glass effects
    align?: "left" | "right";
}

export default function SectionContent({
    badge,
    title,
    description,
    benefits = [],
    ctaText,
    ctaLink,
    align = "left",
}: SectionContentProps) {
    return (
        <div className={cn("max-w-xl", align === "right" ? "ml-auto" : "mr-auto")}>
            {/* Badge - Minimalist Capsule */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8"
            >
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/90">
                    {badge}
                </span>
            </motion.div>

            {/* Heading - San Francisco Style */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold font-heading text-text-white leading-[1.1] mb-6 tracking-tight"
            >
                {title}
            </motion.h2>

            {/* Description - High Readability */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-text-gray leading-relaxed mb-10 font-light"
            >
                {description}
            </motion.p>

            {/* Benefits - Clean List */}
            <ul className="space-y-5 mb-12">
                {benefits.map((benefit, i) => (
                    <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                        className="flex items-center gap-4 group"
                    >
                        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-white/20 border border-white/30">
                            <CheckCircle2 size={12} className="text-white" strokeWidth={3} />
                        </div>
                        <span className="text-white/80 font-medium group-hover:text-white transition-colors">
                            {benefit}
                        </span>
                    </motion.li>
                ))}
            </ul>

            <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="group relative px-8 py-4 rounded-full bg-white text-black font-semibold text-lg transition-all hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3"
            >
                {ctaText}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
        </div >
    );
}
