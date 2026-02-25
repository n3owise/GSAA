"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesIntro() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.fromTo(
                titleRef.current,
                { opacity: 0, y: 60, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power4.out" }
            );

            tl.fromTo(
                descRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1, ease: "power4.out" },
                "-=0.8"
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[50vh] flex flex-col items-center justify-center py-32 px-6 bg-gradient-to-b from-bg-dark to-bg-navy"
        >
            <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
                <h2
                    ref={titleRef}
                    className="text-4xl md:text-6xl font-bold font-heading text-white opacity-0"
                >
                    Our Services & Features
                </h2>

                <p
                    ref={descRef}
                    className="text-lg md:text-xl text-text-gray leading-relaxed max-w-2xl mx-auto opacity-0"
                >
                    Discover five revolutionary ways to earn while you enjoy premium entertainment. Each interaction rewards you.
                </p>
            </div>

            {/* Floating Elements (Decorative) */}
            <div className="absolute top-1/2 left-10 w-20 h-20 bg-primary-purple/10 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-10 right-20 w-32 h-32 bg-primary-blue/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </section>
    );
}
