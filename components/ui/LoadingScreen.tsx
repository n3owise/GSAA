"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time or wait for resources
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500); // 2.5s loading

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-bg-dark flex flex-col items-center justify-center"
                >
                    {/* Logo Animation */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 relative"
                    >
                        <span className="text-4xl md:text-6xl font-bold font-heading tracking-tighter text-white">
                            GSAA <span className="text-primary-purple">GLOBAL</span>
                        </span>
                    </motion.div>

                    {/* Spinner */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-16 h-16 rounded-full border-4 border-white/10 border-t-primary-blue bg-transparent"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 text-white/50 text-sm font-medium tracking-widest uppercase"
                    >
                        Loading Experience
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
