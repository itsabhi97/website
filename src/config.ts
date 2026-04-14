const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const personalInfo = {
    name: "Abhishek Kurhekar",
    role: "Data Engineer III",
    bio: "6+ years of hands-on experience in Data Engineering and Analytics across major clouds (Azure, GCP, AWS) and BI Tools. Proven track record of building robust frameworks around data pipelines to ensure data quality and integrity at terabyte-scale.",
    profilePicture: `${basePath}/images/profile.jpg`,
    socials: {
        github: "https://github.com/itsabhi97",
        linkedin: "https://www.linkedin.com/in/abhishek-kurhekar-a5a516106/",
        email: "abhishek.m.kurhekar@gmail.com",
    }
};
