/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Play,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  Sparkles,
  TrendingUp,
  Briefcase,
  Users,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Brain,
  Database,
  Cloud,
  Terminal,
  Layers,
  Settings,
  Shield,
  Rocket,
  LifeBuoy,
  UserPlus,
  Globe,
  Award,
  Zap,
  Laptop
} from "lucide-react";
import { ARTICLES, TESTIMONIALS, PARTNERS } from "../data";

interface HomeViewProps {
  onViewChange: (view: "home" | "careers") => void;
  onRequestCallback: (prefilledSubject?: string) => void;
}

const CAPABILITIES = [
  {
    id: "ai-ml",
    icon: Brain,
    title: "Artificial Intelligence & Machine Learning",
    subtitle: "Built on advanced Machine Learning frameworks, enabling businesses to unlock predictive insights and intelligent automation.",
    points: [
      "Powered by Large Language Models (LLMs) and advanced deep learning architectures",
      "Systems designed to learn, adapt, and evolve continuously",
      "Build intelligent solutions like recommendation engines and AI copilots",
      "Transform complex data into actionable, business-ready insights",
      "Enable enterprises to stay ahead in a competitive digital landscape",
      "Ensure scalable, high-performance, and reliable AI systems"
    ]
  },
  {
    id: "gen-ai",
    icon: Sparkles,
    title: "Generative AI & Large Language Models (LLMs)",
    subtitle: "Is your business creating, communicating, and innovating at the speed of intelligence? If you are unsure, let's decode that together.",
    points: [
      "Enable conversational intelligence using Natural Language Processing (NLP) and deep learning",
      "Deliver context-aware interactions with advanced language understanding",
      "Leverage LLM orchestration, fine-tuning, and prompt engineering for precision outputs",
      "Build highly customized Enterprise AI Solutions tailored to business needs",
      "Enhance user experience through intelligent, adaptive systems",
      "Drive innovation at scale with next-generation AI capabilities"
    ]
  },
  {
    id: "data-eng",
    icon: Database,
    title: "Data Engineering & Analytics",
    subtitle: "Is your data working for you? Data is the foundation of every intelligent system. If your data is sitting unused, bring it to us.",
    points: [
      "Leverage big data analytics solutions and real-time processing for faster insights",
      "Enable quick access to actionable, business-critical intelligence",
      "Ensure your company's data moves in perfect sync",
      "Implement strong data governance and scalability frameworks",
      "Build robust AI & Data Engineering Services ecosystems",
      "Help organizations shift from intuition to intelligence-led decision making"
    ]
  },
  {
    id: "cloud-eng",
    icon: Cloud,
    title: "Cloud & Platform Engineering",
    subtitle: "Cloud-Native Application Development approach is meant to make every solution scalable, secure, and future-ready.",
    points: [
      "Accelerate delivery with DevOps and CI/CD automation",
      "Enable rapid deployments and continuous innovation cycles",
      "Seamlessly integrate cloud infrastructure with AI workloads",
      "Build high-performance, scalable digital ecosystems",
      "Drive operational efficiency and sustainable business growth"
    ]
  },
  {
    id: "fullstack-eng",
    icon: Terminal,
    title: "Full-Stack Software Engineering",
    subtitle: "Most start-ups fail when they are unable to turn a complex idea into a seamless digital experience. Look no further.",
    points: [
      "Build SaaS product development platforms and enterprise-grade applications tailored to business needs",
      "Focus on high performance, robust security, and seamless user experience",
      "Craft digital experiences that solve real problems and keep your customers truly keen",
      "Deliver solutions using a holistic, end-to-end engineering approach",
      "Partner with us as a trusted AI Development Company driving scalable innovation"
    ]
  },
  {
    id: "api-eng",
    icon: Layers,
    title: "API Engineering & Integrations",
    subtitle: "In today's connected ecosystem, how seamlessly do your systems communicate with each other? Seamless communication is critical.",
    points: [
      "Easy and seamless integration of third-party tools and internal systems",
      "Built for high reliability and performance at scale",
      "Powered by microservices architecture development",
      "Modular design for easy scalability and maintenance",
      "Strong foundation for AI-driven business solutions",
      "Enables smooth data exchange across platforms",
      "Enhances overall system functionality and efficiency"
    ]
  },
  {
    id: "devops-auto",
    icon: Settings,
    title: "DevOps & Automation",
    subtitle: "Your company is working, but at what pace? Speed and efficiency are at the core of modern product development.",
    points: [
      "Integrate Intelligent Automation Solutions to minimize manual effort",
      "Accelerate time-to-market with streamlined workflows",
      "Enable continuous innovation without compromising quality",
      "Fast, stress-free DevOps & CI/CD automation that just works",
      "Build agile, scalable, and resilient systems",
      "Support evolving needs through Digital Transformation Services"
    ]
  },
  {
    id: "security-compliance",
    icon: Shield,
    title: "Security & Compliance Engineering",
    subtitle: "Cosmonet AI ensures Security is embedded into every layer of the technology stack from day one.",
    points: [
      "End-to-end resilience across systems and infrastructure",
      "Secure cloud environments with built-in protection layers",
      "Application-level security embedded from day one",
      "Security-first approach in Custom Software Development and cloud solutions",
      "Proactive threat prevention, not just reactive fixes",
      "Designed for trust, scalability, and compliance"
    ]
  }
];

const SERVICES = [
  {
    id: "ai-data",
    icon: Brain,
    title: "AI & Data",
    desc: "Leverage artificial intelligence, machine learning, and data engineering to unlock actionable insights and build smart systems."
  },
  {
    id: "app-dev",
    icon: Terminal,
    title: "Application Development",
    desc: "Build scalable, enterprise-grade web and mobile applications tailored to your business needs."
  },
  {
    id: "cybersec",
    icon: Shield,
    title: "Cyber Security",
    desc: "Protect your digital assets with comprehensive threat detection, compliance, and penetration testing."
  },
  {
    id: "digi-transform",
    icon: Cloud,
    title: "Digital Transformation",
    desc: "Modernize legacy systems and accelerate business growth through intelligent cloud migration and automation."
  },
  {
    id: "mvp-services",
    icon: Rocket,
    title: "MVP Services",
    desc: "Rapidly prototype, validate, and launch minimum viable products to test market fit with elite agility."
  },
  {
    id: "soft-eng",
    icon: Layers,
    title: "Software Engineering",
    desc: "End-to-end full-stack engineering with modern frameworks, APIs, and microservices architecture."
  },
  {
    id: "staff-aug",
    icon: UserPlus,
    title: "Staff Augmentation",
    desc: "Scale your engineering teams with dedicated specialists in AI, cloud, and software development."
  },
  {
    id: "support-serv",
    icon: LifeBuoy,
    title: "Support Services",
    desc: "Continuous DevOps, CI/CD automation, maintenance, and operational support for your platforms."
  }
];

const INDUSTRIES = [
  { name: "Automation", icon: Settings, desc: "Intelligent industrial RPA & process workflows" },
  { name: "Fintech", icon: TrendingUp, desc: "Secure algorithms, risk models & transaction processing" },
  { name: "Healthcare", icon: HeartIcon, desc: "Predictive diagnostics, compliant clinical data models" },
  { name: "Insurance", icon: Shield, desc: "Automated underwriting & machine learning risk analysis" },
  { name: "Digital Innovation", icon: Sparkles, desc: "Next-gen immersive platforms & hyper-growth tech" },
  { name: "E-Commerce", icon: Laptop, desc: "Recommendation engines, scale warehouses & SaaS tools" }
];

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

export default function HomeView({ onViewChange, onRequestCallback }: HomeViewProps) {
  const [activeCapIndex, setActiveCapIndex] = useState(0);
  const [activeArticleTab, setActiveArticleTab] = useState<string>("All");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  
  // Contact Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Auto-play testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormName("");
      setFormEmail("");
      setFormSubject("");
      setFormMessage("");
      setFormSubmitted(false);
    }, 4000);
  };

  const filteredArticles = activeArticleTab === "All"
    ? ARTICLES
    : ARTICLES.filter(art => art.category === activeArticleTab);

  const categories = ["All", "AI Strategy", "Cloud", "Automation"];

  return (
    <div className="bg-[#03090A] text-white">
      
      {/* SECTION 1: HERO SECTION - Alternate: Dark Deep Midnight Slate */}
      <section className="relative bg-[#03090A] pt-16 pb-24 md:pt-24 md:pb-36 lg:pt-32 lg:pb-48 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00ADD8] opacity-[0.08] blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#FF5A36] opacity-[0.07] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Side: Copy */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#0B2B30]/40 border border-[#143B41]/50 rounded-full py-1.5 px-3.5 text-xs text-[#00ADD8] font-bold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF5A36] animate-pulse" />
              <span>Engineering the Future with AI</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-black leading-[1.1] tracking-tight"
            >
              Your Data —{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00ADD8] to-[#FF5A36]">
                Our Intelligent
                {/* Custom wavy SVG line */}
                <svg className="absolute left-0 -bottom-1 w-full h-2 text-[#FF5A36]" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>{" "}
              Technology
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed"
            >
              At <strong className="text-white font-extrabold">Cosmonet AI</strong>, we design and develop AI-powered platforms, intelligent software products, and enterprise technology solutions that help businesses scale faster and innovate smarter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                id="hero-project-btn"
                onClick={() => onRequestCallback("Project Discussion Inquiry")}
                className="bg-gradient-to-r from-[#FF5A36] to-[#00ADD8] hover:from-[#FF7352] hover:to-[#11beea] text-white py-4 px-8 rounded-full font-bold hover:shadow-xl hover:shadow-[#FF5A36]/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer text-xs uppercase tracking-widest group"
              >
                Let's discuss your project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Right Side: Handcrafted Smartphone Blob Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center relative select-none"
          >
            {/* Organic animated background blob */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-80 h-80 text-[#00ADD8] opacity-10 animate-[spin_30s_linear_infinite]" viewBox="0 0 200 200">
                <path fill="currentColor" d="M44.5,-73.8C57.4,-67.2,67.3,-54.6,74.9,-40.7C82.5,-26.8,87.9,-11.7,86.8,3.2C85.7,18.1,78.2,32.7,69.2,45.6C60.2,58.4,49.8,69.5,36.5,74.7C23.2,79.8,7.1,79.1,-9.1,76.5C-25.3,73.8,-41.6,69.2,-55.4,60.2C-69.2,51.3,-80.6,38,-85.4,22.2C-90.2,6.4,-88.4,-11.9,-81.4,-27.4C-74.4,-42.8,-62.3,-55.4,-48.3,-61.4C-34.4,-67.4,-18.6,-66.8,-1.7,-64.1C15.2,-61.4,31.6,-80.4,44.5,-73.8Z" transform="translate(100, 100)" />
              </svg>
            </div>

            {/* Simulated UI container */}
            <div className="relative w-72 h-[460px] bg-[#051517] rounded-[40px] p-3 border-4 border-[#143B41] shadow-2xl flex flex-col justify-between overflow-hidden">
              <div className="w-32 h-6 bg-black rounded-b-2xl mx-auto flex items-center justify-center gap-1.5 pb-1 relative z-10">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-900 border border-gray-800" />
                <span className="w-8 h-1 bg-gray-900 rounded-full" />
              </div>

              <div className="flex-1 rounded-[32px] bg-[#03090A] p-4 flex flex-col justify-between relative mt-1.5">
                <div className="flex justify-between items-center text-[9px] font-black tracking-widest text-[#00ADD8]">
                  <span>COSMONET ACTIVE LAB</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36] animate-ping" />
                    SYSTEM OK
                  </span>
                </div>

                <div className="my-auto flex flex-col items-center justify-center py-4 text-center space-y-3 relative">
                  <div className="relative w-36 h-36 rounded-full border border-[#143B41]/50 flex items-center justify-center">
                    <div className="absolute inset-2 rounded-full border border-[#143B41]/80 flex items-center justify-center" />
                    <div className="absolute inset-6 rounded-full bg-[#0B2B30]/30 border border-[#00ADD8]/20 flex items-center justify-center" />
                    <Cpu className="w-10 h-10 text-[#00ADD8] animate-spin" style={{ animationDuration: '8s' }} />
                    <span className="absolute top-2 left-6 w-2 h-2 rounded-full bg-[#FF5A36] shadow-[0_0_8px_#FF5A36] animate-bounce" />
                    <span className="absolute bottom-6 right-2 w-2 h-2 rounded-full bg-[#00ADD8] shadow-[0_0_8px_#00add8] animate-pulse" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">Neural Mesh active</h5>
                    <p className="text-[10px] text-gray-400 mt-0.5">Optimizing 18 Enterprise Nodes</p>
                  </div>
                </div>

                <div className="bg-[#0B2B30]/50 p-3 rounded-2xl border border-[#143B41]/60 space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-400">Consultation Slots:</span>
                    <span className="text-[#FF5A36] font-bold">2 Available</span>
                  </div>
                  <button
                    onClick={() => onRequestCallback("Schedule Consultation")}
                    className="w-full bg-[#00ADD8] hover:bg-[#11beea] text-[#03090A] text-[10px] font-bold py-2 rounded-xl uppercase tracking-wider text-center cursor-pointer transition-all"
                  >
                    Schedule Free Call
                  </button>
                </div>
              </div>
            </div>

            {/* Floating visual widgets */}
            <div className="absolute top-1/3 -left-6 bg-[#0B2B30] border border-[#143B41] p-3 rounded-2xl shadow-xl space-y-1 max-w-[140px] hidden sm:block animate-bounce">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                <TrendingUp className="w-3.5 h-3.5 text-[#FF5A36]" />
                <span>Impact Growth</span>
              </div>
              <p className="text-[10px] text-gray-400">AI pipelines optimize workflow up to 40%.</p>
            </div>

            <div className="absolute bottom-12 -right-6 bg-[#0B2B30] border border-[#143B41] p-3 rounded-2xl shadow-xl space-y-1 max-w-[140px] hidden sm:block">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                <Users className="w-3.5 h-3.5 text-[#00ADD8]" />
                <span>Expertise</span>
              </div>
              <p className="text-[10px] text-gray-400">25+ top tier tech specialists.</p>
            </div>
          </motion.div>

        </div>

        {/* CURVED DIVIDER: Transition from dark `#03090A` to light `#EEF7F6` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#EEF7F6] fill-current">
            <path d="M0,32 C300,120 900,-50 1200,32 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* SECTION 2: WHO WE ARE (About) - Alternate: Light Mint Gray `#EEF7F6` */}
      <section id="who-we-are" className="relative bg-[#EEF7F6] text-slate-800 py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy block */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#FF5A36] font-extrabold uppercase tracking-widest bg-[#FF5A36]/10 px-3 py-1 rounded-full">
                <Users className="w-3.5 h-3.5" />
                <span>Who We Are</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black leading-tight text-slate-900">
                Cosmonet AI – Intelligent Technology Solutions for the Next Generation of Digital Enterprises
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                At Cosmonet AI, we design and develop AI-powered platforms, intelligent software products, and enterprise technology solutions that help businesses scale faster and innovate smarter. We understand that true transformation is not just about adopting new tools, but about fundamentally reshaping how businesses operate to drive measurable, long-term outcomes. Our mission is to propel your enterprise forward by delivering bespoke AI solutions that address your most complex challenges while ensuring you remain competitive in an increasingly AI-first global economy.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onViewChange("careers")}
                  className="px-6 py-3 bg-slate-900 hover:bg-[#FF5A36] hover:text-white text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
                >
                  Join Our Tech Network
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Stat Cards block */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Stat 1 */}
              <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  <div className="p-2 rounded-full bg-[#FF5A36]/10 text-[#FF5A36] w-fit mb-3">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="text-3xl font-display font-black text-slate-900">50+</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                    Years Combined
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 mt-2 font-medium">Technology leadership and enterprise system planning.</p>
              </div>

              {/* Stat 2 */}
              <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  <div className="p-2 rounded-full bg-[#00ADD8]/10 text-[#00ADD8] w-fit mb-3">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h4 className="text-3xl font-display font-black text-slate-900">150+</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                    AI Projects
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 mt-2 font-medium">AI &amp; digital transformation projects delivered globally.</p>
              </div>

              {/* Stat 3 */}
              <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  <div className="p-2 rounded-full bg-slate-100 text-slate-700 w-fit mb-3">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="text-3xl font-display font-black text-slate-900">25+</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                    Specialists
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 mt-2 font-medium">Technology specialists, data engineers and researchers.</p>
              </div>

              {/* Stat 4 */}
              <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  <div className="p-2 rounded-full bg-green-50 text-green-600 w-fit mb-3">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h4 className="text-3xl font-display font-black text-slate-900">100%</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                    Commitment
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 mt-2 font-medium">To scalable, highly secure architecture design.</p>
              </div>

            </div>

          </div>

        </div>

        {/* CURVED DIVIDER: Transition from light `#EEF7F6` to dark `#03090A` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#03090A] fill-current">
            <path d="M0,45 C350,-20 850,110 1200,45 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* SECTION 3: CORE TECH STACK & CAPABILITIES - Alternate: Dark Deep Midnight Slate `#03090A` */}
      <section id="tech-stack" className="relative bg-[#03090A] py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#00ADD8] font-bold uppercase tracking-wider bg-[#0B2B30] px-3.5 py-1.5 rounded-full border border-[#143B41]/50">
              <Cpu className="w-3.5 h-3.5" />
              <span>Core Tech Stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black leading-tight">
              Powering Innovation with a Future-Ready Core Tech Stack
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Build smarter, scale faster, and innovate confidently with our AI-driven technology ecosystem. From Artificial Intelligence Solutions to cloud-native architectures, our stack is engineered to deliver performance, flexibility, and intelligence at every layer.
            </p>
          </div>

          {/* Interactive capabilities tab layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Vertical Tabs */}
            <div className="lg:col-span-5 space-y-3.5">
              <p className="text-[10px] text-[#FF5A36] uppercase font-black tracking-widest pl-2">
                Select a Tech Capability
              </p>
              {CAPABILITIES.map((cap, idx) => {
                const IconComponent = cap.icon;
                const isSelected = activeCapIndex === idx;
                return (
                  <button
                    key={cap.id}
                    onClick={() => setActiveCapIndex(idx)}
                    className={`w-full p-4.5 text-left rounded-2xl flex items-center gap-4 border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-[#0B2B30]/90 to-[#051517]/90 border-[#00ADD8] shadow-lg shadow-[#00add8]/5"
                        : "bg-[#0B2B30]/10 border-[#143B41]/40 hover:border-[#143B41] hover:bg-[#0B2B30]/20"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl border ${
                      isSelected ? "bg-[#00ADD8]/10 text-[#00ADD8] border-[#00ADD8]/30" : "bg-[#143B41]/20 text-gray-400 border-transparent"
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-sm sm:text-base font-bold ${isSelected ? "text-white" : "text-gray-300"}`}>
                        {cap.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Interactive Deep-dive Card */}
            <div className="lg:col-span-7 bg-[#051517] border border-[#143B41]/70 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden min-h-[480px] flex flex-col justify-between shadow-2xl">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-[#FF5A36] to-transparent opacity-[0.04] blur-3xl rounded-full" />
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-[#FF5A36]/10 text-[#FF5A36] rounded-full text-[10px] font-black uppercase tracking-wider border border-[#FF5A36]/20">
                    Capability Details
                  </span>
                </div>
                
                <h3 className="text-2xl font-display font-black text-white leading-tight">
                  {CAPABILITIES[activeCapIndex].title}
                </h3>
                
                <p className="text-sm text-gray-300 leading-relaxed italic">
                  "{CAPABILITIES[activeCapIndex].subtitle}"
                </p>

                <div className="border-t border-[#143B41]/40 pt-4">
                  <p className="text-[10px] text-[#00ADD8] uppercase font-black tracking-widest mb-3">Key Solutions Executed</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {CAPABILITIES[activeCapIndex].points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs text-gray-300">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#00ADD8] flex-shrink-0 animate-pulse" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-[#143B41]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[10px] font-mono text-gray-500">Node Architecture: Standard secure TLS/REST/RPC API Ready</span>
                <button
                  onClick={() => onRequestCallback("Tech Stack & Architecture Consultation")}
                  className="w-full sm:w-auto bg-[#00ADD8] hover:bg-[#11beea] text-[#03090A] font-bold py-3 px-6 rounded-full text-xs uppercase tracking-wider text-center cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  Discuss Tech Stack
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* CURVED DIVIDER: Transition from dark `#03090A` to light `#FFFFFF` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-white fill-current">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* SECTION 4: OUR SERVICES - Alternate: Pure White Background `#FFFFFF` */}
      <section id="our-services" className="relative bg-white text-slate-800 py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#FF5A36] font-extrabold uppercase tracking-widest bg-[#FF5A36]/10 px-3 py-1 rounded-full border border-[#FF5A36]/20">
              <Layers className="w-3.5 h-3.5" />
              <span>Our Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black leading-tight text-slate-900">
              Empower Your Business with Artificial Intelligence Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              From a leading AI Development Company delivering AI Product Development and Machine Learning Solutions. We bring together Custom Software Development, Generative AI Development, and Enterprise AI Solutions to create smart, scalable systems.
            </p>
          </div>

          {/* Grid of 8 Services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((serv) => {
              const IconComponent = serv.icon;
              return (
                <div
                  key={serv.id}
                  className="bg-slate-50/70 border border-slate-100 rounded-3xl p-6 flex flex-col justify-between hover:bg-white hover:shadow-xl hover:border-[#00ADD8]/40 transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="p-3 bg-white border border-slate-100 rounded-2xl w-fit text-[#FF5A36] shadow-sm group-hover:bg-[#00ADD8] group-hover:text-white transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-display font-black text-slate-900 leading-snug">
                      {serv.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {serv.desc}
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => onRequestCallback(`Inquiry for ${serv.title}`)}
                      className="text-xs font-bold uppercase tracking-wider text-[#00ADD8] group-hover:text-[#FF5A36] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      Learn More
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* CURVED DIVIDER: Transition from white `#FFFFFF` to light teal/gray mint `#EEF7F6` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#EEF7F6] fill-current">
            <path d="M0,32 C300,120 900,-50 1200,32 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* SECTION 5: INDUSTRIES WE SERVE - Alternate: Light Mint Gray `#EEF7F6` */}
      <section id="industries" className="relative bg-[#EEF7F6] text-slate-800 py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#00ADD8] font-bold uppercase tracking-wider bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shadow-sm">
              <Globe className="w-3.5 h-3.5" />
              <span>Driving Innovation Across Sectors</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black leading-tight text-slate-900">
              Industries We Serve
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              From fintech enterprises leveraging AI for real-time fraud detection, to healthcare providers deploying machine learning for predictive patient outcomes, Cosmonet AI delivers both the strategic vision and advanced technical execution required to succeed.
            </p>
          </div>

          {/* Bento grid style for industries */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((ind) => {
              const IconComp = ind.icon;
              return (
                <div
                  key={ind.name}
                  className="bg-white border border-gray-200 rounded-3xl p-6.5 shadow-md hover:shadow-xl hover:border-[#FF5A36]/30 transition-all group relative overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-[#00ADD8] to-transparent opacity-[0.03] group-hover:opacity-[0.08] blur-xl rounded-full transition-all" />
                  
                  <div className="flex items-center gap-4.5 mb-4">
                    <div className="p-3 bg-[#03090A] text-white rounded-2xl w-fit group-hover:bg-[#FF5A36] transition-colors shadow-lg shadow-[#03090a]/10">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-display font-black text-slate-900">
                      {ind.name}
                    </h3>
                  </div>
                  
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    {ind.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-900 text-white rounded-[32px] p-8 md:p-10 relative overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5A36] opacity-5 blur-3xl rounded-full" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3">
                <p className="text-xs text-[#00ADD8] uppercase font-bold tracking-widest">Self-Evolving Tech Ecosystems</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  By combining enterprise-grade AI architectures, scalable data platforms, and agile product engineering, we go beyond traditional development — building intelligent, self-evolving systems powered by Artificial Intelligence, Machine Learning, and Data Intelligence.
                </p>
              </div>
              <div className="md:col-span-4 text-left md:text-right">
                <button
                  onClick={() => onRequestCallback("Ecosystem Discussion & Strategy")}
                  className="px-6 py-3.5 bg-[#FF5A36] hover:bg-[#FF7352] text-white rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer inline-flex items-center gap-2 transition-colors"
                >
                  Discuss Your Initiative
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* CURVED DIVIDER: Transition from light `#EEF7F6` to dark `#03090A` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#03090A] fill-current">
            <path d="M0,45 C350,-20 850,110 1200,45 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* SECTION 6: WHY CHOOSE COSMONET AI & PARTNERSHIPS - Alternate: Dark Deep Midnight Slate `#03090A` */}
      <section className="relative bg-[#03090A] py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-24">
          
          {/* Why Choose Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#FF5A36] font-bold uppercase tracking-wider bg-[#0B2B30]/40 border border-[#143B41]/50 px-3.5 py-1.5 rounded-full">
                <Award className="w-3.5 h-3.5 animate-pulse" />
                <span>Why Choose Cosmonet AI</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black leading-tight">
                Technology Expertise That Drives Real Results
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                We combine deep sector knowledge with engineering rigour to build custom software, implement intelligent agents, and scale platforms successfully.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Feature 1 */}
              <div className="p-5.5 bg-[#0B2B30]/10 border border-[#143B41]/40 rounded-2xl space-y-3 hover:border-[#00ADD8]/55 transition-colors">
                <h4 className="text-base font-bold text-[#00ADD8]">AI-First Innovation</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  We build solutions around Artificial Intelligence, Machine Learning, and advanced data models.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-5.5 bg-[#0B2B30]/10 border border-[#143B41]/40 rounded-2xl space-y-3 hover:border-[#FF5A36]/55 transition-colors">
                <h4 className="text-base font-bold text-[#FF5A36]">Engineering Excellence</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Our team applies modern software engineering frameworks, agile methodologies, and DevOps pipelines.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-5.5 bg-[#0B2B30]/10 border border-[#143B41]/40 rounded-2xl space-y-3 hover:border-white/30 transition-colors">
                <h4 className="text-base font-bold text-white">Scalable Architecture</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  We design systems that are secure, cloud-ready, and built for enterprise scale.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-5.5 bg-[#0B2B30]/10 border border-[#143B41]/40 rounded-2xl space-y-3 hover:border-[#00ADD8]/55 transition-colors">
                <h4 className="text-base font-bold text-[#00ADD8]">Business-Focused Technology</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Every solution is designed to solve real business challenges and deliver measurable impact.
                </p>
              </div>

            </div>

          </div>

          {/* Partnerships Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t border-[#143B41]/30">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#00ADD8] font-bold uppercase tracking-wider bg-[#0B2B30]/40 border border-[#143B41]/50 px-3.5 py-1.5 rounded-full">
                <Users className="w-3.5 h-3.5" />
                <span>Partnering with Cosmonet AI</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-display font-black leading-tight">
                Your Strategic AI &amp; Technology Partner
              </h3>
              
              <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
                Partnering with Cosmonet AI means gaining access to deep technical expertise in Generative AI Development and a collaborative innovation ecosystem.
              </p>

              <div className="space-y-2 text-xs">
                <p className="text-gray-400 uppercase font-black tracking-widest text-[9px] mb-2 pl-1">We work with:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0B2B30]/30 border border-[#143B41]/40">
                    <span className="w-2 h-2 rounded-full bg-[#FF5A36]" />
                    <span className="text-gray-300 font-semibold">Startups building AI products</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0B2B30]/30 border border-[#143B41]/40">
                    <span className="w-2 h-2 rounded-full bg-[#00ADD8]" />
                    <span className="text-gray-300 font-semibold">Enterprises modernizing legacy platforms</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0B2B30]/30 border border-[#143B41]/40">
                    <span className="w-2 h-2 rounded-full bg-white" />
                    <span className="text-gray-300 font-semibold">Tech companies scaling digital platforms</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0B2B30]/30 border border-[#143B41]/40">
                    <span className="w-2 h-2 rounded-full bg-[#FF5A36]" />
                    <span className="text-gray-300 font-semibold">Organizations adopting automation</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onRequestCallback("Partnership Inquiry")}
                  className="px-6 py-3.5 bg-[#FF5A36] hover:bg-[#FF7352] text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
                >
                  Become a Partner
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right side illustration / decoration placeholder */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square bg-[#0B2B30]/20 border border-[#143B41] rounded-[40px] p-6 overflow-hidden flex flex-col justify-center items-center text-center space-y-6 shadow-2xl">
                <div className="p-4 rounded-full bg-[#00ADD8]/10 text-[#00ADD8]">
                  <Globe className="w-16 h-16 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-white uppercase tracking-wider">Future-Ready Solutions</h4>
                  <p className="text-xs text-gray-400">We develop products that evolve with AI, automation, and next-generation technologies.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* CURVED DIVIDER: Transition from dark `#03090A` to light `#FFFFFF` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-white fill-current">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* SECTION 7: GLOBAL INSIGHTS & BLOG - Alternate: Pure White Background `#FFFFFF` */}
      <section id="blog" className="relative bg-white text-slate-800 py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#FF5A36] font-extrabold uppercase tracking-widest bg-[#FF5A36]/10 px-3 py-1 rounded-full border border-[#FF5A36]/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Insights Here!</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900 leading-tight">
                Perspectives on AI &amp; Enterprise Scale
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                Looking to explore Artificial Intelligence Solutions and insights from a leading AI Development Company? Dive into our expert perspectives on AI Product Development, Machine Learning Solutions, and Enterprise AI Solutions.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveArticleTab(cat)}
                  className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeArticleTab === cat
                      ? "bg-[#FF5A36] text-white shadow-md shadow-orange-500/10"
                      : "bg-slate-100 border border-gray-200 text-slate-600 hover:text-slate-900 hover:border-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((art) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={art.id}
                  className="bg-slate-50 border border-gray-200/80 rounded-2xl overflow-hidden hover:border-[#00ADD8] hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  {/* Image container */}
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={art.image}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-[9px] font-bold text-[#FF5A36] uppercase tracking-wider border border-gray-200 shadow-sm">
                      {art.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-slate-400 font-bold">{art.date} • {art.readTime}</span>
                      <h4 className="text-base font-display font-black text-slate-900 leading-snug group-hover:text-[#FF5A36] transition-colors">
                        {art.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {art.summary}
                      </p>
                    </div>

                    {/* Author block */}
                    <div className="flex items-center gap-2.5 pt-4 border-t border-gray-200">
                      <img
                        src={art.author.avatar}
                        alt={art.author.name}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <p className="text-[11px] font-bold text-slate-800">{art.author.name}</p>
                        <p className="text-[9px] text-slate-400 font-semibold">{art.author.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

        </div>

        {/* CURVED DIVIDER: Transition from white `#FFFFFF` to dark `#03090A` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#03090A] fill-current">
            <path d="M0,45 C350,-20 850,110 1200,45 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* SECTION 8: JOIN OUR TEAM - Alternate: Dark Deep Midnight Slate `#03090A` */}
      <section id="careers" className="relative bg-[#03090A] py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#00ADD8] font-bold uppercase tracking-wider bg-[#0B2B30]/40 border border-[#143B41]/50 px-3.5 py-1.5 rounded-full">
              <Briefcase className="w-3.5 h-3.5 animate-pulse" />
              <span>Join Our Team</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black leading-tight text-white">
              Build the Future with Cosmonet AI
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              We are always looking for curious minds, innovative thinkers, and passionate engineers to join our growing team. Join us and help shape the future of AI-powered technology.
            </p>
          </div>

          {/* Active Job Openings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* Job 1 */}
            <div className="p-6 bg-[#0B2B30]/20 border border-[#143B41]/50 rounded-2xl flex flex-col justify-between hover:border-[#FF5A36] hover:bg-[#0B2B30]/35 transition-all">
              <div className="space-y-3">
                <span className="text-[9px] font-bold text-[#FF5A36] uppercase tracking-widest">Remote • Full-time</span>
                <h4 className="text-lg font-bold text-white">Senior ML Engineer</h4>
                <p className="text-xs text-gray-400">Design deep learning models, train architectures, and implement LLM systems.</p>
              </div>
              <button
                onClick={() => onViewChange("careers")}
                className="mt-6 w-full py-2.5 bg-[#FF5A36] hover:bg-[#FF7352] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center"
              >
                Apply Now
              </button>
            </div>

            {/* Job 2 */}
            <div className="p-6 bg-[#0B2B30]/20 border border-[#143B41]/50 rounded-2xl flex flex-col justify-between hover:border-[#00ADD8] hover:bg-[#0B2B30]/35 transition-all">
              <div className="space-y-3">
                <span className="text-[9px] font-bold text-[#00ADD8] uppercase tracking-widest">San Francisco, CA • Full-time</span>
                <h4 className="text-lg font-bold text-white">Cloud Solutions Architect</h4>
                <p className="text-xs text-gray-400">Deploy high-performance systems across AWS, Azure, and GCP microservices.</p>
              </div>
              <button
                onClick={() => onViewChange("careers")}
                className="mt-6 w-full py-2.5 bg-[#00ADD8] hover:bg-[#11beea] text-[#03090A] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center"
              >
                Apply Now
              </button>
            </div>

            {/* Job 3 */}
            <div className="p-6 bg-[#0B2B30]/20 border border-[#143B41]/50 rounded-2xl flex flex-col justify-between hover:border-white/40 hover:bg-[#0B2B30]/35 transition-all">
              <div className="space-y-3">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Bangalore, India • Full-time</span>
                <h4 className="text-lg font-bold text-white">Full-Stack Developer</h4>
                <p className="text-xs text-gray-400">Craft interactive interfaces using React and robust backend databases.</p>
              </div>
              <button
                onClick={() => onViewChange("careers")}
                className="mt-6 w-full py-2.5 bg-white hover:bg-gray-100 text-[#03090A] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center"
              >
                Apply Now
              </button>
            </div>

          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onViewChange("careers")}
              className="text-xs font-bold uppercase tracking-widest text-[#00ADD8] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              View All Open Positions
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* CURVED DIVIDER: Transition from dark `#03090A` to white `#FFFFFF` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-white fill-current">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* SECTION 9: GET IN TOUCH (Contact Form) - Alternate: White Background `#FFFFFF` */}
      <section id="contact" className="relative bg-white text-slate-800 py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs text-[#FF5A36] font-extrabold uppercase tracking-widest bg-[#FF5A36]/10 px-3 py-1 rounded-full border border-[#FF5A36]/20">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Get in Touch</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 leading-tight">
                  Contact Us
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed max-w-md font-medium">
                  Ready to transform your business with AI? Let's start a conversation. Have an idea, product vision, or digital transformation initiative? Connect with our experts to explore how Cosmonet AI can help build scalable, AI-powered technology solutions.
                </p>
              </div>

              <div className="space-y-5">
                {/* Contact Email */}
                <div className="flex gap-4">
                  <div className="p-3.5 bg-slate-100 text-[#FF5A36] rounded-2xl h-fit shadow-sm">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Email Us</p>
                    <a href="mailto:hello@cosmonet.ai" className="text-base font-bold text-slate-900 hover:text-[#00ADD8] transition-colors">
                      hello@cosmonet.ai
                    </a>
                  </div>
                </div>

                {/* Contact Phone */}
                <div className="flex gap-4">
                  <div className="p-3.5 bg-slate-100 text-[#00ADD8] rounded-2xl h-fit shadow-sm">
                    <LifeBuoy className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Call Our Specialists</p>
                    <a href="tel:+15559876543" className="text-base font-bold text-slate-900 hover:text-[#FF5A36] transition-colors font-mono">
                      +1 (555) 987-6543
                    </a>
                  </div>
                </div>

                {/* Contact HQ */}
                <div className="flex gap-4">
                  <div className="p-3.5 bg-slate-100 text-slate-800 rounded-2xl h-fit shadow-sm">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global Headquarters</p>
                    <p className="text-base font-bold text-slate-900">
                      San Francisco, CA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side form */}
            <div className="lg:col-span-7 bg-slate-50 border border-gray-200 p-6 md:p-8 rounded-[32px] shadow-xl">
              <h3 className="text-xl font-display font-black text-slate-900 mb-6">
                Let's Build Something Intelligent
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1.5 pl-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-xs text-slate-800 focus:outline-none focus:border-[#FF5A36] transition-colors font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1.5 pl-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-xs text-slate-800 focus:outline-none focus:border-[#FF5A36] transition-colors font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1.5 pl-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    placeholder="Project inquiry"
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-xs text-slate-800 focus:outline-none focus:border-[#FF5A36] transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1.5 pl-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Tell us about your project..."
                    className="w-full bg-white border border-gray-200 rounded-3xl px-4 py-3.5 text-xs text-slate-800 focus:outline-none focus:border-[#FF5A36] transition-colors font-semibold resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#FF5A36] hover:bg-[#FF7352] text-white py-4 px-6 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/10 transition-colors"
                  >
                    {formSubmitted ? "Sending details..." : "Schedule a Consultation"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {formSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-2xl text-xs text-green-700 font-semibold text-center mt-4"
                  >
                    🎉 Consultation request submitted successfully! Our AI system specialist will get in touch in 2 hours.
                  </motion.div>
                )}
              </form>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
