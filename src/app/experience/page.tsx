import { getSortedPostsData } from '@/lib/markdown';
import { remark } from 'remark';
import html from 'remark-html';
import ExperienceCard from '@/components/ExperienceCard';
import CertificationCard from '@/components/CertificationCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Experience & Certifications | IT Professional',
    description: 'Career timeline and professional certifications.',
};

export default async function ExperiencePage() {
    const experienceData = getSortedPostsData('experience');
    const certificationData = getSortedPostsData('certifications');

    const processedExperience = await Promise.all(experienceData.map(async (job) => {
        const processedContent = await remark().use(html).process(job.content || '');
        return {
            ...job,
            contentHtml: processedContent.toString()
        };
    }));

    const processedCertifications = await Promise.all(certificationData.map(async (cert) => {
        const processedContent = await remark().use(html).process(cert.content || '');
        return {
            ...cert,
            contentHtml: processedContent.toString()
        };
    }));

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">Experience & Certifications</h1>
                <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
                    A comprehensive overview of my professional journey, including key roles, impactful projects, and technical certifications.
                </p>
            </div>

            <div className="space-y-24">
                <section>
                    <div className="flex items-center space-x-4 mb-10">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Work Experience</h2>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    <div className="relative space-y-12">
                        {/* Vertical Timeline Line */}
                        <div className="hidden md:block absolute left-4 top-2 bottom-2 w-px bg-white/10" />

                        {processedExperience.map((job) => (
                            <div key={job.slug} className="relative">
                                {/* Timeline Dot */}
                                <div className="hidden md:flex absolute -left-[1.35rem] top-6 w-5 h-5 rounded-full bg-blue-500/20 border-4 border-[#050505] items-center justify-center z-10">
                                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                                </div>
                                <ExperienceCard
                                    title={job.title}
                                    company={job.company || ''}
                                    date={job.date}
                                    contentHtml={job.contentHtml}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex items-center space-x-4 mb-10">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Certifications</h2>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {processedCertifications.map((cert) => (
                            <CertificationCard
                                key={cert.slug}
                                title={cert.title}
                                issuer={cert.issuer || ''}
                                date={cert.date}
                                credentialUrl={cert.credentialUrl}
                                contentHtml={cert.contentHtml}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
