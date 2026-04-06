import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { personalInfo } from '@/config';

export default function Footer() {
    return (
        <footer className="w-full border-t border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/40 backdrop-blur-md mt-auto transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-neutral-500 text-sm">
                        © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6 text-neutral-500 dark:text-neutral-400">
                        <Link href={personalInfo.socials.github} target="_blank" className="hover:text-black dark:hover:text-white transition-colors duration-200">
                            <span className="sr-only">GitHub</span>
                            <Github className="w-5 h-5" />
                        </Link>
                        <Link href={personalInfo.socials.linkedin} target="_blank" className="hover:text-[#0A66C2] transition-colors duration-200">
                            <span className="sr-only">LinkedIn</span>
                            <Linkedin className="w-5 h-5" />
                        </Link>
                        <Link href={`mailto:${personalInfo.socials.email}`} className="hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">
                            <span className="sr-only">Email</span>
                            <Mail className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
