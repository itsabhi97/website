import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ParsedData } from '@/lib/markdown';
import GlowCard from '@/components/animations/GlowCard';

export default function ProjectCard({ project }: { project: ParsedData }) {
    return (
        <Link href={`/projects/${project.slug}`} className="block h-full">
            <GlowCard className="group h-full p-6 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-300 flex flex-col shadow-sm dark:shadow-none">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                    </h3>
                    <ArrowUpRight className="text-neutral-400 dark:text-neutral-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-sm leading-relaxed relative z-10">
                    {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 relative z-10">
                    {project.tags?.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium text-neutral-700 dark:text-white/70 bg-black/5 dark:bg-white/5 rounded-full border border-black/10 dark:border-white/10"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </GlowCard>
        </Link>
    );
}
