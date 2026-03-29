import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ParsedData {
    slug: string;
    title: string;
    date: string;
    desc?: string;
    tags?: string[];
    [key: string]: any;
}

export function getSortedPostsData(type: 'blog' | 'projects'): ParsedData[] {
    const dirPath = path.join(contentDirectory, type);
    // Setup directory if it doesn't exist just in case
    if (!fs.existsSync(contentDirectory)) fs.mkdirSync(contentDirectory);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);

    const fileNames = fs.readdirSync(dirPath);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const slug = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(dirPath, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
            slug,
            ...(matterResult.data as { date: string; title: string; desc?: string; tags?: string[] }),
        };
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export async function getPostData(type: 'blog' | 'projects', slug: string) {
    const fullPath = path.join(contentDirectory, type, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
        slug,
        contentHtml,
        ...(matterResult.data as { date: string; title: string; desc?: string; tags?: string[] }),
    };
}
