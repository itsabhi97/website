import { getSortedPostsData } from '@/lib/markdown';
import ProjectCard from '@/components/ProjectCard';
import { Layers, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateStaticParams() {
    const projects = getSortedPostsData('projects');
    // Extract all tags, flatten, and create a Set for uniqueness
    const allTags = projects.flatMap(project => project.tags || []);
    const uniqueTags = Array.from(new Set(allTags)).map(tag => tag.toLowerCase());

    return uniqueTags.map((tag) => ({
        tag: tag,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);

    return {
        title: `${decodedTag} Projects - Portfolio`,
        description: `Projects showcasing my experience with ${decodedTag}.`,
    };
}

export default async function TagFilteredProjectsPage({ params }: { params: Promise<{ tag: string }> }) {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag).toLowerCase();

    const allProjects = getSortedPostsData('projects');

    // Filter projects by checking if any of their tags match the requested tag (case-insensitive)
    const filteredProjects = allProjects.filter(project => {
        if (!project.tags) return false;
        return project.tags.some(t => t.toLowerCase() === decodedTag);
    });

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 mb-8"
            >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to home
            </Link>

            <div className="mb-12">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                        <Layers className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white capitalize">
                        {decodedTag} Projects
                    </h1>
                </div>
                <p className="text-lg text-neutral-400 max-w-2xl">
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
                <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-neutral-400 text-lg">No projects found with this tag.</p>
                    <Link href="/projects" className="text-blue-400 hover:text-blue-300 mt-4 inline-block font-medium">
                        View all projects
                    </Link>
                </div>
            )}
        </div>
    );
}
