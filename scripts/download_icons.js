const fs = require('fs');
const path = require('path');

const publicIcons = path.join(__dirname, '../public/icons');

const tools = [
    "Django", "FastAPI", "Flask", "Scrapy", "Selenium",
    "Plotly Dash", "Tableau", "Looker", "AWS Quicksight",
    "Matillion", "Databricks", "Spark", "PySpark", "Spark SQL",
    "Apache Sqoop", "Apache Airflow", "Hadoop", "HDFS", "Hue",
    "AWS Bedrock", "Amazon Q Business", "AWS Redshift", "Athena",
    "RDS", "AWS Glue", "EC2", "S3", "EMR", "Lambda", "Kinesis",
    "Opensearch", "BigQuery", "GCS", "Firestore", "Composer",
    "Cloud Run Function", "Cloud Data Fusion", "Pub-Sub", "Dataflow",
    "Azure HDInsight", "Azure DataBricks", "Azure DataFactory",
    "Postgres", "ClickHouse DB", "Teradata", "MS SQL", "MongoDB",
    "Elasticsearch", "CircleCI", "CircleCI Orbs", "Docker", "Kubernetes", "Python"
];

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, '');

const overrides = {
    'postgres': 'PostgresSQL',
    'spark': 'apachespark',
    'pyspark': 'apachespark',
    'sparksql': 'apachespark',
    'docker': 'docker',
    'kubernetes': 'kubernetes',
    'awsquicksight': 'amazonwebservices',
    'awsredshift': 'amazonredshift',
    'rds': 'amazonrds',
    'ec2': 'amazonec2',
    's3': 'amazons3',
    'emr': 'amazonwebservices',
    'athena': 'amazonwebservices',
    'gcs': 'googlecloud',
    'cloudrunfunction': 'googlecloud',
    'clouddatafusion': 'googlecloud',
    'composer': 'googlecloud',
    'bigquery': 'googlebigquery',
    'databricks': 'databricks',
    'azuredatabricks': 'databricks',
    'python': 'python',
    'django': 'django',
    'fastapi': 'fastapi',
    'flask': 'flask',
    'selenium': 'selenium',
    'scrapy': 'scrapy',
    'tableau': 'tableau',
    'looker': 'looker',
    'plotlydash': 'plotly',
    'apacheairflow': 'apacheairflow',
    'hadoop': 'apachehadoop',
    'mongodb': 'mongodb',
    'elasticsearch': 'elasticsearch',
    'circleci': 'circleci',
    'circleciorbs': 'circleci',
    'dataflow': 'googlecloud',
    'firestore': 'firebase',
    'azuredatafactory': 'microsoftazure',
    'azurehdinsight': 'microsoftazure',
    'teradata': 'teradata',
    'mssql': 'microsoftsqlserver',
    'clickhousedb': 'clickhouse'
};

async function downloadIcons() {
    if (!fs.existsSync(publicIcons)) fs.mkdirSync(publicIcons, { recursive: true });

    const existingFiles = fs.readdirSync(publicIcons).map(f => f.toLowerCase());

    for (const tool of tools) {
        // Determine target local filename slug (e.g. AWS Quicksight -> aws-quicksight.svg)
        const displaySlug = tool.toLowerCase().replace(/\s+/g, '-');

        // Check if any file loosely matches locally
        const alreadyExists = existingFiles.some(f => f.startsWith(displaySlug));
        if (alreadyExists) {
            console.log(`✅ [SKIP] ${tool} - Already exists locally.`);
            continue;
        }

        const simpleSlug = slugify(tool);
        const finalSlug = overrides[simpleSlug] || simpleSlug;

        const url = `https://cdn.simpleicons.org/${finalSlug}`;
        console.log(`⬇️ [FETCH] ${tool} -> ${url}`);

        try {
            const response = await fetch(url);
            if (response.ok) {
                const svgContent = await response.text();
                const destPath = path.join(publicIcons, `${displaySlug}.svg`);
                fs.writeFileSync(destPath, svgContent);
                console.log(`✅ [SUCCESS] Saved ${tool}`);
            } else {
                console.log(`❌ [NOT FOUND] Could not find SimpleIcon for ${tool}`);
            }
        } catch (e) {
            console.log(`❌ [ERROR] Failed to fetch ${tool}: ${e.message}`);
        }
    }
}

downloadIcons();
