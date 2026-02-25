"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Check, ChevronRight, ChevronLeft, Sparkles, Star, Mic2, Laugh, Feather, Clapperboard, Film } from "lucide-react";

interface AuditionFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedRole: {
        title: string;
        color: string;
        icon: any;
        image: string;
    } | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// ROLE-SPECIFIC FIELD CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

type FieldType = "text" | "number" | "select" | "textarea" | "file";

interface FieldConfig {
    name: string;
    label: string;
    type: FieldType;
    options?: string[];
    placeholder?: string;
    required?: boolean;
    accept?: string; // For file inputs
    helperText?: string;
}

const COMMON_FIELDS: FieldConfig[] = [
    { name: "fullName", label: "Full Name", type: "text", required: true, placeholder: "Enter your full name" },
    { name: "age", label: "Age", type: "number", required: true, placeholder: "e.g., 25" },
    { name: "city", label: "Current City", type: "text", required: true, placeholder: "e.g., Mumbai" },
    { name: "phone", label: "Phone Number", type: "text", required: true, placeholder: "+91 XXXXX XXXXX" },
    { name: "email", label: "Email Address", type: "text", required: true, placeholder: "name@example.com" },
    { name: "instagram", label: "Instagram Handle", type: "text", required: true, placeholder: "@username" },
];

const ROLE_SPECIFIC_FIELDS: Record<string, { stats: FieldConfig[], uploads: FieldConfig[] }> = {
    "Actor": {
        stats: [
            { name: "height", label: "Height (ft/in)", type: "text", required: true, placeholder: "e.g., 5'10\"" },
            { name: "weight", label: "Weight (kg)", type: "number", required: true, placeholder: "e.g., 70" },
            { name: "eyeColor", label: "Eye Color", type: "text", required: true, placeholder: "e.g., Brown" },
            { name: "hairColor", label: "Hair Color", type: "text", required: true, placeholder: "e.g., Black" },
            { name: "skinTone", label: "Complexion", type: "select", options: ["Fair", "Wheatish", "Dusky", "Dark"], required: true },
            { name: "experience", label: "Experience (Years)", type: "number", required: true, placeholder: "0 for Fresher" },
            { name: "primaryInterest", label: "Interest", type: "select", options: ["Lead Role", "Negative Role", "Both"], required: true },
        ],
        uploads: [
            { name: "headshot", label: "Close-up Shot", type: "file", accept: "image/*", required: true, helperText: "Front-facing, high-res, no filters." },
            { name: "profileShot", label: "Side Profile Shot", type: "file", accept: "image/*", required: true, helperText: "Left or Right side view." },
            { name: "fullBody", label: "Full-Length Shot", type: "file", accept: "image/*", required: true, helperText: "Show full posture." },
            { name: "auditionTape", label: "Intro Video (30-60s)", type: "file", accept: "video/*", required: true, helperText: "Name, Age, Height, and a brief Hello." },
        ]
    },
    "Actress": { // Same as Actor for now
        stats: [
            { name: "height", label: "Height (ft/in)", type: "text", required: true, placeholder: "e.g., 5'6\"" },
            { name: "weight", label: "Weight (kg)", type: "number", required: true, placeholder: "e.g., 55" },
            { name: "eyeColor", label: "Eye Color", type: "text", required: true, placeholder: "e.g., Brown" },
            { name: "hairColor", label: "Hair Color", type: "text", required: true, placeholder: "e.g., Brown" },
            { name: "skinTone", label: "Complexion", type: "select", options: ["Fair", "Wheatish", "Dusky", "Dark"], required: true },
            { name: "experience", label: "Experience (Years)", type: "number", required: true, placeholder: "0 for Fresher" },
            { name: "primaryInterest", label: "Interest", type: "select", options: ["Lead Role", "Negative Role", "Both"], required: true },
        ],
        uploads: [
            { name: "headshot", label: "Close-up Shot", type: "file", accept: "image/*", required: true, helperText: "Front-facing, high-res, no filters." },
            { name: "profileShot", label: "Side Profile Shot", type: "file", accept: "image/*", required: true, helperText: "Left or Right side view." },
            { name: "fullBody", label: "Full-Length Shot", type: "file", accept: "image/*", required: true, helperText: "Show full posture." },
            { name: "auditionTape", label: "Intro Video (30-60s)", type: "file", accept: "video/*", required: true, helperText: "Name, Age, Height, and a brief Hello." },
        ]
    },
    "Comic": {
        stats: [
            { name: "comedyStyle", label: "Comedy Style", type: "select", options: ["Stand-up", "Slapstick", "Mimicry", "Satire", "Improvisational"], required: true },
            { name: "experience", label: "Years in Comedy", type: "number", required: true, placeholder: "e.g., 3" },
        ],
        uploads: [
            { name: "performanceReel", label: "Comedy Set / Reel", type: "file", accept: "video/*", required: true, helperText: "1-2 minute clip of your best material." },
            { name: "reactionVideo", label: "Reaction Video", type: "file", accept: "video/*", required: false, helperText: "Show 3 distinct reactions (Surprise, Confusion, Fake Laugh)." },
        ]
    },
    "Singer": {
        stats: [
            { name: "vocalRange", label: "Vocal Range", type: "select", options: ["Soprano", "Mezzo-Soprano", "Alto", "Tenor", "Baritone", "Bass"], required: true },
            { name: "genres", label: "Genre Expertise", type: "text", required: true, placeholder: "e.g., Classical, Pop, Sufi" },
            { name: "instruments", label: "Instruments Played", type: "text", required: false, placeholder: "e.g., Guitar, Piano" },
        ],
        uploads: [
            { name: "rawVocal", label: "Raw Vocal Demo", type: "file", accept: "audio/*", required: true, helperText: "Unplugged, no auto-tune." },
            { name: "performanceVideo", label: "Live Performance Video", type: "file", accept: "video/*", required: false, helperText: "Singing live." },
        ]
    },
    "Writer": {
        stats: [
            { name: "specialization", label: "Specialization", type: "select", options: ["Screenplay", "Dialogue", "Lyrics", "Story"], required: true },
            { name: "genre", label: "Preferred Genre", type: "text", required: true, placeholder: "e.g., Thriller, Comedy" },
        ],
        uploads: [
            { name: "scriptSample", label: "Script Sample (PDF)", type: "file", accept: ".pdf", required: true, helperText: "5-10 pages of a scene." },
            { name: "logline", label: "Logline / Concept", type: "textarea", required: true, placeholder: "2-sentence summary of your best original idea." },
        ]
    },
    "Director": {
        stats: [
            { name: "yearsDirecting", label: "Years Directing", type: "number", required: true, placeholder: "e.g., 5" },
            { name: "style", label: "Preferred Style", type: "text", required: true, placeholder: "e.g., Cinematic, Documentary" },
        ],
        uploads: [
            { name: "reel", label: "Director's Reel", type: "file", accept: "video/*", required: true, helperText: "2-3 minute edit of your best work." },
            { name: "visionStatement", label: "Vision Statement (PDF)", type: "file", accept: ".pdf", required: false, helperText: "Your directorial philosophy." },
        ]
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function AuditionFormModal({ isOpen, onClose, selectedRole }: AuditionFormModalProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Reset state when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Pre-fill some data for testing if needed, or just reset
        } else {
            document.body.style.overflow = "unset";
            setStep(1);
            setFormData({});
            setIsSuccess(false);
            setIsSubmitting(false);
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen || !selectedRole) return null;

    const roleConfig = ROLE_SPECIFIC_FIELDS[selectedRole.title] || ROLE_SPECIFIC_FIELDS["Actor"]; // Default to Actor if not found

    // Animation Variants
    const formVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        },
        exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, [fieldName]: e.target.files![0] }));
        }
    };

    const handleNext = () => {
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    // ─────────────────────────────────────────────────────────────────────────

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Container */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className={`relative w-full max-w-2xl ${selectedRole.color} rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh] ring-1 ring-white/10`}
            >
                {/* Dark Vignette Overlay to maintain contrast */}
                <div className="absolute inset-0 bg-black/60 pointer-events-none" />

                {/* Glowing Animated Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-20 blur-xl pointer-events-none`} />
                <div className="absolute inset-0 border-2 border-transparent rounded-2xl z-10 pointer-events-none" style={{
                    background: `linear-gradient(transparent, transparent) padding-box, linear-gradient(to right bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.05)) border-box`
                }} />
                {/* Header */}
                <div className="relative px-8 py-6 border-b border-white/10 z-20">
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20">
                                <selectedRole.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white uppercase tracking-wider">{selectedRole.title} Application</h2>
                                <p className="text-xs text-white/70 font-medium tracking-wide">Step {step} of 4</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/5">
                    <motion.div
                        className="h-full bg-gradient-to-r from-yellow-400 to-red-500"
                        initial={{ width: "25%" }}
                        animate={{ width: `${(step / 4) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Content Area - Scrollable */}
                <div data-lenis-prevent="true" className="flex-1 overflow-y-auto p-8 custom-scrollbar relative min-h-0 bg-black/20 z-20">
                    {/* Ambient Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                    <AnimatePresence mode="wait">
                        {!isSuccess ? (
                            <motion.div
                                key={step}
                                variants={formVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="space-y-8 relative z-10"
                            >
                                {step === 1 && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">1</span>
                                            Personal Details
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {COMMON_FIELDS.map((field) => (
                                                <motion.div variants={itemVariants} key={field.name} className={`group ${field.name === "fullName" || field.name === "address" ? "md:col-span-2" : ""}`}>
                                                    <label className="block text-xs font-bold text-white/70 mb-2 uppercase tracking-widest pl-1 group-focus-within:text-white transition-colors">{field.label}</label>
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-focus-within:opacity-100 rounded-xl transition-opacity duration-500 pointer-events-none" />
                                                        <input
                                                            type={field.type}
                                                            name={field.name}
                                                            value={formData[field.name] || ""}
                                                            onChange={handleInputChange}
                                                            placeholder={field.placeholder}
                                                            className="relative w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-white/50 focus:bg-white/10 focus:ring-4 focus:ring-white/5 transition-all duration-300 font-medium backdrop-blur-md shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] hover:border-white/20"
                                                        />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">2</span>
                                            Role Specifics
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {roleConfig.stats.map((field) => (
                                                <motion.div variants={itemVariants} key={field.name} className="space-y-2 group">
                                                    <label className="block text-xs font-bold text-white/70 uppercase tracking-widest pl-1 group-focus-within:text-white transition-colors">{field.label}</label>
                                                    {field.type === "select" ? (
                                                        <div className="relative">
                                                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-focus-within:opacity-100 rounded-xl transition-opacity duration-500 pointer-events-none" />
                                                            <select
                                                                name={field.name}
                                                                value={formData[field.name] || ""}
                                                                onChange={handleInputChange}
                                                                className="relative w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white appearance-none focus:outline-none focus:border-white/50 focus:bg-white/10 focus:ring-4 focus:ring-white/5 transition-all duration-300 backdrop-blur-md shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] hover:border-white/20 cursor-pointer"
                                                            >
                                                                <option value="" disabled className="text-gray-500">Select an option</option>
                                                                {field.options?.map(opt => (
                                                                    <option key={opt} value={opt} className="bg-[#111] text-white py-2">{opt}</option>
                                                                ))}
                                                            </select>
                                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 group-hover:text-white transition-colors">▼</div>
                                                        </div>
                                                    ) : (
                                                        <div className="relative">
                                                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-focus-within:opacity-100 rounded-xl transition-opacity duration-500 pointer-events-none" />
                                                            <input
                                                                type={field.type}
                                                                name={field.name}
                                                                value={formData[field.name] || ""}
                                                                onChange={handleInputChange}
                                                                placeholder={field.placeholder}
                                                                className="relative w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-white/50 focus:bg-white/10 focus:ring-4 focus:ring-white/5 transition-all duration-300 font-medium backdrop-blur-md shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] hover:border-white/20"
                                                            />
                                                        </div>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">3</span>
                                            Media Uploads
                                        </h3>
                                        <div className="grid grid-cols-1 gap-6">
                                            {roleConfig.uploads.map((field) => (
                                                <motion.div variants={itemVariants} key={field.name} className="relative group">
                                                    <label className="block text-xs font-bold text-white/70 mb-2 uppercase tracking-widest pl-1">{field.label}</label>
                                                    <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-8 hover:border-white/50 hover:bg-white/5 transition-all duration-300 text-center cursor-pointer overflow-hidden bg-black/50 backdrop-blur-md shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">
                                                        <div className={`absolute inset-0 bg-gradient-to-br ${selectedRole.color} opacity-0 group-hover:opacity-[0.15] transition-opacity duration-500 rounded-2xl pointer-events-none`} />
                                                        <input
                                                            type="file"
                                                            accept={field.accept}
                                                            onChange={(e) => handleFileChange(e, field.name)}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                        />
                                                        <div className="flex flex-col items-center justify-center gap-2">
                                                            {formData[field.name] ? (
                                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center ring-2 ring-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                                                                    <Check className="w-6 h-6" />
                                                                </motion.div>
                                                            ) : (
                                                                <div className="w-12 h-12 rounded-full bg-white/10 text-white/50 group-hover:text-white group-hover:bg-white/20 flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                                                    <Upload className="w-6 h-6" />
                                                                </div>
                                                            )}
                                                            <p className="text-sm font-bold text-white/80 group-hover:text-white transition-colors mt-2">
                                                                {formData[field.name] ? formData[field.name].name : "Click to select or drag and drop"}
                                                            </p>
                                                            <p className="text-xs text-white/40 max-w-[200px] text-center">{field.helperText}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="space-y-6 text-center py-8">
                                        <div className="relative w-24 h-24 mx-auto mb-6">
                                            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-50" />
                                            <div className="relative z-10 w-full h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                                <selectedRole.icon className="w-12 h-12 text-white drop-shadow-md" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Ready to Submit?</h3>
                                            <p className="text-white/60 max-w-sm mx-auto">
                                                Please review your details. Once submitted, our casting team will review your profile for the
                                                <span className="text-yellow-500 font-bold mx-1">{selectedRole.title}</span> role.
                                            </p>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-4 text-left border border-white/10">
                                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Summary</h4>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-white/40 block text-xs">Name</span>
                                                    <span className="text-white font-medium">{formData.fullName || "-"}</span>
                                                </div>
                                                <div>
                                                    <span className="text-white/40 block text-xs">Email</span>
                                                    <span className="text-white font-medium">{formData.email || "-"}</span>
                                                </div>
                                                <div>
                                                    <span className="text-white/40 block text-xs">City</span>
                                                    <span className="text-white font-medium">{formData.city || "-"}</span>
                                                </div>
                                                <div>
                                                    <span className="text-white/40 block text-xs">Phone</span>
                                                    <span className="text-white font-medium">{formData.phone || "-"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-12 text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                                    transition={{ type: "spring", delay: 0.2 }}
                                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-500/30"
                                >
                                    <Check className="w-12 h-12 text-white" strokeWidth={4} />
                                </motion.div>
                                <h3 className="text-3xl font-bold text-white mb-2">Application Received!</h3>
                                <p className="text-white/60 mb-8 max-w-sm">
                                    Your profile has been sent to our casting directors. We will contact you if you are shortlisted.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    Close Window
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Actions */}
                {!isSuccess && (
                    <div className="p-6 border-t border-white/10 bg-black/20 flex justify-between items-center">
                        {step > 1 ? (
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-medium text-sm"
                            >
                                <ChevronLeft className="w-4 h-4" /> Back
                            </button>
                        ) : (
                            <div />
                        )}

                        {step < 4 ? (
                            <button
                                onClick={handleNext}
                                className="group relative bg-white text-black font-bold py-2.5 px-6 rounded-full hover:bg-gray-200 transition-all flex items-center gap-2"
                            >
                                Next Step
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-50 group z-20"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>Submit Application</>
                                )}
                            </button>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
