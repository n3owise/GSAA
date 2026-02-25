"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionContent from "@/components/ui/SectionContent";
import { ShoppingCart, Shirt, Smartphone, Droplet, Watch, Headphones, Glasses, IndianRupee, X, Receipt, ShoppingBag } from "lucide-react";

const storeItems = [
    { id: 1, name: "Premium Shirt", icon: Shirt, price: 2500, cashbackRate: 0.05, bg: "from-blue-500/20 to-cyan-500/20", color: "text-cyan-400" },
    { id: 2, name: "Smartphone X", icon: Smartphone, price: 45000, cashbackRate: 0.02, bg: "from-purple-500/20 to-pink-500/20", color: "text-pink-400" },
    { id: 3, name: "Luxury Perfume", icon: Droplet, price: 3500, cashbackRate: 0.10, bg: "from-amber-500/20 to-orange-500/20", color: "text-amber-400" },
    { id: 4, name: "Smartwatch Pro", icon: Watch, price: 5000, cashbackRate: 0.05, bg: "from-emerald-500/20 to-teal-500/20", color: "text-emerald-400" },
    { id: 5, name: "Pro Headphones", icon: Headphones, price: 8000, cashbackRate: 0.05, bg: "from-red-500/20 to-rose-500/20", color: "text-rose-400" },
    { id: 6, name: "Designer Shades", icon: Glasses, price: 2000, cashbackRate: 0.15, bg: "from-indigo-500/20 to-blue-500/20", color: "text-indigo-400" },
    { id: 7, name: "Gaming Console", icon: Smartphone, price: 50000, cashbackRate: 0.03, bg: "from-green-500/20 to-emerald-500/20", color: "text-green-400" },
    { id: 8, name: "Running Shoes", icon: Shirt, price: 6000, cashbackRate: 0.08, bg: "from-orange-500/20 to-red-500/20", color: "text-orange-400" },
    { id: 9, name: "4K Camera", icon: Smartphone, price: 85000, cashbackRate: 0.02, bg: "from-blue-600/20 to-indigo-600/20", color: "text-blue-500" },
    { id: 10, name: "Wireless Earbuds", icon: Headphones, price: 3500, cashbackRate: 0.12, bg: "from-pink-500/20 to-rose-500/20", color: "text-pink-400" },
];

interface CartItem {
    id: number;
    item: typeof storeItems[0];
}

interface FlyingItem {
    id: number;
    startX: number;
    startY: number;
    targetX: number;
    targetY: number;
    icon: any;
    color: string;
}

export default function ShopToEarn() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
    const [clickCount, setClickCount] = useState(0);
    const [view, setView] = useState<"store" | "cart" | "bill">("store"); // Manage app state
    const [isGeneratingBill, setIsGeneratingBill] = useState(false);

    const cartRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const bottomCartRef = useRef<HTMLDivElement>(null);
    const storeScrollRef = useRef<HTMLDivElement>(null);
    const cartScrollRef = useRef<HTMLDivElement>(null);
    const billScrollRef = useRef<HTMLDivElement>(null);

    // Manual wheel scroll handler — always trap scroll inside the widget
    const handleWheelScroll = (e: React.WheelEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
        const el = e.currentTarget;
        if (!el) return;
        el.scrollTop += e.deltaY;
    };

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, item: typeof storeItems[0]) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const startX = e.clientX;
        const startY = e.clientY;

        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight - 100; // Default lower target

        if (bottomCartRef.current) {
            const bottomCartRect = bottomCartRef.current.getBoundingClientRect();
            targetX = bottomCartRect.left + (bottomCartRect.width / 2);
            targetY = bottomCartRect.top + 10; // Target the bottom area
        }

        const newFlyId = clickCount + 1;
        setClickCount(newFlyId);

        setFlyingItems(prev => [...prev, {
            id: newFlyId,
            startX,
            startY,
            targetX,
            targetY,
            icon: item.icon,
            color: item.color
        }]);

        // Add to cart after animation
        setTimeout(() => {
            setFlyingItems(prev => prev.filter(i => i.id !== newFlyId));
            setCart(prev => [...prev, { id: newFlyId, item }]);
        }, 800);
    };

    const handleCheckout = () => {
        if (cart.length === 0) return;
        setIsGeneratingBill(true);
        setTimeout(() => {
            setIsGeneratingBill(false);
            setView("bill");
        }, 1500); // Simulate processing time
    };

    const closeBill = () => {
        setView("store");
        setCart([]); // Clear cart
    };

    const totalSpent = cart.reduce((sum, current) => sum + current.item.price, 0);
    const totalCashback = cart.reduce((sum, current) => sum + (current.item.price * current.item.cashbackRate), 0);

    return (
        <section ref={containerRef} className="relative min-h-screen py-24 flex items-center overflow-hidden bg-[#0a0a0f]">
            {/* Ambient Background */}
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10 w-full h-full">

                {/* Visual Side (Left) - Interactive App Widget */}
                <div className="relative order-2 lg:order-1 flex justify-center perspective-1000 h-full">
                    <motion.div
                        className="relative w-full max-w-[340px] h-[600px] bg-[#0c0c0e] rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5),inset_0_2px_1px_rgba(255,255,255,0.1)] p-4 flex flex-col border-[8px] border-[#222] overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Status Bar Mock */}
                        <div className="flex justify-between items-center px-4 pt-1 pb-4 text-[10px] text-white/50 font-medium">
                            <span>9:41</span>
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-white/20" />
                                <div className="w-3 h-3 rounded-full bg-white/20" />
                                <div className="w-4 h-3 rounded-sm bg-white/80" />
                            </div>
                        </div>

                        {/* App Content Area */}
                        <div className="relative flex-1 flex flex-col bg-black/40 rounded-[2rem] border border-white/5 overflow-hidden">

                            {/* Header */}
                            <div className="flex justify-between items-center p-5 border-b border-white/5 bg-white/5 backdrop-blur-md z-10 shrink-0">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    <ShoppingBag className="text-blue-400" size={20} />
                                    {view === "cart" ? "Your Cart" : view === "bill" ? "Receipt" : "GSAA SHOP"}
                                </h2>

                                {view === "store" && (
                                    <motion.button
                                        ref={cartRef}
                                        onClickCapture={() => setView("cart")}
                                        className="relative p-2 rounded-full bg-black/50 border border-white/10 hover:bg-white/10 transition"
                                        animate={cart.length > 0 ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ShoppingCart size={18} className="text-white" />
                                        <AnimatePresence>
                                            {cart.length > 0 && (
                                                <motion.span
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                    className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white"
                                                >
                                                    {cart.length}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                )}
                                {(view === "cart" || view === "bill") && (
                                    <button onClick={() => view === "cart" ? setView("store") : closeBill()} className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition">
                                        <X size={18} />
                                    </button>
                                )}
                            </div>

                            {/* Views Container */}
                            <div className="relative flex-1 overflow-hidden bg-[#050505]" style={{ display: 'flex', flexDirection: 'column' }}>

                                {/* 1. Store View */}
                                <AnimatePresence>
                                    {view === "store" && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}
                                        >
                                            {/* Scrollable Store List */}
                                            <div
                                                ref={storeScrollRef}
                                                onWheel={handleWheelScroll}
                                                style={{ flex: '1 1 0%', minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
                                                className="custom-scrollbar p-3"
                                            >
                                                <div className="flex flex-col gap-3 pb-6">
                                                    {storeItems.map((item, idx) => (
                                                        <div key={item.id} className="group relative glass-panel rounded-2xl p-3 border border-white/5 hover:border-white/20 transition-all flex items-center justify-between gap-2 bg-white/[0.02]">
                                                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.bg} flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform duration-500 shrink-0`}>
                                                                    <item.icon className={item.color} size={18} />
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <h3 className="text-white font-medium text-xs truncate">{item.name}</h3>
                                                                    <div className="flex items-center gap-1 mt-0.5">
                                                                        <IndianRupee size={10} className="text-white/30" />
                                                                        <p className="text-white/30 text-[10px] tracking-widest font-mono">???</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={(e) => handleAddToCart(e, item)}
                                                                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white outline-none transition-colors border border-white/10 text-xs font-semibold flex items-center gap-1 active:scale-95 shrink-0 self-center"
                                                            >
                                                                + Add
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Sticky Bottom Cart Preview continuously present */}
                                            <div ref={bottomCartRef} className="p-4 bg-[#0a0a0c] border-t border-white/5 shrink-0 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
                                                {cart.length === 0 ? (
                                                    <div className="flex flex-col items-center justify-center w-full py-2 text-white/30 text-xs gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                                                            <ShoppingCart size={16} className="opacity-50" />
                                                        </div>
                                                        <p>Your cart is empty.</p>
                                                    </div>
                                                ) : (
                                                    <motion.div
                                                        initial={{ y: 20, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        className="flex flex-col"
                                                    >
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-white/50 text-[10px] uppercase tracking-wider font-bold">{cart.length} Item{cart.length > 1 ? 's' : ''} in cart</span>
                                                        </div>

                                                        {/* Horizontal list displaying items added */}
                                                        <div className="flex items-center gap-2 overflow-x-hidden pb-3">
                                                            {cart.map((c, i) => (
                                                                <motion.div
                                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                                    animate={{ scale: 1, opacity: 1 }}
                                                                    key={i}
                                                                    className="flex items-center gap-1.5 bg-white/5 rounded-full pl-1.5 pr-3 py-1.5 shrink-0 border border-white/10"
                                                                >
                                                                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${c.item.bg} flex items-center justify-center`}>
                                                                        <c.item.icon size={10} className={c.item.color} />
                                                                    </div>
                                                                    <span className="text-[10px] text-white/90 whitespace-nowrap font-medium pr-1">{c.item.name}</span>
                                                                </motion.div>
                                                            ))}
                                                        </div>

                                                        <button
                                                            onClick={handleCheckout}
                                                            disabled={isGeneratingBill}
                                                            className={`w-full py-3 mt-1 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${isGeneratingBill
                                                                ? "bg-white/5 text-white/30 cursor-not-allowed"
                                                                : "bg-white text-black hover:opacity-90 shadow-[0_4px_15px_rgba(255,255,255,0.2)]"
                                                                }`}
                                                        >
                                                            {isGeneratingBill ? (
                                                                <div className="flex items-center gap-2">
                                                                    <motion.div
                                                                        animate={{ rotate: 360 }}
                                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                                        className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full"
                                                                    />
                                                                    Printing Bill...
                                                                </div>
                                                            ) : (
                                                                <>Checkout & Reveal ₹</>
                                                            )}
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* 2. Cart View (Detailed list if user tapped the top right cart icon) */}
                                <AnimatePresence>
                                    {view === "cart" && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 50 }}
                                            className="absolute inset-0 flex flex-col bg-black/80 backdrop-blur-md z-30"
                                        >
                                            <div
                                                ref={cartScrollRef}
                                                onWheel={handleWheelScroll}
                                                style={{ flex: '1 1 0%', minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
                                                className="p-4 custom-scrollbar flex flex-col gap-2"
                                            >
                                                {cart.length === 0 ? (
                                                    <div className="h-full flex flex-col items-center justify-center text-white/30 text-center">
                                                        <ShoppingCart size={40} className="mb-3 opacity-20" />
                                                        <p className="text-sm">Your cart is empty.</p>
                                                    </div>
                                                ) : (
                                                    cart.map((cartItem) => (
                                                        <motion.div
                                                            key={cartItem.id}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="flex items-center gap-3 bg-white/5 p-2.5 rounded-lg border border-white/5 shrink-0"
                                                        >
                                                            <div className={`p-1.5 rounded bg-gradient-to-br ${cartItem.item.bg}`}>
                                                                <cartItem.item.icon size={16} className={cartItem.item.color} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="text-[12px] font-medium text-white truncate">{cartItem.item.name}</h4>
                                                            </div>
                                                            <div className="flex items-center gap-1 text-black text-[10px] font-bold bg-white px-2 py-1 rounded">
                                                                +{cartItem.item.cashbackRate * 100}% CB
                                                            </div>
                                                        </motion.div>
                                                    ))
                                                )}
                                            </div>

                                            {/* Checkout Button */}
                                            <div className="p-4 border-t border-white/10 bg-black/90 shrink-0">
                                                <button
                                                    onClick={handleCheckout}
                                                    disabled={cart.length === 0 || isGeneratingBill}
                                                    className={`w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${cart.length === 0 || isGeneratingBill
                                                        ? "bg-white/5 text-white/30 cursor-not-allowed"
                                                        : "bg-white text-black hover:opacity-90 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                                        }`}
                                                >
                                                    {isGeneratingBill ? (
                                                        <div className="flex items-center gap-2">
                                                            <motion.div
                                                                animate={{ rotate: 360 }}
                                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                                className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full"
                                                            />
                                                            Printing Bill...
                                                        </div>
                                                    ) : (
                                                        <>Checkout & Reveal <IndianRupee size={14} /></>
                                                    )}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* 3. Bill / Receipt View (Printing Animation) */}
                                <AnimatePresence>
                                    {view === "bill" && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0.8 }}
                                            animate={{ height: "100%", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 1.2, ease: "easeInOut" }}
                                            className="absolute top-0 left-0 right-0 z-40 bg-white text-black flex flex-col origin-top overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                                        >
                                            {/* Receipt Zagzag Top */}
                                            <div className="h-2 w-full bg-[radial-gradient(circle,transparent_4px,#fff_4px)] bg-[length:8px_8px] -mt-1 shrink-0" style={{ backgroundPosition: 'bottom' }} />

                                            <div
                                                ref={billScrollRef}
                                                onWheel={handleWheelScroll}
                                                style={{ flex: '1 1 0%', minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
                                                className="px-4 py-3 custom-scrollbar font-mono text-[10px] flex flex-col"
                                            >
                                                <div className="text-center mb-3 shrink-0">
                                                    <h3 className="font-bold text-base tracking-widest font-mono border-b border-black/20 pb-1.5 inline-block border-dashed">GSAA SHOP</h3>
                                                    <p className="text-[8px] text-black/50 mt-0.5 uppercase">Official Receipt of Rewards</p>
                                                    <p className="text-[8px] text-black/50 mt-0.5">Date: {new Date().toLocaleDateString()}</p>
                                                </div>

                                                <div className="border-b border-dashed border-black/20 pb-2 mb-2 flex flex-col gap-1.5 shrink-0">
                                                    {cart.map((c, i) => (
                                                        <div key={i} className="flex justify-between text-black/80 items-center font-medium">
                                                            <span className="truncate pr-2">{c.item.name}</span>
                                                            <span className="shrink-0">₹xxx</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex justify-between text-black/60 mb-0.5 shrink-0">
                                                    <span>Subtotal</span>
                                                    <span>₹xxx</span>
                                                </div>
                                                <div className="flex justify-between text-black/60 mb-2 border-b border-dashed border-black/20 pb-2 shrink-0">
                                                    <span>Taxes</span>
                                                    <span>₹xxx</span>
                                                </div>

                                                <div className="flex justify-between text-black font-bold text-sm mb-3 shrink-0">
                                                    <span>TOTAL PAID</span>
                                                    <span>₹xxx</span>
                                                </div>

                                                {/* Golden Cashback Reveal */}
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    transition={{ delay: 1, type: "spring" }}
                                                    className="bg-yellow-50 border-2 border-yellow-400 rounded-lg px-3 py-2.5 text-center mt-auto shrink-0 shadow-[0_0_15px_rgba(250,204,21,0.2)]"
                                                >
                                                    <p className="text-yellow-600 font-bold text-[9px] tracking-wider uppercase">Cashback Earned</p>
                                                    <p className="text-lg font-black text-yellow-500 flex items-center justify-center gap-0.5 mt-0.5">
                                                        <IndianRupee size={16} className="text-yellow-500" strokeWidth={3} />
                                                        xxx
                                                    </p>
                                                    <div className="mt-1 text-[9px] text-yellow-600/70 font-sans font-medium">
                                                        Added to GSAA Wallet Successfully!
                                                    </div>
                                                </motion.div>

                                                <div className="text-center text-[8px] text-black/40 mt-2 font-sans shrink-0">
                                                    Thank you for shopping smartly!
                                                </div>
                                            </div>

                                            {/* Restart Interaction / Shop Again */}
                                            <div className="p-4 bg-gray-100 border-t border-gray-200 shrink-0">
                                                <button
                                                    onClick={closeBill}
                                                    className="w-full py-3.5 rounded-xl bg-black hover:bg-black/80 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <ShoppingBag size={16} /> Print & Restart Shop
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Content Side (Right) */}
                <div className="order-1 lg:order-2 h-full flex items-center">
                    <SectionContent
                        badge="SHOP TO EARN"
                        title="Shop Smart, Earn Rewards"
                        description="Every purchase becomes an earning opportunity. Shop for products you love and receive instant cashback rewards."
                        benefits={[
                            "Get instant cashback on all purchases",
                            "Member exclusive deals",
                            "Redeem rewards for future shopping",
                        ]}
                        ctaText="Start Shopping"
                        align="left"
                    />
                </div>

            </div>

            {/* Flying Items Animation Overlay */}
            {flyingItems.map(item => (
                <motion.div
                    key={item.id}
                    initial={{
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        x: item.startX - 16,
                        y: item.startY - 16,
                        scale: 1,
                        opacity: 1,
                        zIndex: 9999,
                        pointerEvents: 'none'
                    }}
                    animate={{
                        x: item.targetX - 16,
                        y: item.targetY - 16,
                        scale: 0.3,
                        opacity: 0.5,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.32, 0.72, 0, 1]
                    }}
                    className="flex items-center justify-center"
                >
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                        <item.icon size={16} className={item.color} />
                    </div>
                </motion.div>
            ))}

        </section>
    );
}
