import { getSortedPostsData } from '@/lib/markdown';
import { remark } from 'remark';
import html from 'remark-html';
import ExperienceCard from '@/components/ExperienceCard';
import CertificationCard from '@/components/CertificationCard';

export default async function ExperienceSection() {
    const experienceData = getSortedPostsData('experience');
    const certificationData = getSortedPostsData('certifications');

    if (experienceData.length === 0 && certificationData.length === 0) return null;

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
        <div id="experience" className="w-full mt-24 mb-16 border-t border-white/5 pt-16 scroll-mt-24">
            <div className="space-y-24">
                {processedExperience.length > 0 && (
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
                )}

                {processedCertifications.length > 0 && (
                    <section id="certifications" className="scroll-mt-24">
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
                                    icon={cert.icon}
                                    contentHtml={cert.contentHtml}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
