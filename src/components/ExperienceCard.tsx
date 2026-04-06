import React from 'react';
import { Briefcase } from 'lucide-react';
import GlowCard from '@/components/animations/GlowCard';

interface ExperienceCardProps {
    title: string;
    company: string;
    date: string;
    contentHtml: string;
}

export default function ExperienceCard({ title, company, date, contentHtml }: ExperienceCardProps) {
    return (
        <div className="relative pl-8 md:pl-0">
            <div className="md:hidden absolute left-0 top-1 h-full w-px bg-black/10 dark:bg-white/10" />

            <GlowCard className="group relative rounded-2xl border border-black/10 dark:border-white/5 bg-white dark:bg-white/5 p-6 hover:bg-neutral-50 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-sm shadow-sm dark:shadow-none">
                <div className="md:hidden absolute -left-10 top-6 w-5 h-5 rounded-full bg-blue-500/20 border-4 border-[#F9FAFB] dark:border-[#050505] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                </div>

                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
                        <p className="text-lg font-medium text-neutral-600 dark:text-neutral-300">{company}</p>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center text-sm font-semibold text-neutral-500 dark:text-neutral-400 bg-black/5 dark:bg-white/5 px-3 py-1 rounded-full border border-black/10 dark:border-white/10">
                        <Briefcase className="w-3.5 h-3.5 mr-2 text-blue-600 dark:text-blue-400" />
                        {date}
                    </div>
                </div>

                <div className="prose prose-sm dark:prose-invert prose-neutral max-w-none prose-p:text-neutral-600 dark:prose-p:text-neutral-400 prose-li:text-neutral-600 dark:prose-li:text-neutral-400 prose-li:marker:text-blue-500"
                    dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </GlowCard>
        </div>
    );
}
