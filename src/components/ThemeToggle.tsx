"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10" />; // Empty placeholder to prevent hydration jump
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="relative p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none flex items-center justify-center w-10 h-10 group"
            aria-label="Toggle theme"
        >
            <Sun className="h-5 w-5 text-neutral-600 dark:text-neutral-400 absolute transition-all scale-100 rotate-0 dark:scale-0 dark:rotate-90 group-hover:text-black dark:group-hover:text-white" />
            <Moon className="h-5 w-5 text-neutral-600 dark:text-neutral-400 absolute transition-all scale-0 -rotate-90 dark:scale-100 dark:rotate-0 group-hover:text-black dark:group-hover:text-white" />
        </button>
    );
}
