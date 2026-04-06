import { getSortedPostsData } from '@/lib/markdown';
import { slugifyTag as slugifier } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { Layers } from 'lucide-react';
import fs from 'fs';
import path from 'path';

export default function TechStack() {
    const projects = getSortedPostsData('projects');

    // Extract all tags, flatten, and create a Set for uniqueness
    const allTags = projects.flatMap(project => project.tags || []);
    const uniqueTags = Array.from(new Set(allTags)).sort();

    if (uniqueTags.length === 0) return null;

    const publicDir = path.join(process.cwd(), 'public', 'icons');
    let availableIcons: string[] = [];

    try {
        if (fs.existsSync(publicDir)) {
            availableIcons = fs.readdirSync(publicDir);
        }
    } catch (e) {
        console.error("Error reading public/icons directory", e);
    }

    return (
        <div className="w-full mt-24 mb-16 border-t border-black/5 dark:border-white/5 pt-16">
            <div className="flex items-center space-x-3 mb-8">
                <div className="bg-blue-500/10 dark:bg-blue-500/20 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                    <Layers className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
                    Tech Stack Showcase
                </h2>
            </div>

            <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl text-lg">
                Technologies I've successfully deployed in production. Click on any technology to see the projects where it was utilized.
            </p>

            <div className="relative flex overflow-hidden w-full group py-4">
                {/* Fade masks */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F9FAFB] dark:from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F9FAFB] dark:from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

                <div className="flex w-max animate-marquee space-x-6 hover:[animation-play-state:paused] ml-0 text-center">
                    {[...uniqueTags, ...uniqueTags, ...uniqueTags].map((tag, index) => {
                        const slug = tag.toLowerCase().replace(/\s+/g, '-');

                        // Case-insensitive generic file match for the exact slug (ignoring extension)
                        const matchingIconFile = availableIcons.find(
                            file => file.toLowerCase().replace(/\.[^/.]+$/, "") === slug
                        );

                        const hasIcon = !!matchingIconFile;
                        const iconFileName = matchingIconFile ? `/icons/${matchingIconFile}` : '';

                        return (
                            <Link
                                key={`${tag}-${index}`}
                                href={`/projects/tag/${slugifier(tag)}`}
                                className="group relative flex flex-col items-center justify-center p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 overflow-hidden shrink-0 w-32 h-32"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                {hasIcon ? (
                                    <div className="relative z-10 w-12 h-12 mb-3 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                                        <Image
                                            src={iconFileName}
                                            alt={`${tag} Icon`}
                                            fill
                                            sizes="(max-width: 48px) 100vw, 48px"
                                            className="object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] rounded-xl overflow-hidden"
                                        />
                                    </div>
                                ) : null}

                                <span className={`relative z-10 text-xs font-semibold tracking-wide text-center transition-colors ${hasIcon ? 'text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white' : 'text-neutral-600 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white text-sm'}`}>
                                    {tag}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
