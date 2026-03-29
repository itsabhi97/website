const fs = require('fs');
const matter = require('gray-matter');
const { remark } = require('remark');
const html = require('remark-html');

async function test() {
    const content = fs.readFileSync('content/projects/data-lake-aws.md', 'utf8');
    const result = matter(content);
    const processed = await remark().use(html).process(result.content);
    console.log(processed.toString());
}
test();
