import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import TechStackClient from '@/components/TechStackClient';

export default function TechStackPage() {
    const mdPath = path.join(process.cwd(), 'content', 'tech-stack.md');
    const fileContents = fs.readFileSync(mdPath, 'utf8');
    const { data } = matter(fileContents);
    const categories = data.categories || [];

    const publicDir = path.join(process.cwd(), 'public', 'icons');
    let availableIcons: string[] = [];
    try {
        if (fs.existsSync(publicDir)) {
            availableIcons = fs.readdirSync(publicDir);
        }
    } catch (e) { }

    return (
        <div className="max-w-7xl mx-auto py-16 px-6 lg:px-8">
            <TechStackClient categories={categories} availableIcons={availableIcons} />
        </div>
    );
}
