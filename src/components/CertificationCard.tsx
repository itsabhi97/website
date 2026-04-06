import React from 'react';
import { Award, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface CertificationCardProps {
    title: string;
    issuer?: string;
    date?: string;
    credentialUrl?: string;
    contentHtml?: string;
    icon?: string;
}

export default function CertificationCard({ title, credentialUrl, icon }: CertificationCardProps) {
    return (
        <div className="group flex items-center justify-between rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-5 hover:bg-neutral-50 dark:hover:bg-white/10 transition-all duration-300 shadow-sm dark:shadow-none">
            <div className="flex items-center space-x-4">
                <div className="bg-purple-500/10 dark:bg-purple-500/20 p-2.5 rounded-xl border border-purple-500/20 flex-shrink-0 flex items-center justify-center">
                    {icon ? (
                        <div className="relative w-7 h-7 group-hover:scale-110 transition-transform duration-300">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={icon} alt={`${title} icon`} className="w-full h-full object-contain drop-shadow-sm dark:drop-shadow-[0_0_6px_rgba(255,255,255,0.2)] rounded-lg overflow-hidden" />
                        </div>
                    ) : (
                        <Award className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                    )}
                </div>
                <h3 className="text-base md:text-lg font-bold text-neutral-900 dark:text-white leading-tight">{title}</h3>
            </div>

            {credentialUrl ? (
                <Link
                    href={credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 ml-4 inline-flex items-center justify-center p-2 rounded-full bg-black/5 dark:bg-white/5 text-purple-600 dark:text-purple-400 hover:bg-black/10 dark:hover:bg-white/10 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                    aria-label={`View credential for ${title}`}
                >
                    <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </Link>
            ) : null}
        </div>
    );
}
