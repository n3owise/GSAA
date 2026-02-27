"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionContent from "@/components/ui/SectionContent";
import { Mic, PenTool, Smile, Clapperboard, Video, ArrowRight, X, Star, Clock, CheckCircle, Film, Music, BookOpen, Laugh, Camera } from "lucide-react";

/* ─── Role definitions with popup content ─── */
const roles = [
    {
        title: "Actor",
        subtitle: "Lead & Negative Roles",
        icon: Clapperboard,
        accent: "#f59e0b",       // amber / cinematic gold
        bg: "rgba(245,158,11,0.06)",
        border: "rgba(245,158,11,0.2)",
        popupIcon: Film,
        tagline: "Lights. Camera. Action.",
        description: "Step into lead roles for GSAA original productions, web series, and feature films. We're looking for actors who can command the screen — heroes, villains, anti-heroes welcome.",
        details: [
            { label: "Format", value: "Scene reading + improvisation round" },
            { label: "Age Range", value: "18 – 40 years" },
            { label: "Experience", value: "Fresher to experienced" },
            { label: "What to bring", value: "Portfolio / showreel" },
        ],
        tags: ["Feature Films", "Web Series", "Negative Roles"],
    },
    {
        title: "Actress",
        subtitle: "Lead & Negative Roles",
        icon: Video,
        accent: "#ec4899",       // pink / glamour
        bg: "rgba(236,72,153,0.06)",
        border: "rgba(236,72,153,0.2)",
        popupIcon: Camera,
        tagline: "Own the Frame.",
        description: "GSAA is scouting for powerful female leads and compelling antagonists for our growing slate of original content. Bring your presence, bring your range.",
        details: [
            { label: "Format", value: "Script reading + camera test" },
            { label: "Age Range", value: "16 – 38 years" },
            { label: "Experience", value: "All levels welcome" },
            { label: "What to bring", value: "Portfolio / photographs" },
        ],
        tags: ["Lead Roles", "Character Drama", "Feature Films"],
    },
    {
        title: "Comic Role",
        subtitle: "Stand-up / Character Artist",
        icon: Smile,
        accent: "#facc15",       // yellow / comedy
        bg: "rgba(250,204,21,0.06)",
        border: "rgba(250,204,21,0.2)",
        popupIcon: Laugh,
        tagline: "Make Them Laugh.",
        description: "Got impeccable timing? GSAA needs comedians, mimics, and character artists for sketch comedy, sitcoms, and stand-up specials on the platform.",
        details: [
            { label: "Format", value: "2-min open mic set or character demo" },
            { label: "Age Range", value: "Any age" },
            { label: "Style", value: "Stand-up, improv, character art" },
            { label: "What to bring", value: "A killer punchline" },
        ],
        tags: ["Sitcoms", "Stand-up Specials", "Sketch Comedy"],
    },
    {
        title: "Singer / Composer",
        subtitle: "Vocals & Music Production",
        icon: Mic,
        accent: "#a78bfa",       // purple / music
        bg: "rgba(167,139,250,0.06)",
        border: "rgba(167,139,250,0.2)",
        popupIcon: Music,
        tagline: "Your Voice, Our Stage.",
        description: "Whether you're a playback singer, original artist, or music composer, GSAA's music vertical gives you a platform to reach millions and earn from every stream.",
        details: [
            { label: "Format", value: "Live audition or recorded demo" },
            { label: "Genre", value: "All genres considered" },
            { label: "Requirements", value: "Voice range demo / composition sample" },
            { label: "Bonus", value: "Royalties on streams post-launch" },
        ],
        tags: ["Playback", "Original Music", "Composition"],
    },
    {
        title: "Writer",
        subtitle: "Script & Screenplay",
        icon: PenTool,
        accent: "#34d399",       // emerald / ink
        bg: "rgba(52,211,153,0.06)",
        border: "rgba(52,211,153,0.2)",
        popupIcon: BookOpen,
        tagline: "Write the Stories We Tell.",
        description: "Great stories start on paper. GSAA is looking for talented writers to craft screenplays, web series scripts, dialogue, and original story concepts for our productions.",
        details: [
            { label: "Format", value: "Submit a 5-page sample script" },
            { label: "Type", value: "Feature, Web Series, Short Film" },
            { label: "Tools", value: "Final Draft, Fountain, or Word" },
            { label: "Opportunity", value: "Script credit + production deal" },
        ],
        tags: ["Screenplays", "Web Series", "Story Development"],
    },
];

/* ─── Role Card with inline expansion ─── */
function RoleCard({ role, index }: { role: typeof roles[0]; index: number }) {
    const [open, setOpen] = useState(false);
    const Icon = role.icon;
    const PopupIcon = role.popupIcon;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative rounded-xl border overflow-hidden transition-all duration-300 cursor-pointer select-none"
            style={{
                background: open ? `linear-gradient(135deg, #0d0d0d 0%, ${role.bg} 100%)` : "rgba(255,255,255,0.03)",
                borderColor: open ? role.border : "rgba(255,255,255,0.06)",
                boxShadow: open ? `0 0 30px ${role.accent}12` : "none",
            }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onClick={() => setOpen((v) => !v)}
        >
            {/* Glow accent bar on left edge when open */}
            <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl transition-opacity duration-300"
                style={{ background: role.accent, opacity: open ? 1 : 0 }}
            />

            {/* Header row — always visible */}
            <div className="flex items-center justify-between p-4 pl-5">
                <div className="flex items-center gap-4">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                            background: open ? `${role.accent}20` : "rgba(255,255,255,0.08)",
                            border: open ? `1px solid ${role.accent}40` : "1px solid transparent",
                        }}
                    >
                        <Icon size={18} style={{ color: open ? role.accent : "white" }} />
                    </div>
                    <div>
                        <h4 className="text-white font-medium text-sm">{role.title}</h4>
                        <p className="text-white/40 text-xs">{role.subtitle}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 pr-1">
                    {!open && (
                        <span className="hidden sm:flex items-center gap-1 text-[10px] text-white/20 font-mono">
                            <Star size={9} /> hover to know more
                        </span>
                    )}
                    <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
                        <ArrowRight size={16} style={{ color: open ? role.accent : "rgba(255,255,255,0.2)" }} />
                    </motion.div>
                </div>
            </div>

            {/* Expandable detail section */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 pt-1 relative">
                            {/* Glow blob */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-3xl opacity-15 pointer-events-none"
                                style={{ background: role.accent }} />

                            {/* Tagline + icon */}
                            <div className="flex items-center gap-2 mb-3">
                                <PopupIcon size={13} style={{ color: role.accent }} />
                                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: role.accent }}>
                                    {role.tagline}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-white/55 text-xs leading-relaxed mb-4">{role.description}</p>

                            {/* Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                {role.details.map((d, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <CheckCircle size={10} style={{ color: role.accent }} className="mt-0.5 shrink-0" />
                                        <span className="text-[11px] text-white/40">{d.label}:&nbsp;
                                            <span className="text-white/75">{d.value}</span>
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5">
                                {role.tags.map((tag, i) => (
                                    <span key={i}
                                        className="px-2 py-0.5 text-[10px] font-semibold rounded-full"
                                        style={{ background: `${role.accent}15`, color: role.accent, border: `1px solid ${role.accent}25` }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}


/* ─── Section ─── */
export default function AuditionSection() {
    return (
        <section className="relative py-28 overflow-hidden bg-bg-navy">
            {/* Spotlight Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[800px] bg-gradient-to-b from-white/5 to-transparent pointer-events-none blur-3xl" />

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative z-10">

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
                        ctaLink="/auditions"
                        align="left"
                    />

                    {/* Mobile hint */}
                    <p className="mt-6 text-[11px] text-white/25 font-mono flex items-center gap-1.5 sm:hidden">
                        <Clock size={10} /> Tap a role below to know more
                    </p>

                    {/* Roles List */}
                    <div className="mt-8 space-y-3">
                        {roles.map((role, i) => (
                            <RoleCard key={i} role={role} index={i} />
                        ))}
                    </div>
                </div>

                {/* Visual Side (Right) - Animated Clapperboard */}
                <div className="relative flex justify-center items-start h-[500px] pt-6">

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
                                times: [0, 0.2, 0.4]
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
                                    <p className="text-xs text-white/40 uppercase mb-1">Production House</p>
                                    <h3 className="text-xl font-bold tracking-widest">GSAA Global Pvt. Ltd.</h3>
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

                    {/* Floating Deco */}
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
