import { getSortedPostsData } from '@/lib/markdown';
import ProjectCard from '@/components/ProjectCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects - IT Professional Portfolio',
    description: 'A showcase of my recent data engineering and cloud infrastructure projects.',
};

export default function ProjectsPage() {
    const projects = getSortedPostsData('projects');

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
                    Featured Projects
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
                    A selection of challenging data systems, robust software platforms, and scalable cloud architectures I have engineered.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </div>
    );
}
