"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const NUM_STARS = 250;

interface Star {
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
    const starsRef = useRef<Star[]>([]);
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

        // Initialize stars only once
        if (starsRef.current.length === 0) {
            const starColors = ["#ffffff", "#ffe9c4", "#d4fbff"];
            for (let i = 0; i < NUM_STARS; i++) {
                starsRef.current.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5 + 0.1,
                    alpha: Math.random(),
                    alphaChange: (Math.random() - 0.5) * 0.02,
                    speedX: (Math.random() - 0.5) * 0.05,
                    speedY: (Math.random() - 0.5) * 0.05,
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
                gradient.addColorStop(0, "#f8fafc");
                gradient.addColorStop(0.5, "#f1f5f9");
                gradient.addColorStop(1, "#e2e8f0");
            }

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Update smooth mouse movements
            mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
            mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

            // Draw stars/particles
            starsRef.current.forEach((star) => {
                const parallaxX = mouseRef.current.x * (star.radius * 2);
                const parallaxY = mouseRef.current.y * (star.radius * 2);

                star.x += star.speedX - parallaxX;
                star.y += star.speedY - parallaxY;

                if (star.x < 0) star.x = width;
                if (star.x > width) star.x = 0;
                if (star.y < 0) star.y = height;
                if (star.y > height) star.y = 0;

                star.alpha += star.alphaChange;
                if (star.alpha <= 0.1) {
                    star.alpha = 0.1;
                    star.alphaChange = Math.abs(star.alphaChange);
                } else if (star.alpha >= 1) {
                    star.alpha = 1;
                    star.alphaChange = -Math.abs(star.alphaChange);
                }

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

                if (isDark) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                    if (star.radius > 1) {
                        ctx.shadowBlur = 8;
                        ctx.shadowColor = star.color;
                    } else {
                        ctx.shadowBlur = 0;
                    }
                } else {
                    ctx.fillStyle = `rgba(99, 102, 241, ${star.alpha * 0.6})`;
                    ctx.shadowBlur = 0;
                }

                ctx.fill();
            });

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
