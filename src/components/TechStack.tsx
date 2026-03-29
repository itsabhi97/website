import { getSortedPostsData } from '@/lib/markdown';
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

    const publicDir = path.join(process.cwd(), 'public');

    return (
        <div className="w-full mt-24 mb-16 border-t border-white/5 pt-16">
            <div className="flex items-center space-x-3 mb-8">
                <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                    <Layers className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Tech Stack Showcase
                </h2>
            </div>

            <p className="text-neutral-400 mb-8 max-w-2xl text-lg">
                Technologies I've successfully deployed in production. Click on any technology to see the projects where it was utilized.
            </p>

            <div className="flex flex-wrap gap-4">
                {uniqueTags.map((tag) => {
                    const slug = tag.toLowerCase().replace(/\s+/g, '-');
                    const iconFileName = `/icons/${slug}.png`;
                    const hasIcon = fs.existsSync(path.join(publicDir, iconFileName));

                    return (
                        <Link
                            key={tag}
                            href={`/projects/tag/${encodeURIComponent(tag.toLowerCase())}`}
                            className="group relative flex flex-col items-center justify-center p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden w-28 h-28"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            {hasIcon ? (
                                <div className="relative z-10 w-12 h-12 mb-2 transition-transform duration-500 group-hover:scale-110">
                                    <Image
                                        src={iconFileName}
                                        alt={`${tag} Icon`}
                                        fill
                                        sizes="(max-width: 48px) 100vw, 48px"
                                        className="object-contain"
                                    />
                                </div>
                            ) : null}

                            <span className={`relative z-10 text-xs font-medium text-center transition-colors ${hasIcon ? 'text-neutral-400 group-hover:text-white' : 'text-neutral-300 group-hover:text-white text-sm'}`}>
                                {tag}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
