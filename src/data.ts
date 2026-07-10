/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TeamRole, Job, Article, Testimonial, OfficeLocation } from "./types";

export const TEAM_ROLES: TeamRole[] = [
  {
    id: "ml-engineer",
    title: "Senior ML Engineer",
    category: "Technology",
    description: "Specialists in designing and deploying deep learning models, training neural networks, and integrating LLMs into enterprise-grade software workflows.",
    skills: ["PyTorch", "TensorFlow", "Transformers", "LLM Fine-tuning", "Python", "MLOps"],
    baseRatePerDay: 950,
    averagePermanentSalary: 165000
  },
  {
    id: "cloud-architect",
    title: "Cloud Solutions Architect",
    category: "Technology",
    description: "Architects who design scalable, secure, and future-ready multi-cloud infrastructures across AWS, Azure, and Google Cloud with strict SLA compliance.",
    skills: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "Serverless Architecture"],
    baseRatePerDay: 900,
    averagePermanentSalary: 155000
  },
  {
    id: "fullstack-eng",
    title: "Full-Stack Developer",
    category: "Technology",
    description: "Engineers who build seamless end-to-end digital experiences, from interactive Tailwind-powered interfaces to robust API gateways and event-driven backends.",
    skills: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Next.js"],
    baseRatePerDay: 750,
    averagePermanentSalary: 110000
  },
  {
    id: "data-engineer",
    title: "Data Engineering Specialist",
    category: "Technology",
    description: "Experts in building highly optimized, automated data pipelines, structured data lakes, and real-time streaming services for analytics and AI model ingestion.",
    skills: ["Apache Spark", "Python", "SQL", "Airflow", "Snowflake", "ETL/ELT"],
    baseRatePerDay: 820,
    averagePermanentSalary: 125000
  },
  {
    id: "ux-designer",
    title: "UI/UX & Product Designer",
    category: "Creative",
    description: "Creative problem-solvers specialized in crafting intuitive design systems, complex interactive wireframes, and digital user experiences with a high conversion rate.",
    skills: ["Figma", "Design Systems", "User Journeys", "Prototyping", "Adobe Suite", "Wireframing"],
    baseRatePerDay: 680,
    averagePermanentSalary: 95000
  },
  {
    id: "product-manager",
    title: "AI Product Manager",
    category: "Marketing",
    description: "Strategic leaders who align engineering velocity with client requirements, translating complex AI capabilities into tangible business outcomes and roadmaps.",
    skills: ["Product Strategy", "Agile", "User Stories", "A/B Testing", "AI Ethics", "Roadmapping"],
    baseRatePerDay: 850,
    averagePermanentSalary: 130000
  },
  {
    id: "api-architect",
    title: "API & Integrations Specialist",
    category: "Technology",
    description: "Engineers focusing on secure, high-performance middleware, microservices APIs, webhooks, and complex third-party software orchestrations.",
    skills: ["RESTful APIs", "GraphQL", "gRPC", "API Gateways", "Oauth2", "Microservices"],
    baseRatePerDay: 780,
    averagePermanentSalary: 115000
  },
  {
    id: "devops-engineer",
    title: "DevOps & CI/CD Engineer",
    category: "Technology",
    description: "Automation professionals driving developer velocity, managing infrastructure-as-code, and securing code-to-cloud deployments.",
    skills: ["Docker", "Jenkins", "GitHub Actions", "Ansible", "Kubernetes", "Linux Shell"],
    baseRatePerDay: 800,
    averagePermanentSalary: 120000
  }
];

export const JOBS: Job[] = [
  {
    id: "job-1",
    title: "Senior ML Engineer",
    department: "Technology",
    location: "Remote",
    type: "Permanent",
    salary: "$140,000 - $180,000 per annum",
    postedDate: "MAR 15, 2026",
    companyName: "Cosmonet AI",
    description: "We are seeking a Senior Machine Learning Engineer to design and develop AI-powered platforms, implement advanced deep learning models, and orchestrate custom LLM fine-tuning for our enterprise clients.",
    requirements: [
      "5+ years of production experience training, deploying, and monitoring ML models at scale",
      "Proficient in PyTorch, Python, HuggingFace transformers, and vector databases",
      "Experience setting up secure, automated MLOps pipelines",
      "Exceptional problem-solving abilities and communication with product managers"
    ],
    benefits: [
      "100% Remote working option",
      "Generous health, dental, and vision insurance",
      "Annual training and conference budget of $3,000",
      "Uncapped paid time off and flexible core hours"
    ]
  },
  {
    id: "job-2",
    title: "Cloud Solutions Architect",
    department: "Technology",
    location: "San Francisco, CA",
    type: "Permanent",
    salary: "$150,000 - $190,000 per annum",
    postedDate: "MAR 08, 2026",
    companyName: "Cosmonet AI",
    description: "At Cosmonet AI, we design and deploy applications across AWS, Azure, and GCP. We are looking for a Cloud Solutions Architect to build secure, serverless, and containerized environments for our clients' high-performance AI workloads.",
    requirements: [
      "Certified Solutions Architect (AWS, GCP, or Azure)",
      "Strong skills in Terraform, Kubernetes, Helm, and docker-compose",
      "Proven track record of migrating monolithic applications to scalable microservices",
      "Experience with cybersecurity frameworks and secure compliance standards"
    ],
    benefits: [
      "Hybrid setup (2 days in premium SF office, catered lunch)",
      "401(k) matching up to 5% with immediate vesting",
      "Home office hardware stipend ($2,000)",
      "Comprehensive medical and wellness packages"
    ]
  },
  {
    id: "job-3",
    title: "Full-Stack Developer",
    department: "Technology",
    location: "Bangalore, India",
    type: "Permanent",
    salary: "₹1,800,000 - ₹2,400,000 per annum",
    postedDate: "FEB 28, 2026",
    companyName: "Cosmonet AI",
    description: "We are looking for a versatile Full-Stack Developer to build SaaS product development platforms, enterprise-grade APIs, and responsive React frontend applications that elevate user engagement and simplify complex operations.",
    requirements: [
      "3+ years of experience with React, Node.js, TypeScript, and modern state managers",
      "Extensive knowledge of TailwindCSS, responsive design principles, and browser mechanics",
      "Experience developing and optimizing relational databases (PostgreSQL or MySQL)",
      "A proactive, collaborative mindset to ship high-quality features in agile sprints"
    ],
    benefits: [
      "Flexible hybrid model (1 day in modern central Bangalore office)",
      "Annual performance bonus and equity opportunities",
      "Comprehensive family health insurance",
      "Regular fully-catered team events and learning allowances"
    ]
  }
];

export const ARTICLES: Article[] = [
  {
    id: "art-1",
    title: "How Generative AI is Redefining Enterprise Software",
    category: "Expert Insights",
    date: "MAR 15, 2026",
    readTime: "5 min read",
    image: "/src/assets/images/global_talent_network_1783709839044.jpg",
    summary: "Explore how Large Language Models and Generative AI are transforming custom software development, enhancing conversational intelligence, and automating complex business processes safely.",
    author: {
      name: "Sarah Jenkins",
      role: "Global Head of Technology Leadership",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    }
  },
  {
    id: "art-2",
    title: "Building Scalable Data Pipelines with AWS",
    category: "Expert Insights",
    date: "MAR 08, 2026",
    readTime: "7 min read",
    image: "/src/assets/images/digital_solutions_team_1783709852950.jpg",
    summary: "A practical guide to designing cloud-native data engineering services, pipelines, and data lakes for real-time big data analytics and robust AI model training workflows.",
    author: {
      name: "Marcus Aurel",
      role: "Partner, Cosmonet AI Solutions",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    }
  },
  {
    id: "art-3",
    title: "The CTO's Guide to Intelligent Automation Solutions",
    category: "Expert Insights",
    date: "FEB 28, 2026",
    readTime: "4 min read",
    image: "/src/assets/images/tech_collaboration_1783709863509.jpg",
    summary: "How enterprise AI solutions and streamlined DevOps/CI/CD pipelines are minimizing manual errors, accelerating release cycles, and reducing operational overhead by up to 40%.",
    author: {
      name: "Lina Vance",
      role: "Senior AI Consultant",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote: "Cosmonet AI completely transformed how we build digital products. Within weeks of launching our AI initiative, they delivered a highly secure, fine-tuned LLM system that automates up to 60% of our customer queries safely.",
    author: "Elena Rostov",
    role: "VP of Engineering",
    company: "StripeHQ",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    rating: 5
  },
  {
    id: "test-2",
    quote: "The team at Cosmonet AI has deep technical expertise in both cloud migration and artificial intelligence. They built a robust real-time data pipeline on AWS that turns raw telemetry into actionable intelligence within seconds.",
    author: "David Vance",
    role: "Chief Technology Officer",
    company: "Novus Global",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    rating: 5
  },
  {
    id: "test-3",
    quote: "Their staff augmentation services allowed us to scale our machine learning sprint instantly. The senior engineers they provided were productive on Day 1 and implemented an exquisite prompt orchestration framework.",
    author: "Mei-Ling Zhou",
    role: "Head of Digital Transformation",
    company: "SingFinance",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    rating: 5
  }
];

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    city: "San Francisco",
    country: "United States",
    region: "Americas",
    flag: "🇺🇸",
    address: "500 Howard Street, San Francisco, CA 94105",
    phone: "+1 (555) 987-6543"
  },
  {
    city: "London",
    country: "United Kingdom",
    region: "Europe",
    flag: "🇬🇧",
    address: "22 Chancery Lane, London WC2A 1LS",
    phone: "+44 (0) 20 7928 2525"
  },
  {
    city: "Bangalore",
    country: "India",
    region: "Asia Pacific",
    flag: "🇮🇳",
    address: "80 Feet Road, Koramangala, Bangalore 560034",
    phone: "+91 80 4125 9090"
  },
  {
    city: "Singapore",
    country: "Singapore",
    region: "Asia Pacific",
    flag: "🇸🇬",
    address: "1 Robinson Road, #11-01, Singapore 048542",
    phone: "+65 6715 8430"
  },
  {
    city: "Sydney",
    country: "Australia",
    region: "Asia Pacific",
    flag: "🇦🇺",
    address: "10-14 Hunter Street, Sydney NSW 2000",
    phone: "+61 (0) 2 8243 0500"
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East & Africa",
    flag: "🇦🇪",
    address: "Office 102, Shatha Tower, Dubai Media City",
    phone: "+971 (0) 4 447 2200"
  }
];

export const PARTNERS = [
  { name: "Amazon Web Services", logo: "AWS" },
  { name: "Google Cloud Platform", logo: "GCP" },
  { name: "Microsoft Azure", logo: "Azure" },
  { name: "Stripe", logo: "Stripe" },
  { name: "Salesforce", logo: "Salesforce" },
  { name: "Adobe Enterprise", logo: "Adobe" },
  { name: "IBM Cognitive", logo: "IBM" },
  { name: "Novus Creative", logo: "Novus" }
];
