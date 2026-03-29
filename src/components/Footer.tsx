import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 pt-8 pb-12 mt-auto">
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-neutral-500 text-sm">
                    © {new Date().getFullYear()} Client Name. All rights reserved.
                </div>

                <div className="flex items-center space-x-4 text-neutral-400">
                    <Link href="https://github.com" target="_blank" className="hover:text-white transition-colors duration-200">
                        <span className="sr-only">GitHub</span>
                        <Github className="w-5 h-5" />
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" className="hover:text-white transition-colors duration-200">
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin className="w-5 h-5" />
                    </Link>
                    <Link href="mailto:hello@example.com" className="hover:text-white transition-colors duration-200">
                        <span className="sr-only">Email</span>
                        <Mail className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
