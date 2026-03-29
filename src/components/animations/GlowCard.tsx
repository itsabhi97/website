"use client";

import { ReactNode, MouseEvent, useState, useRef } from "react";
import { motion } from "framer-motion";

interface GlowCardProps {
    children: ReactNode;
    className?: string;
}

export default function GlowCard({ children, className = "" }: GlowCardProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden ${className}`}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 rounded-[inherit]"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
                }}
            />
            {children}
        </motion.div>
    );
}
