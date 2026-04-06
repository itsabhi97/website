import { getPostData, getSortedPostsData } from '@/lib/markdown';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const posts = getSortedPostsData('projects');
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const postData = await getPostData('projects', slug);
        return {
            title: `${postData.title} - Projects`,
            description: postData.desc || 'Project details',
        };
    } catch (e) {
        return { title: 'Project Not Found' };
    }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let postData;
    try {
        postData = await getPostData('projects', slug);
    } catch (e) {
        notFound();
    }

    return (
        <article className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Link
                href="/projects"
                className="inline-flex items-center text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200 mb-8"
            >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to projects
            </Link>

            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-6">
                    {postData.title}
                </h1>

                <div className="flex flex-wrap gap-2 mb-8">
                    {postData.tags?.map((tag: string) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-500/10 rounded-full border border-blue-500/20"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {postData.desc && (
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {postData.desc}
                    </p>
                )}
            </header>

            <div
                className="prose dark:prose-invert prose-blue max-w-none prose-p:leading-relaxed prose-pre:bg-black/5 dark:prose-pre:bg-white/5 prose-pre:border prose-pre:border-black/10 dark:prose-pre:border-white/10"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />
        </article>
    );
}
