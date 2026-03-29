"use client";

import { motion } from "framer-motion";

interface TypewriterProps {
    text: string;
    delay?: number;
    className?: string;
}

export default function Typewriter({ text, delay = 0, className = "" }: TypewriterProps) {
    return (
        <motion.span
            className={className}
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.05,
                        delayChildren: delay,
                    },
                },
            }}
        >
            {text.split("").map((char, index) => (
                <motion.span
                    key={`${char}-${index}`}
                    variants={{
                        hidden: { opacity: 0, y: 5 },
                        visible: { opacity: 1, y: 0 },
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
}
