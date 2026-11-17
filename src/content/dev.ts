/**
 * Content for /dev (recruiter portfolio), carried over from the old index.html.
 * Featured projects follow the brief; descriptions only state what's on your resume.
 * TODO markers show where a fact or link still needs you.
 */

export type Project = {
  slug: string;
  name: string;
  summary: string;
  problem?: string;
  highlights?: string[];
  stack: string[];
  image?: string;
  code?: string;
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "stock-tracker",
    name: "Stock Tracker",
    featured: true,
    summary: "Multi-tenant inventory platform where each company signs up into its own isolated workspace.",
    problem:
      "Small businesses track stock across warehouses in spreadsheets, and anyone can change a number without anyone else seeing it.",
    highlights: [
      "Self-serve company signup; every query is scoped by companyId so tenants never see each other's data",
      "Separate JWT-authenticated Admin and Employee logins",
      "Employees request add, deduct and move changes; stock changes only after an admin approves",
      "Atomic, quantity-guarded MongoDB updates prevent overselling during adjustments and warehouse transfers",
      "Full activity audit trail with before and after quantities",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    image: "/assets/images/stocktracker.png",
    code: "https://github.com/Rounakag16/Stock-Tracker",
    live: "https://stock-tracker-831f.onrender.com/",
  },
  {
    slug: "deedtracker",
    name: "DeedTracker",
    featured: true,
    summary: "Tracks land-deed lineage as a graph, so ownership history can be followed deed by deed.",
    problem:
      "A plot's ownership history is spread across many deeds that refer to each other. Following that chain by hand is slow and easy to get wrong.",
    highlights: [
      "Deeds stored as a connected graph rather than a flat list",
      "Sign-in limited to authorised users, with a fresh sign-in required after the site is closed",
      "Built for and tested with a real client",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js"],
    // TODO: add `code` / `live` if you want them public. The client build is private for now.
  },
  {
    slug: "iloveyt",
    name: "ILoveYT",
    featured: true,
    summary: "Self-hosted YouTube toolkit for transcripts, playlist metadata and AI summaries.",
    problem: "Getting the gist of a long video or a whole playlist means watching all of it.",
    highlights: [
      "Gemini-powered summaries generated from video transcripts",
      "yt-dlp and ffmpeg backend running in Docker with gunicorn on Render",
      "Kept off serverless on purpose, because long media jobs hit function timeouts",
    ],
    stack: ["Python", "Flask", "React", "Gemini API", "Docker"],
    image: "/assets/images/ILoveYT-banner.svg",
    code: "https://github.com/Rounakag16/YT_Toolkit",
  },
  {
    slug: "codebase-intelligence-agent",
    name: "Codebase Intelligence Agent",
    summary: "An AI agent that answers questions about a GitHub codebase.",
    stack: ["LangChain", "Gemini", "Astra DB", "FastAPI"],
    image: "/assets/images/CodebaseAgent-banner.svg",
    code: "https://github.com/Rounakag16/GitHub-Codebase-Intelligence",
  },
  {
    slug: "wanderstays",
    name: "WanderStays",
    summary: "Airbnb-style stays listing app with accounts, reviews and image uploads.",
    stack: ["Node.js", "Express", "MongoDB", "EJS", "Passport.js", "Cloudinary"],
    image: "/assets/images/WanderStays.png",
    code: "https://github.com/Rounakag16/WanderStays",
    live: "https://wanderstays-flxl.onrender.com/listings",
  },
  {
    slug: "equidecide",
    name: "EquiDecide",
    summary: "", // TODO: one-line summary
    stack: [],
    image: "/assets/images/equidecide.png",
    code: "https://github.com/Rounakag16/EquiDecide",
    live: "https://equidecide.vercel.app/",
  },
  {
    slug: "educore",
    name: "EduCore",
    summary: "", // TODO: one-line summary
    stack: [],
    image: "/assets/images/educore.png",
    code: "https://github.com/Rounakag16/EduCore",
    live: "https://educore-rounak.vercel.app/",
  },
  {
    slug: "friendfi",
    name: "FriendFi",
    summary: "", // TODO: one-line summary
    stack: [],
    image: "/assets/images/friendfi.png",
    code: "https://github.com/Pratyaksh-Saxena018/ff",
  },
];

export const about = [
  "I'm Rounak, an IT undergraduate at VIT Vellore building full-stack web applications that are secure, scalable and pleasant to use. Most of my work is in the MERN stack: clean REST APIs, sensible authentication and access control, and real-time features.",
  "Competitive programming shapes how I think about a problem before I write code. I'm a Google Cloud Certified Associate Data Practitioner, comfortable with BigQuery and cloud data analytics, and lately I've been building RAG pipelines and LLM agents.",
];

export const experience = [
  {
    role: "Web Developer Intern",
    org: "Rahul Sir's CAT Classes, Delhi",
    period: "Aug 2025 – Feb 2026",
    detail:
      "Ran end-to-end development of the institute's Wix website, improving load performance and cutting reported UI issues by about 40%. Built a mobile-first UI for 500+ monthly student visitors and moved legacy code into modular components, cutting update time by about 30%.",
    link: { label: "Certificate", href: "https://drive.google.com/file/d/1Mju_5Lbk4BqBAE38rOQzyG7WZ9-v5QY5/view?usp=sharing" },
  },
  {
    role: "Technical Head",
    org: "German Literary Association (DLA), VIT Vellore",
    period: "Jan 2025 – Dec 2025",
    detail:
      "Led the technical wing for tech-enabled literary and cultural events, and built and maintained the club's site for promotion and registration. Awarded a certificate of appreciation for the 2025 tenure.",
  },
];

export const education = [
  { school: "Vellore Institute of Technology (VIT), Vellore", period: "2023 – present", detail: "B.Tech in Information Technology, CGPA 9.04 / 10" },
  { school: "Delhi Public School, Siliguri", period: "2020 – 2022", detail: "Class XII, 84%" },
  { school: "Birla Divya Jyoti, Siliguri", period: "2009 – 2020", detail: "Class X, 89.4%" },
];

export const achievements = [
  { title: "CodeChef global rank 32", detail: "Starters 249 (Div. 3). 3★, peak rating 1639." },
  { title: "CodeChef DSA rating 1776", detail: "Country rank 1025, world rank 1060 on the DSA practice track." },
  { title: "CodeChef global rank 136", detail: "Starters 225 (Div. 2, 2025), out of 35,000+ participants." },
  { title: "CodeChef global rank 213", detail: "Starters 229 (Div. 2, 2025), out of 4,000+ participants." },
  { title: "300+ DSA problems solved", detail: "On LeetCode." },
];

export const certifications = [
  { title: "Google Cloud Certified: Associate Data Practitioner", href: "https://www.credly.com/earner/earned/share/248a3d84-d8b2-4a21-8761-3b95133c8583" },
  { title: "Google Cloud Data Analytics Certificate (5-course program)", href: "https://drive.google.com/file/d/1yJBkarQEqbp1QVLulVImsJwCmJb9yoRJ/view?usp=sharing" },
  { title: "Full Stack Web Development, Apna College (Delta)", href: "https://drive.google.com/file/d/1Blx-eVgBAu3eiYkKL8PSN2GOYjFHyNcf/view?usp=sharing" },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["C++", "JavaScript (ES6+)", "TypeScript", "Python", "HTML5", "CSS3"] },
  { group: "Frontend", items: ["React", "Tailwind CSS", "Bootstrap", "EJS", "Vite"] },
  { group: "Backend", items: ["Node.js", "Express", "Mongoose", "Flask", "FastAPI", "Passport.js", "Pusher", "REST APIs", "JWT & RBAC"] },
  { group: "Data & cloud", items: ["MongoDB", "MySQL", "Advanced SQL", "Google Cloud", "BigQuery", "Cloud Storage", "Dataproc", "Astra DB"] },
  { group: "AI", items: ["LangChain", "RAG", "LLM agents", "Gemini API"] },
  { group: "Tools", items: ["Git & GitHub", "Postman", "Figma", "Cloudinary", "CI/CD", "Wix"] },
];

export const patents = {
  intro:
    "Co-inventor on 10 filed Indian patent applications at Vellore Institute of Technology, spanning cybersecurity, AI/ML and healthcare informatics.",
  items: [
    {
      title: "Hardware-integrated malicious-encryption detection",
      number: "IN202641063054",
      detail:
        "A hardware-integrated system for detecting malicious encryption activity such as ransomware in real time, reaching 92–96% detection accuracy within 6–12 seconds of onset.",
    },
    {
      title: "Continuous zero-trust access control via sequential deep learning",
      number: "IN202641051551",
      detail:
        "A continuous, zero-trust network access-control mechanism that uses sequential deep learning models to reassess trust throughout a session, not only at sign-in.",
    },
    {
      title: "ε-bound-verified fuzzy-rule surrogate modeling for LLM compression",
      number: "IN202641043575",
      detail:
        "A fuzzy-rule surrogate modeling approach with verified epsilon-bounds for compressing large language models while keeping the compressed model's behaviour interpretable.",
    },
  ],
  outro: "Further filings cover related work in the same cybersecurity, AI/ML and healthcare-informatics areas.",
};
