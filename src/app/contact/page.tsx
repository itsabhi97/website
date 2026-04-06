import { Mail, MapPin, Target } from "lucide-react";
import Link from 'next/link';
import { personalInfo } from '@/config';

export default function ContactPage() {
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
                    Let's Work Together
                </h1>
                <p className="text-lg text-neutral-400">
                    I'm currently available for freelance opportunities, consulting, or full-time roles in data engineering and cloud architecture.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/[0.07] transition-colors duration-300">
                    <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-6">
                        <Mail className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">Email Me</h2>
                    <p className="text-neutral-400 mb-6 text-sm">
                        I usually respond within 24-48 hours.
                    </p>
                    <a
                        href={`mailto:${personalInfo.socials.email}`}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-black bg-white hover:bg-neutral-200 transition-colors duration-200 w-full"
                    >
                        {personalInfo.socials.email}
                    </a>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/[0.07] transition-colors duration-300">
                    <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mb-6">
                        <Target className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">Consulting</h2>
                    <p className="text-neutral-400 mb-6 text-sm">
                        Need architect-level advice for cloud migrations? Let's talk.
                    </p>
                    <Link
                        href={personalInfo.socials.linkedin} target="_blank"
                        className="inline-flex items-center justify-center px-6 py-3 border border-white/10 text-sm font-medium rounded-lg text-white bg-white/5 hover:bg-white/10 transition-colors duration-200 w-full"
                    >
                        Connect on LinkedIn
                    </Link>
                </div>
            </div>
        </div>
    );
}
