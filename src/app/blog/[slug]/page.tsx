import { getPostData, getSortedPostsData } from '@/lib/markdown';
import { ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const posts = getSortedPostsData('blog');
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const postData = await getPostData('blog', slug);
        return {
            title: `${postData.title} - Blog`,
            description: postData.desc || 'Blog article',
        };
    } catch (e) {
        return { title: 'Post Not Found' };
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let postData;
    try {
        postData = await getPostData('blog', slug);
    } catch (e) {
        notFound();
    }

    const formattedDate = new Date(postData.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <article className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Link
                href="/blog"
                className="inline-flex items-center text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 mb-8"
            >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to blog
            </Link>

            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
                    {postData.title}
                </h1>

                <div className="flex items-center text-neutral-400 mb-8 space-x-4">
                    <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={postData.date}>{formattedDate}</time>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {postData.tags?.map((tag: string) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 text-xs font-medium text-indigo-300 bg-indigo-500/10 rounded-full border border-indigo-500/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {postData.desc && (
                    <p className="text-xl text-neutral-400 leading-relaxed border-l-2 border-indigo-500/50 pl-4 py-1 italic">
                        "{postData.desc}"
                    </p>
                )}
            </header>

            <div
                className="prose prose-invert prose-indigo max-w-none prose-p:leading-relaxed prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-headings:text-neutral-100 prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />
        </article>
    );
}
