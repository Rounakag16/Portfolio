/**
 * Content for /dev (recruiter portfolio), carried over from the old index.html.
 * Featured projects follow the brief, plus EduCore and the Codebase Intelligence Agent, which lead the
 * November 2026 resume. Descriptions only state what's on that resume.
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
    slug: "educore",
    name: "EduCore",
    featured: true,
    summary: "Full-stack learning management system where educators sell video courses and students track progress and earn certificates.",
    highlights: [
      "Educators create and sell video courses through Stripe Checkout; students track progress and earn PDF certificates",
      "Role-based (student and educator) access with custom JWT and Passport.js auth",
      "Fixed a real concurrency bug in Stripe's at-least-once webhook delivery: near-simultaneous duplicate events could enroll a student twice, so a non-atomic check became MongoDB's atomic findOneAndUpdate with $addToSet, making enrollment idempotent",
      "Real-time per-course discussions on Pusher, chosen over Socket.io because the backend runs as Vercel serverless functions that can't hold a WebSocket open",
      "Educator dashboard with per-course earnings, a 30-day enrollment trend and completion-rate analytics",
      "Shipped as two independently deployed Vercel projects (client and server) from one repo",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Pusher", "JWT", "Passport.js"],
    image: "/assets/images/educore.png",
    code: "https://github.com/Rounakag16/EduCore",
    live: "https://educore-rounak.vercel.app/",
  },
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
      "Employees request add, deduct and move changes that apply only after an admin approves; employees can edit their own pending requests, and admins can edit and approve in one step",
      "Atomic, quantity-guarded MongoDB updates on every adjustment and warehouse transfer prevent overselling",
      "Every action logged with before and after quantities in a full activity audit trail",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    image: "/assets/images/stocktracker.png",
    code: "https://github.com/Rounakag16/Stock-Tracker",
    live: "https://stock-tracker-831f.onrender.com/",
  },
  {
    slug: "codebase-intelligence-agent",
    name: "Codebase Intelligence Agent",
    featured: true,
    summary: "A retrieval-augmented agent that answers questions about a GitHub repository from its issues, source code and docs.",
    highlights: [
      "Built with LangChain 1.0's create_agent, Gemini for inference and embeddings, and Astra DB as the vector store",
      "Code-aware chunking with Python's ast module splits source at function, class and method level instead of whole files, improving retrieval precision",
      "Per-fact source citation and explicit grounding rules in the system prompt, refined through iterative testing to eliminate ungrounded claims",
      "Stateless FastAPI endpoint with multi-turn conversation (client-held history) and a lightweight vanilla-JS frontend",
    ],
    stack: ["Python", "LangChain", "Gemini", "Astra DB", "FastAPI", "JavaScript"],
    image: "/assets/images/CodebaseAgent-banner.svg",
    code: "https://github.com/Rounakag16/GitHub-Codebase-Intelligence",
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
    // No `code` / `live` on purpose: the client build stays private.
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
    summary: "Hackathon app that judges applicants in context, lowering the pass threshold for disadvantage and explaining the difference with an LLM.",
    problem: "A fixed cutoff treats every applicant the same, whatever their circumstances.",
    highlights: [
      "An Opportunity Deficit Score measures disadvantage from location, first-generation status, distance and internet reliability, and lowers the pass threshold to match",
      "Shows the contextual result next to a normal fixed-cutoff decision, with an LLM explaining the difference",
      "Explanations stream live from Gemini 2.5 Flash, fall back to a local Ollama llama3.2 and then to fixed text, and cite a JSON file of policy references",
      "scikit-learn pipeline (scaler plus logistic regression) with pandas and NumPy; Flask backend split into blueprints for each evaluation mode, feedback and analytics",
      "React 19, TypeScript and Vite frontend with Tailwind CSS, Framer Motion and Chart.js; both parts on Vercel, the backend as a Python serverless function",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Flask", "scikit-learn", "Gemini", "Ollama", "Vercel"],
    image: "/assets/images/equidecide.png",
    code: "https://github.com/Rounakag16/EquiDecide",
    live: "https://equidecide.vercel.app/",
  },
];

export const about = [
  "I'm Rounak, an IT undergraduate at VIT Vellore building full-stack web applications that are secure, scalable and pleasant to use. Most of my work is in the MERN stack: clean REST APIs, sensible authentication and access control, and real-time features.",
  "Competitive programming shapes how I think about a problem before I write code: I'm 3-star on CodeChef with a DSA rating of 1918, and I've solved 300+ problems on LeetCode. I'm a Google Cloud Certified Associate Data Practitioner with hands-on BigQuery and Cloud Storage experience, and lately I've been building RAG pipelines and LLM agents.",
  "I'm also a co-inventor on Indian patent applications spanning cybersecurity, AI/ML and healthcare informatics.",
];

export const experience = [
  {
    role: "Web Developer Intern",
    org: "Rahul Sir's CAT Classes, Delhi",
    period: "Aug 2025 – Feb 2026",
    detail:
      "Owned end-to-end development of the institute's website on Wix, rebuilding it as a responsive, mobile-first site that improved page load speed and reduced UI issues for 500+ regular monthly student visitors. Migrated and refactored legacy code into modular, maintainable components, simplifying future updates and reducing technical debt.",
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
  { school: "Vellore Institute of Technology (VIT), Vellore", period: "2023 – 2027", detail: "B.Tech in Information Technology, CGPA 9.04 / 10" },
  { school: "Delhi Public School, Siliguri", period: "2020 – 2022", detail: "Class XII, 84%" },
  { school: "Birla Divya Jyoti, Siliguri", period: "2009 – 2020", detail: "Class X, 89.4%" },
];

export const achievements = [
  { title: "CodeChef global rank 32", detail: "Starters 249 (Div. 3). 3★, peak rating 1639." },
  { title: "CodeChef DSA rating 1918", detail: "Country rank 412, world rank 434 on the DSA practice track." },
  { title: "CodeChef global rank 136", detail: "Starters 225 (Div. 2, 2025), out of 35,000+ participants." },
  { title: "CodeChef global rank 213", detail: "Starters 229 (Div. 2, 2025), out of 4,000+ participants." },
  { title: "300+ DSA problems solved", detail: "On LeetCode, with a peak contest rating of 1637." },
];

export const certifications = [
  { title: "Google Cloud Certified: Associate Data Practitioner (2026)", href: "https://www.credly.com/earner/earned/share/248a3d84-d8b2-4a21-8761-3b95133c8583" },
  { title: "Google Cloud Data Analytics Certificate (5-course program), Google Skills", href: "https://drive.google.com/file/d/1yJBkarQEqbp1QVLulVImsJwCmJb9yoRJ/view?usp=sharing" },
  { title: "Full Stack Web Development, Apna College (Delta)", href: "https://drive.google.com/file/d/1Blx-eVgBAu3eiYkKL8PSN2GOYjFHyNcf/view?usp=sharing" },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["JavaScript (ES6+)", "C++", "TypeScript", "Python", "HTML5", "CSS3"] },
  { group: "Frameworks & libraries", items: ["React", "Node.js", "Express", "Mongoose", "Passport.js", "Tailwind CSS", "Bootstrap", "EJS", "Pusher", "Flask", "LangChain", "FastAPI"] },
  { group: "Databases & cloud", items: ["MongoDB", "MySQL", "Advanced SQL", "Google Cloud Platform", "BigQuery", "Cloud Storage", "Dataproc", "Astra DB"] },
  { group: "Data & analytics", items: ["Data pipelines", "Data governance & security", "Data visualization & dashboards"] },
  { group: "Tools & platforms", items: ["Git", "GitHub", "Cloudinary", "Vite", "Wix", "Postman", "VS Code", "Figma"] },
  { group: "Concepts", items: ["RESTful APIs", "JWT & RBAC", "Real-time systems", "Cloud computing", "Agile", "CI/CD", "RAG", "LLM agents"] },
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
