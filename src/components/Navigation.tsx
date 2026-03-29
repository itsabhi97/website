import Link from 'next/link';

export default function Navigation() {
    const links = [
        { href: '/', label: 'Home' },
        { href: '/projects', label: 'Projects' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-lg border-b border-white/5 bg-black/40">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                >
                    DevPortfolio.
                </Link>

                <nav className="flex space-x-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
