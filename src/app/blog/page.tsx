import { getSortedPostsData } from '@/lib/markdown';
import BlogCard from '@/components/BlogCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog - Tech Insights',
    description: 'Thoughts, learnings, and deep dives into cloud infrastructure and software engineering.',
};

export default function BlogPage() {
    const posts = getSortedPostsData('blog');

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl mx-auto">
            <div className="mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-6">
                    Writings & Insights
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400">
                    A collection of guides, case studies, and engineering thoughts from navigating complex data and cloud environments.
                </p>
            </div>

            <div className="space-y-12">
                {posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    );
}
