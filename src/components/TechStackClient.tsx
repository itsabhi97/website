"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlowCard from '@/components/animations/GlowCard';
import FadeIn from '@/components/animations/FadeIn';
import { slugifyTag } from '@/lib/utils';

type ViewMode = 'compact' | 'bento';

export default function TechStackClient({ categories, availableIcons }: { categories: any[], availableIcons: string[] }) {
    const [viewMode, setViewMode] = useState<ViewMode>('compact');
    const [selectedCategory, setSelectedCategory] = useState<any | null>(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedCategory) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedCategory]);

    const findIcon = (toolName: string) => {
        const slug = toolName.toLowerCase().replace(/\s+/g, '-');
        const match = availableIcons.find(f => f.toLowerCase().replace(/\.[^/.]+$/, "") === slug);
        return match ? `/icons/${match}` : null;
    };

    const renderItem = (item: string) => {
        const iconPath = findIcon(item);
        const isSvg = iconPath?.endsWith('.svg');

        return (
            <Link
                key={item}
                href={`/projects/tag/${slugifyTag(item)}`}
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-black/50 hover:bg-white/10 transition-all duration-300 group shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] w-full sm:w-auto"
            >
                {iconPath ? (
                    <div className="relative w-6 h-6 shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Image
                            src={iconPath}
                            alt={item}
                            fill
                            className={`object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] ${isSvg ? 'invert opacity-90' : ''}`}
                        />
                    </div>
                ) : (
                    <div className="w-6 h-6 shrink-0 bg-white/10 rounded-md flex items-center justify-center text-[10px] font-bold text-white/50">{item.charAt(0)}</div>
                )}
                <span className="text-sm font-semibold tracking-wide text-neutral-300 group-hover:text-white transition-colors">{item}</span>
            </Link>
        );
    };

    const renderCategoryContents = (category: any) => (
        <>
            {category.items && (
                <div className="flex flex-wrap gap-3 mb-6 flex-1 items-start content-start">
                    {category.items.map((item: string) => renderItem(item))}
                </div>
            )}

            {category.subcategories && (
                <div className="space-y-10 flex-1">
                    {category.subcategories.map((sub: any) => (
                        <div key={sub.name} className="flex flex-col items-start justify-start">
                            <Link href={`/projects/tag/${slugifyTag(sub.name)}`} onClick={() => setSelectedCategory(null)}>
                                <h3 className="text-sm font-semibold text-neutral-500 hover:text-blue-400 cursor-pointer transition-colors uppercase tracking-widest pl-3 mb-5 border-l-2 border-blue-500/50">{sub.name}</h3>
                            </Link>
                            <div className="flex flex-wrap gap-3">
                                {sub.items.map((item: string) => renderItem(item))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );

    return (
        <div className="flex flex-col w-full">
            {/* Toggle Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-3">Technical Arsenal</h1>
                    <p className="text-neutral-400 text-lg max-w-2xl">
                        An engineered dashboard mapping my cloud infrastructure, data engineering, and software stack.
                    </p>
                </div>

                <div className="flex items-center p-1.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md self-start shrink-0">
                    <button
                        onClick={() => setViewMode('compact')}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${viewMode === 'compact' ? 'bg-blue-500/20 text-blue-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-blue-500/30' : 'text-neutral-400 hover:text-white border border-transparent'}`}
                    >
                        Compact
                    </button>
                    <button
                        onClick={() => setViewMode('bento')}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${viewMode === 'bento' ? 'bg-purple-500/20 text-purple-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-purple-500/30' : 'text-neutral-400 hover:text-white border border-transparent'}`}
                    >
                        Bento Grid
                    </button>
                </div>
            </div>

            {/* View Mode: Bento Grid (Massive Open Dashboard) */}
            {viewMode === 'bento' && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-min animate-in fade-in duration-700">
                    {categories.map((category: any, i: number) => {
                        const totalItems = (category.items?.length || 0) + (category.subcategories?.reduce((acc: number, sub: any) => acc + sub.items.length, 0) || 0);
                        const isLarge = totalItems > 10;
                        const isHuge = totalItems >= 15;

                        return (
                            <FadeIn key={category.name} delay={i * 0.1} className={`h-full ${isLarge ? 'md:col-span-2' : ''} ${isHuge ? 'xl:row-span-2' : ''}`}>
                                <GlowCard className="h-full flex flex-col p-6 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md">
                                    <Link href={`/projects/tag/${slugifyTag(category.name)}`} onClick={() => setSelectedCategory(null)} className="inline-block w-fit">
                                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-8 tracking-tight hover:opacity-80 transition-opacity cursor-pointer">{category.name}</h2>
                                    </Link>
                                    {renderCategoryContents(category)}
                                </GlowCard>
                            </FadeIn>
                        );
                    })}
                </div>
            )}

            {/* View Mode: Compact (Click to Pop-up) */}
            {viewMode === 'compact' && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in duration-700">
                    {categories.map((category: any, i: number) => {
                        const totalItems = (category.items?.length || 0) + (category.subcategories?.reduce((acc: number, sub: any) => acc + sub.items.length, 0) || 0);

                        return (
                            <FadeIn key={category.name} delay={i * 0.05} className="h-full">
                                <button
                                    onClick={() => setSelectedCategory(category)}
                                    className="w-full h-full text-left flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-95 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <h3 className="text-lg md:text-xl font-bold text-white text-center mb-2 z-10">{category.name}</h3>
                                    <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 z-10">{totalItems} Tools</span>
                                </button>
                            </FadeIn>
                        );
                    })}
                </div>
            )}

            {/* Modal Pop-up for Compact Mode */}
            <AnimatePresence>
                {selectedCategory && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCategory(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl max-h-[85vh] overflow-y-auto z-[101] bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl p-6 md:p-10"
                        >
                            <div className="flex justify-between items-start mb-8 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md pt-2 pb-4 border-b border-white/5 z-20">
                                <Link href={`/projects/tag/${slugifyTag(selectedCategory.name)}`} onClick={() => setSelectedCategory(null)}>
                                    <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight hover:opacity-80 transition-opacity cursor-pointer">
                                        {selectedCategory.name}
                                    </h2>
                                </Link>
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                            </div>

                            <div className="pb-4">
                                {renderCategoryContents(selectedCategory)}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
