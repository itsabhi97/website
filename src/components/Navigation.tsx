import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Navigation() {
    const links = [
        { href: '/', label: 'Home' },
        { href: '/tech-stack', label: 'Tech Stack' },
        { href: '/#experience', label: 'Experience' },
        { href: '/projects', label: 'Projects' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-lg border-b border-black/5 dark:border-white/5 bg-white/70 dark:bg-black/40 transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent"
                >
                    itsabhi97
                </Link>

                <div className="flex items-center space-x-6">
                    <nav className="hidden sm:flex space-x-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
