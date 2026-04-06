import { getSortedPostsData } from '@/lib/markdown';
import { slugifyTag } from '@/lib/utils';
import ProjectCard from '@/components/ProjectCard';
import { Layers, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function generateStaticParams() {
    const projects = getSortedPostsData('projects');
    const projectTags = projects.flatMap(project => project.tags || []);

    // Also extract all tags from tech-stack.md so empty tags don't throw 500s on build
    let techStackTags: string[] = [];
    try {
        const mdPath = path.join(process.cwd(), 'content', 'tech-stack.md');
        const fileContents = fs.readFileSync(mdPath, 'utf8');
        const { data } = matter(fileContents);
        const cats = data.categories || [];

        cats.forEach((cat: any) => {
            if (cat.name) techStackTags.push(cat.name);
            if (cat.items) techStackTags.push(...cat.items);
            if (cat.subcategories) {
                cat.subcategories.forEach((sub: any) => {
                    if (sub.name) techStackTags.push(sub.name);
                    if (sub.items) techStackTags.push(...sub.items);
                });
            }
        });
    } catch (e) { }

    const allTags = [...projectTags, ...techStackTags];
    const uniqueTags = Array.from(new Set(allTags)).map(tag => slugifyTag(tag));

    return uniqueTags.map((tag) => ({
        tag: tag,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
    const { tag } = await params;
    // For presentation, we just capitalize the passed slug
    const displayTag = tag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return {
        title: `${displayTag} Projects - Portfolio`,
        description: `Projects showcasing my experience with ${displayTag}.`,
    };
}

export default async function TagFilteredProjectsPage({ params }: { params: Promise<{ tag: string }> }) {
    const { tag } = await params;
    const requestedSlug = tag;
    const displayTag = tag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const allProjects = getSortedPostsData('projects');

    // Filter projects by matching the slugified strings
    const filteredProjects = allProjects.filter(project => {
        if (!project.tags) return false;
        return project.tags.some(t => slugifyTag(t) === requestedSlug);
    });

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200 mb-8"
            >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to home
            </Link>

            <div className="mb-12">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-500/10 dark:bg-blue-500/20 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                        <Layers className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white capitalize">
                        {displayTag} Projects
                    </h1>
                </div>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
                    Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} utilizing this technology.
                </p>
            </div>

            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl">
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg">No projects found with this tag.</p>
                    <Link href="/projects" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-4 inline-block font-medium">
                        View all projects
                    </Link>
                </div>
            )}
        </div>
    );
}
