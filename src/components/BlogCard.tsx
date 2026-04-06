import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { ParsedData } from '@/lib/markdown';

export default function BlogCard({ post }: { post: ParsedData }) {
    // Format date correctly
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <article className="group relative">
            <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10">
                <span className="sr-only">Read {post.title}</span>
            </Link>

            <div className="flex items-center text-sm text-neutral-500 mb-3 space-x-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>{formattedDate}</time>
            </div>

            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 dark:group-hover:from-purple-400 dark:group-hover:to-indigo-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 inline-block">
                {post.title}
            </h3>

            <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                {post.desc}
            </p>

            <div className="flex flex-wrap gap-2 mt-4 relative z-20 pointer-events-none">
                {post.tags?.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs font-medium text-indigo-400/80 bg-indigo-500/10 px-2.5 py-1 rounded-md"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </article>
    );
}
