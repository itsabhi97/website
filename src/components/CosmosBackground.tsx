"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const NUM_PARTICLES = 120;

interface Particle {
    x: number;
    y: number;
    radius: number;
    alpha: number;
    alphaChange: number;
    speedX: number;
    speedY: number;
    color: string;
}

const CosmosBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const targetMouseRef = useRef({ x: 0, y: 0 });
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        const setCanvasSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        const handleMouseMove = (e: MouseEvent) => {
            targetMouseRef.current = {
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: (e.clientY / window.innerHeight - 0.5) * 2,
            };
        };
        window.addEventListener("mousemove", handleMouseMove);

        // Initialize particles
        if (particlesRef.current.length === 0) {
            const starColors = ["#ffffff", "#ffe9c4", "#d4fbff"];
            for (let i = 0; i < NUM_PARTICLES; i++) {
                particlesRef.current.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5 + 0.5, // Slightly larger base for network nodes
                    alpha: Math.random(),
                    alphaChange: (Math.random() - 0.5) * 0.02,
                    speedX: (Math.random() - 0.5) * 0.1,
                    speedY: (Math.random() - 0.5) * 0.1,
                    color: starColors[Math.floor(Math.random() * starColors.length)],
                });
            }
        }

        const draw = () => {
            if (!ctx) return;

            const isDark = resolvedTheme === "dark";

            // Draw background
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            if (isDark) {
                gradient.addColorStop(0, "#050505");
                gradient.addColorStop(0.5, "#0a0a1a");
                gradient.addColorStop(1, "#1a1025");
            } else {
                gradient.addColorStop(0, "#ffffff");
                gradient.addColorStop(0.5, "#f8fafc");
                gradient.addColorStop(1, "#e2e8f0");
            }

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Update smooth mouse movements
            mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
            mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

            // Update and draw connections
            for (let i = 0; i < particlesRef.current.length; i++) {
                const p1 = particlesRef.current[i];

                // Parallax movement
                const parallaxX = mouseRef.current.x * (p1.radius * 3);
                const parallaxY = mouseRef.current.y * (p1.radius * 3);

                p1.x += p1.speedX - parallaxX;
                p1.y += p1.speedY - parallaxY;

                // Screen wrapping
                if (p1.x < 0) p1.x = width;
                if (p1.x > width) p1.x = 0;
                if (p1.y < 0) p1.y = height;
                if (p1.y > height) p1.y = 0;

                // Twinkling effect
                p1.alpha += p1.alphaChange;
                if (p1.alpha <= 0.1) {
                    p1.alpha = 0.1;
                    p1.alphaChange = Math.abs(p1.alphaChange);
                } else if (p1.alpha >= 1) {
                    p1.alpha = 1;
                    p1.alphaChange = -Math.abs(p1.alphaChange);
                }

                // Draw network connections
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const p2 = particlesRef.current[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    const maxDistance = 120; // threshold for a connection
                    if (distance < maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);

                        // Line opacity fades out based on distance between the two points
                        const opacity = (1 - distance / maxDistance) * 0.6; // Max 0.6 opacity

                        if (isDark) {
                            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * p1.alpha})`;
                        } else {
                            // Darkish blue/indigo for light mode connections
                            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * p1.alpha})`;
                        }

                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }

                // Draw particle (node)
                ctx.beginPath();
                ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);

                if (isDark) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${p1.alpha})`;
                    if (p1.radius > 1) {
                        ctx.shadowBlur = 8;
                        ctx.shadowColor = p1.color;
                    } else {
                        ctx.shadowBlur = 0;
                    }
                } else {
                    ctx.fillStyle = `rgba(99, 102, 241, ${p1.alpha * 0.8})`;
                    ctx.shadowBlur = 0;
                }

                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", setCanvasSize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mounted, resolvedTheme]);

    if (!mounted) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] pointer-events-none"
            aria-hidden="true"
        />
    );
};

export default CosmosBackground;
