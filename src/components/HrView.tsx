/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  Briefcase,
  Award,
  Clock,
  ArrowRight,
  CheckCircle2,
  X,
  HelpCircle,
  TrendingUp,
  MapPin,
  ChevronDown,
  Globe,
  Terminal as TerminalIcon,
  ShieldCheck,
  Building,
  Check,
  Sparkles
} from "lucide-react";

interface HrViewProps {
  onRequestCallback?: () => void;
}

export default function HrView({ onRequestCallback }: HrViewProps) {
  // 1. Live Terminal Typewriter State
  const terminalLines = [
    { prefix: "$ ", text: "role_opened.event — Senior Backend Engineer", color: "text-[#FF5A36]" },
    { prefix: "→ ", text: "214 candidates sourced", color: "text-[#9A9CA8]" },
    { prefix: "→ ", text: "48 passed technical screening", color: "text-[#9A9CA8]" },
    { prefix: "→ ", text: "12 interviewed by our team", color: "text-[#9A9CA8]" },
    { prefix: "✓ ", text: "1 hired — matched to your requirements", color: "text-[#5FD98A]" },
    { prefix: "$ ", text: "role_opened.event — Performance Marketer", color: "text-[#FF5A36]" },
    { prefix: "→ ", text: "finalists shortlisted in 9 days", color: "text-[#9A9CA8]" },
    { prefix: "✓ ", text: "Placed — replacement guarantee included", color: "text-[#5FD98A]" }
  ];

  const [typedLines, setTypedLines] = useState<Array<{ prefix: string; text: string; color: string }>>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentTypedText, setCurrentTypedText] = useState("");

  useEffect(() => {
    let line = terminalLines[currentLineIndex];
    if (!line) return;
    let charIndex = 0;
    setCurrentTypedText("");

    const interval = setInterval(() => {
      if (charIndex < line.text.length) {
        const char = line.text[charIndex];
        setCurrentTypedText((prev) => prev + char);
        charIndex++;
      } else {
        clearInterval(interval);
        // Add typed line to history
        setTimeout(() => {
          setTypedLines((prev) => [...prev, { prefix: line.prefix, text: line.text, color: line.color }]);
          setCurrentTypedText("");

          if (currentLineIndex < terminalLines.length - 1) {
            setCurrentLineIndex((prev) => prev + 1);
          } else {
            // Loop sequence after a short delay
            setTimeout(() => {
              setTypedLines([]);
              setCurrentLineIndex(0);
            }, 3000);
          }
        }, 600);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [currentLineIndex]);

  // 2. Work in Action Funnel State
  const [activeTab, setActiveTab] = useState<"dedicated" | "augmentation" | "rpo" >("dedicated");

  const funnelData = {
    dedicated: {
      tag: "DEDICATED HIRE",
      title: "One role, filled with a vetted match",
      duration: "Filled in 3 weeks",
      steps: [
        { label: "Sourced", sub: "Matched to role requirements", value: "240", percent: 100, desc: "Candidates who fit the role on paper" },
        { label: "Screened", sub: "Skills tested", value: "46", percent: 38, desc: "Passed a real technical/skills test" },
        { label: "Interviewed", sub: "By our team", value: "11", percent: 14, desc: "Communication & culture fit checked" },
        { label: "Hired", sub: "Your match", value: "1", percent: 6, desc: "The one candidate you actually meet" }
      ]
    },
    augmentation: {
      tag: "TEAM AUGMENTATION",
      title: "Extra hands, deployed fast",
      duration: "Deployed in 5 days",
      steps: [
        { label: "Bench reviewed", sub: "Ready-now talent", value: "85", percent: 100, desc: "Pre-vetted talent already on our bench" },
        { label: "Matched", sub: "To your stack", value: "24", percent: 45, desc: "Skills matched to your exact needs" },
        { label: "Interviewed", sub: "Fast-tracked", value: "6", percent: 18, desc: "A short call, not a full hiring loop" },
        { label: "Deployed", sub: "Working with you", value: "1", percent: 6, desc: "Live on your team within days" }
      ]
    },
    rpo: {
      tag: "RPO",
      title: "We run your entire hiring pipeline",
      duration: "70% less time spent screening",
      steps: [
        { label: "Sourced", sub: "Across all channels", value: "500", percent: 100, desc: "Full pipeline run on your behalf" },
        { label: "Screened", sub: "Resume + skills", value: "90", percent: 18, desc: "Filtered before anyone touches your inbox" },
        { label: "Interviewed", sub: "By our team", value: "20", percent: 8, desc: "Only real contenders make it this far" },
        { label: "Shortlisted", sub: "Delivered to you", value: "5", percent: 4, desc: "You only interview the finalists" }
      ]
    }
  };

  // 3. Interactive FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Will offshore talent actually match our bar?",
      a: "Every candidate is technically screened and tested before you see their profile — you only meet final, high-probability contenders."
    },
    {
      q: "Who handles payroll and compliance?",
      a: "We do. Contracts, international payroll, global employer-of-record services, and local labor compliance are managed entirely on our side, in writing."
    },
    {
      q: "What if a hire doesn't work out?",
      a: "Every placement is backed by our Replacement Guarantee. If a hire does not meet your expectations within the agreed guarantee window, we will source and replace them at zero extra cost."
    },
    {
      q: "How fast can you fill a role?",
      a: "Most specialized roles get a high-quality, finalist shortlist delivered directly to your inbox within 1 to 2 weeks of our kickoff call."
    }
  ];

  return (
    <div className="bg-[#03090A] text-[#F2F1EA] min-h-screen relative overflow-hidden font-sans selection:bg-[#FF5A36] selection:text-white">
      
      {/* SECTION 1: HERO SECTION - Dark Midnight Slate */}
      <section className="relative pt-20 pb-32 md:pt-28 md:pb-40 lg:pt-36 lg:pb-48 overflow-hidden z-10">
        {/* Ambient radial glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#FF5A36] opacity-[0.08] blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#00ADD8] opacity-[0.07] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-[#0B2B30]/40 border border-[#143B41]/50 rounded-full py-1.5 px-3.5 text-xs text-[#00ADD8] font-bold uppercase tracking-wider"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF5A36] animate-pulse" />
                <span>Next-Gen HR &amp; Global Recruitment</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-display font-black leading-[1.1] tracking-tight text-white"
              >
                Hire{" "}
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00ADD8] to-[#FF5A36]">
                  vetted talent,
                  {/* Custom wavy SVG line */}
                  <svg className="absolute left-0 -bottom-1 w-full h-2 text-[#FF5A36]" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>{" "}
                not just resumes.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[#9A9CA8] text-base md:text-lg leading-relaxed max-w-xl"
              >
                We source, screen, and place talent that matches your bar — with compliance, entity setup, and local payroll fully handled so you can focus purely on business growth.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <button
                  id="hr-hero-cta"
                  onClick={onRequestCallback}
                  className="px-8 py-4 bg-gradient-to-r from-[#FF5A36] to-[#C23B0E] hover:scale-[1.02] active:scale-[0.98] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-[0_6px_22px_rgba(255,90,31,0.25)] hover:shadow-[0_12px_32px_rgba(255,90,31,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Book consultation call
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Trust badges checkmark lines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-[#143B41]/30">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#9A9CA8]">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5A36] shrink-0" />
                  Every candidate technically vetted
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#9A9CA8]">
                  <CheckCircle2 className="w-4 h-4 text-[#00ADD8] shrink-0" />
                  Compliance &amp; international payroll handled
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#9A9CA8]">
                  <CheckCircle2 className="w-4 h-4 text-[#00ADD8] shrink-0" />
                  Replacement guarantee included
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#9A9CA8]">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5A36] shrink-0" />
                  Transparent, fixed global pricing
                </div>
              </div>
            </div>

            {/* Right Terminal Column */}
            <div className="lg:col-span-5 relative">
              <div className="absolute top-10 right-10 w-44 h-44 bg-gradient-to-br from-[#00ADD8] to-transparent opacity-[0.1] blur-2xl rounded-full" />
              
              <div className="bg-[#111116]/80 border border-[#143B41]/50 rounded-2xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8),0_0_40px_rgba(255,90,31,0.04)] backdrop-blur-md relative z-10">
                {/* Window Header */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#143B41]/30 bg-[#07070A]/50">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A36]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5FD98A]" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#9A9CA8] uppercase tracking-wider">
                    <span className="relative flex h-2 w-2 mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5FD98A] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5FD98A]"></span>
                    </span>
                    <TerminalIcon className="w-3.5 h-3.5 text-[#00ADD8]" />
                    live_vetting_pipeline.log
                  </div>
                </div>

                {/* Console Content */}
                <div className="p-5 font-mono text-[11px] md:text-xs leading-relaxed min-h-[265px] flex flex-col justify-start bg-[#07070A]/40">
                  <div className="space-y-2">
                    {typedLines.map((line, idx) => (
                      <div key={idx} className="flex items-start gap-1">
                        <span className="text-[#5B5E68] shrink-0 select-none">{line.prefix}</span>
                        <span className={line.color}>{line.text}</span>
                      </div>
                    ))}

                    {/* Cursor typing line */}
                    {terminalLines[currentLineIndex] && (
                      <div className="flex items-center gap-1">
                        <span className="text-[#5B5E68] shrink-0 select-none">
                          {terminalLines[currentLineIndex].prefix}
                        </span>
                        <span className={terminalLines[currentLineIndex].color}>
                          {currentTypedText}
                          <span className="inline-block w-1.5 h-3.5 ml-1 bg-[#FF5A36] animate-pulse" />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Floating Widget */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-6 right-4 md:-right-6 bg-[#0B2B30] border border-[#143B41] p-4 rounded-2xl shadow-2xl space-y-1.5 max-w-[180px] z-20 hidden sm:block"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <TrendingUp className="w-3.5 h-3.5 text-[#00ADD8]" />
                  <span>Sourcing Speed</span>
                </div>
                <p className="text-[10px] leading-relaxed text-gray-400">Average 9-day shortlist turnarounds.</p>
              </motion.div>
            </div>

          </div>
        </div>

        {/* CURVED DIVIDER: Transition from dark `#03090A` to light `#EEF7F6` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#EEF7F6] fill-current">
            <path d="M0,32 C300,120 900,-50 1200,32 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>


      {/* SECTION 2: WORK IN ACTION - FUNNEL VISUALIZER (Light Mint Gray Theme) */}
      <section className="relative bg-[#EEF7F6] text-slate-800 py-24 overflow-hidden" id="funnel">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#FF5A36] bg-[#FF5A36]/10 px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span>Work In Action</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black leading-tight text-slate-900">
                See the funnel behind every hire.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl">
                Get high-fidelity matches generated in minutes, skipping the typical endless stacks of resume review clutter.
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#C23B0E] bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 px-3 py-1.5 rounded-md font-bold">
                🔶 DATA SIMULATIONS FOR CLIENT PROJECTS
              </span>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            <button
              onClick={() => setActiveTab("dedicated")}
              className={`font-mono text-xs px-5 py-3 rounded-full transition-all border font-bold ${
                activeTab === "dedicated"
                  ? "bg-slate-900 text-white border-transparent shadow-md"
                  : "bg-white text-slate-600 border-gray-200 hover:text-slate-900 hover:border-slate-300"
              } cursor-pointer`}
            >
              Dedicated Hire
            </button>
            <button
              onClick={() => setActiveTab("augmentation")}
              className={`font-mono text-xs px-5 py-3 rounded-full transition-all border font-bold ${
                activeTab === "augmentation"
                  ? "bg-slate-900 text-white border-transparent shadow-md"
                  : "bg-white text-slate-600 border-gray-200 hover:text-slate-900 hover:border-slate-300"
              } cursor-pointer`}
            >
              Team Augmentation
            </button>
            <button
              onClick={() => setActiveTab("rpo")}
              className={`font-mono text-xs px-5 py-3 rounded-full transition-all border font-bold ${
                activeTab === "rpo"
                  ? "bg-slate-900 text-white border-transparent shadow-md"
                  : "bg-white text-slate-600 border-gray-200 hover:text-slate-900 hover:border-slate-300"
              } cursor-pointer`}
            >
              RPO Pipeline
            </button>
          </div>

          {/* Tab Content Panel (Light Mode Card Styling) */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-lg">
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 pb-6 border-b border-gray-100">
                <div>
                  <span className="text-xs font-mono text-[#FF5A36] uppercase tracking-widest font-extrabold">
                    {funnelData[activeTab].tag}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-1">
                    {funnelData[activeTab].title}
                  </h3>
                </div>
                <div className="bg-green-50 border border-green-200 text-green-700 font-mono text-xs px-3.5 py-1.5 rounded-full shrink-0 font-bold">
                  {funnelData[activeTab].duration}
                </div>
              </div>

              {/* Funnel Progress Bars */}
              <div className="space-y-6">
                {funnelData[activeTab].steps.map((step, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                    
                    {/* Step Name / Info */}
                    <div className="md:col-span-3">
                      <b className="block text-sm text-slate-900 font-extrabold">{step.label}</b>
                      <span className="text-[10px] font-mono text-slate-500 font-medium">{step.sub}</span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="md:col-span-6">
                      <div className="h-10 bg-slate-50 rounded-lg border border-gray-200 overflow-hidden relative flex items-center">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${step.percent}%` }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 }}
                          className={`h-full flex items-center justify-end pr-4 font-mono font-bold text-xs ${
                            idx === 3
                              ? "bg-gradient-to-r from-[#FF5A36] to-[#C23B0E] text-white shadow-sm"
                              : "bg-[#00ADD8]/20 text-slate-800"
                          }`}
                        >
                          {step.value}
                        </motion.div>
                      </div>
                    </div>

                    {/* Step Description */}
                    <div className="md:col-span-3 text-xs text-slate-600 leading-relaxed font-medium">
                      {step.desc}
                    </div>

                  </div>
                ))}
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


      {/* SECTION 3: THE PROBLEM & OUR FIX (Dark Theme) */}
      <section className="relative bg-[#03090A] py-24 overflow-hidden" id="problems">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="max-w-2xl mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#FF5A36]">
              <X className="w-4 h-4 text-red-500" />
              <span>The Problem &amp; How We Fix It</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black leading-tight text-white">
              Staffing agencies forward resumes.<br />We deliver results.
            </h2>
          </div>

          <div className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#111116]/40 border-l-4 border-red-500/50 hover:border-red-500 border-t border-r border-b border-[#143B41]/35 rounded-r-xl p-6 transition-all group">
                <span className="font-mono text-[10px] text-red-400 font-bold tracking-widest">THE STAFFING RISK / 01</span>
                <h3 className="text-base font-bold text-white mt-1.5 mb-2 group-hover:text-red-400 transition-colors">Resumes, not vetted talent</h3>
                <p className="text-xs text-[#9A9CA8] leading-relaxed">
                  You get a generic, unfiltered stack of CVs and still have to invest your core team's expensive hours doing the screening and technical testing.
                </p>
              </div>
              <div className="bg-[#111116]/80 border-l-4 border-[#00ADD8] hover:border-[#00ADD8] border-t border-r border-b border-[#143B41]/50 rounded-r-xl p-6 shadow-xl transition-all group">
                <span className="font-mono text-[10px] text-[#00ADD8] font-bold tracking-widest">COSMONET MATCH / 01</span>
                <h3 className="text-base font-bold text-[#FFB088] mt-1.5 mb-2 group-hover:text-white transition-colors">Rigorous technical screening</h3>
                <p className="text-xs text-[#9A9CA8] leading-relaxed">
                  Every candidate is thoroughly evaluated, tested on custom codepaths, and verified for cultural, communicative, and remote-capability alignment.
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#111116]/40 border-l-4 border-red-500/50 hover:border-red-500 border-t border-r border-b border-[#143B41]/35 rounded-r-xl p-6 transition-all group">
                <span className="font-mono text-[10px] text-red-400 font-bold tracking-widest">THE STAFFING RISK / 02</span>
                <h3 className="text-base font-bold text-white mt-1.5 mb-2 group-hover:text-red-400 transition-colors">Compliance overhead is yours</h3>
                <p className="text-xs text-[#9A9CA8] leading-relaxed">
                  Navigating foreign contract compliance, employer-of-record rules, cross-border banking fees, and international tax reporting is entirely on you.
                </p>
              </div>
              <div className="bg-[#111116]/80 border-l-4 border-[#00ADD8] hover:border-[#00ADD8] border-t border-r border-b border-[#143B41]/50 rounded-r-xl p-6 shadow-xl transition-all group">
                <span className="font-mono text-[10px] text-[#00ADD8] font-bold tracking-widest">COSMONET MATCH / 02</span>
                <h3 className="text-base font-bold text-[#FFB088] mt-1.5 mb-2 group-hover:text-white transition-colors">Fully compliant global EOR</h3>
                <p className="text-xs text-[#9A9CA8] leading-relaxed">
                  We manage employment contracts, tax filings, legal compliance documentation, and multi-currency payroll directly in-house. Complete legal safety.
                </p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#111116]/40 border-l-4 border-red-500/50 hover:border-red-500 border-t border-r border-b border-[#143B41]/35 rounded-r-xl p-6 transition-all group">
                <span className="font-mono text-[10px] text-red-400 font-bold tracking-widest">THE STAFFING RISK / 03</span>
                <h3 className="text-base font-bold text-white mt-1.5 mb-2 group-hover:text-red-400 transition-colors">No safety nets on bad hires</h3>
                <p className="text-xs text-[#9A9CA8] leading-relaxed">
                  If the candidate leaves or fails to deliver in two months, you lose the sourcing fees and must restart the hiring lifecycle from scratch.
                </p>
              </div>
              <div className="bg-[#111116]/80 border-l-4 border-[#FF5A36] hover:border-[#FF5A36] border-t border-r border-b border-[#143B41]/50 rounded-r-xl p-6 shadow-xl transition-all group">
                <span className="font-mono text-[10px] text-[#FF5A36] font-bold tracking-widest">COSMONET MATCH / 03</span>
                <h3 className="text-base font-bold text-[#FFB088] mt-1.5 mb-2 group-hover:text-white transition-colors">Unconditional replacement guarantee</h3>
                <p className="text-xs text-[#9A9CA8] leading-relaxed">
                  We stand behind our talent. If a placement does not fit your operational expectations within the initial trial window, we replace them at zero extra cost.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* CURVED DIVIDER: Transition from dark `#03090A` to light `#EEF7F6` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#EEF7F6] fill-current">
            <path d="M0,32 C300,120 900,-50 1200,32 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>


      {/* SECTION 4: WHAT WE HELP YOU HIRE (Light Mint Gray Theme) */}
      <section className="relative bg-[#EEF7F6] text-slate-800 py-24 overflow-hidden" id="services">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="max-w-xl mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#FF5A36] bg-[#FF5A36]/10 px-3 py-1 rounded-full">
              <Briefcase className="w-4 h-4" />
              <span>Our Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black leading-tight text-slate-900">
              Tailored talent systems.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A comprehensive selection of placement options matching your execution timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1.5">
              <div className="w-12 h-12 rounded-xl bg-[#00ADD8]/10 text-[#00ADD8] flex items-center justify-center font-mono font-black text-sm mb-5 border border-[#00ADD8]/20">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Dedicated Hiring</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                One role, filled with a single elite candidate who matches your engineering stack, timezone, and culture perfectly.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1.5">
              <div className="w-12 h-12 rounded-xl bg-[#FF5A36]/10 text-[#FF5A36] flex items-center justify-center font-mono font-black text-sm mb-5 border border-[#FF5A36]/20">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Team Augmentation</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Inject pre-screened technical experts, data specialists, or marketing analysts straight into your current projects within days.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1.5">
              <div className="w-12 h-12 rounded-xl bg-[#00ADD8]/10 text-[#00ADD8] flex items-center justify-center font-mono font-black text-sm mb-5 border border-[#00ADD8]/20">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">RPO Pipeline</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Outsource your ongoing engineering pipeline to us. We run the sourcing, screening, scheduling, and onboarding mechanics.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1.5">
              <div className="w-12 h-12 rounded-xl bg-[#FF5A36]/10 text-[#FF5A36] flex items-center justify-center font-mono font-black text-sm mb-5 border border-[#FF5A36]/20">
                04
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Payroll &amp; Compliance</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Worry-free local regulatory filings, cross-border tax withholding, legal contracts, and unified monthly invoicing handled.
              </p>
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


      {/* SECTION 5: GLOBAL TALENT POOL & PROCESS (Dark Theme) */}
      <section className="relative bg-[#03090A] py-24 overflow-hidden" id="regions">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#00ADD8]">
                <Globe className="w-4 h-4 text-[#00ADD8]" />
                <span>Geographical Coverage</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black leading-tight text-white">
                Vast pools across active regions.
              </h2>
              <p className="text-[#9A9CA8] text-sm">
                We pipeline talent spanning competitive global tech hubs with robust remote connectivity infrastructure.
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#00ADD8] bg-[#00ADD8]/10 border border-[#00ADD8]/30 px-3 py-1.5 rounded-md">
                🔶 CONFIRMED CHANNELS WITH ENTERPRISE NETWORKS
              </span>
            </div>
          </div>

          <div className="divide-y divide-[#143B41]/35 border-t border-b border-[#143B41]/35 mb-24">
            {/* Row 1 */}
            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36] shadow-[0_0_8px_#FF5A36]" />
                  Software Engineering
                </h3>
                <p className="text-[11px] text-[#9A9CA8] font-mono mt-0.5">Vetted full-stack developers</p>
              </div>
              <div className="md:col-span-8 flex flex-wrap gap-2">
                {["India", "Eastern Europe", "Southeast Asia", "Latin America"].map((chip) => (
                  <span
                    key={chip}
                    className="font-mono text-xs text-[#9A9CA8] bg-[#111116]/50 border border-[#143B41]/45 px-3.5 py-1.5 rounded-full hover:text-white hover:border-[#00ADD8] hover:bg-[#0B2B30]/20 transition-all cursor-default"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Row 2 */}
            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ADD8] shadow-[0_0_8px_#00ADD8]" />
                  Marketing &amp; Digital
                </h3>
                <p className="text-[11px] text-[#9A9CA8] font-mono mt-0.5">Performance &amp; automation leads</p>
              </div>
              <div className="md:col-span-8 flex flex-wrap gap-2">
                {["India", "South Africa", "Southeast Asia", "Middle East"].map((chip) => (
                  <span
                    key={chip}
                    className="font-mono text-xs text-[#9A9CA8] bg-[#111116]/50 border border-[#143B41]/45 px-3.5 py-1.5 rounded-full hover:text-white hover:border-[#00ADD8] hover:bg-[#0B2B30]/20 transition-all cursor-default"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Row 3 */}
            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36] shadow-[0_0_8px_#FF5A36]" />
                  Operational Support
                </h3>
                <p className="text-[11px] text-[#9A9CA8] font-mono mt-0.5">Round-the-clock specialists</p>
              </div>
              <div className="md:col-span-8 flex flex-wrap gap-2">
                {["Philippines", "India", "Latin America"].map((chip) => (
                  <span
                    key={chip}
                    className="font-mono text-xs text-[#9A9CA8] bg-[#111116]/50 border border-[#143B41]/45 px-3.5 py-1.5 rounded-full hover:text-white hover:border-[#00ADD8] hover:bg-[#0B2B30]/20 transition-all cursor-default"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Process Timeline Block */}
          <div className="space-y-12" id="process">
            <div className="max-w-xl space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#FF5A36]">
                <Clock className="w-4 h-4 text-[#FF5A36]" />
                <span>Operational Timeline</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                Simple recruitment, zero surprises.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="bg-[#111116]/45 border border-[#143B41]/30 rounded-xl p-6 relative">
                <div className="flex justify-between items-center mb-5">
                  <span className="font-mono text-xs font-bold text-[#FF5A36] bg-[#FF5A36]/10 px-2.5 py-1 rounded border border-[#FF5A36]/20">
                    WEEK 0
                  </span>
                  <span className="text-xl font-mono text-[#5B5E68] font-bold">01</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">We align</h3>
                <p className="text-xs text-[#9A9CA8] leading-relaxed">
                  A 30-minute kickoff discovery call to clarify absolute stack expectations and performance criteria.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-[#111116]/45 border border-[#143B41]/30 rounded-xl p-6 relative">
                <div className="flex justify-between items-center mb-5">
                  <span className="font-mono text-xs font-bold text-[#FF5A36] bg-[#FF5A36]/10 px-2.5 py-1 rounded border border-[#FF5A36]/20">
                    WEEK 1
                  </span>
                  <span className="text-xl font-mono text-[#5B5E68] font-bold">02</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">Sourcing &amp; Vetting</h3>
                <p className="text-xs text-[#9A9CA8] leading-relaxed">
                  Candidates are gathered, filter-screened, and run through custom-tailored technical and soft-skill code challenges.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-[#111116]/45 border border-[#143B41]/30 rounded-xl p-6 relative">
                <div className="flex justify-between items-center mb-5">
                  <span className="font-mono text-xs font-bold text-[#FF5A36] bg-[#FF5A36]/10 px-2.5 py-1 rounded border border-[#FF5A36]/20">
                    WEEK 2
                  </span>
                  <span className="text-xl font-mono text-[#5B5E68] font-bold">03</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">Interview Shortlist</h3>
                <p className="text-xs text-[#9A9CA8] leading-relaxed">
                  You meet only the final, highly pre-qualified candidates — avoiding any massive, unvetted resume reviews.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-[#111116]/45 border border-[#143B41]/30 rounded-xl p-6 relative">
                <div className="flex justify-between items-center mb-5">
                  <span className="font-mono text-xs font-bold text-[#FF5A36] bg-[#FF5A36]/10 px-2.5 py-1 rounded border border-[#FF5A36]/20">
                    HIRE
                  </span>
                  <span className="text-xl font-mono text-[#5B5E68] font-bold">04</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">Onboarding</h3>
                <p className="text-xs text-[#9A9CA8] leading-relaxed">
                  International tax structures, employment compliance, and secure local payroll set up instantly with full guarantee backing.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* CURVED DIVIDER: Transition from dark `#03090A` to light `#EEF7F6` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#EEF7F6] fill-current">
            <path d="M0,32 C300,120 900,-50 1200,32 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>


      {/* SECTION 6: COMPARISON MATRIX & REAL RESULTS (Light Mint Gray Theme) */}
      <section className="relative bg-[#EEF7F6] text-slate-800 py-24 overflow-hidden" id="why">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="max-w-xl mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#FF5A36] bg-[#FF5A36]/10 px-3 py-1 rounded-full">
              <Award className="w-4 h-4" />
              <span>How We Stand Out</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black leading-tight text-slate-900">
              The Cosmonet benchmark.
            </h2>
          </div>

          {/* Table Container (Light Style Matrix) */}
          <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-lg mb-20">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-slate-50">
                    <th className="p-4 md:p-6 text-slate-500 font-mono text-[10px] uppercase tracking-widest font-extrabold">Metrics</th>
                    <th className="p-4 md:p-6 text-slate-500 font-mono text-[10px] uppercase tracking-widest font-extrabold">Typical staffing agency</th>
                    <th className="p-4 md:p-6 text-[#FF5A36] font-mono text-[10px] uppercase tracking-widest bg-[#FF5A36]/5 font-extrabold">
                      Cosmonet Difference
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-4 md:p-6 font-bold text-slate-900 whitespace-nowrap">Technical Vetting</td>
                    <td className="p-4 md:p-6 text-slate-500">Unfiltered resumes forwarded straight to inbox</td>
                    <td className="p-4 md:p-6 text-slate-900 font-bold bg-[#FF5A36]/5">
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#FF5A36] shrink-0" />
                        Code testing &amp; sandbox evaluations
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-6 font-bold text-slate-900 whitespace-nowrap">Global Compliance</td>
                    <td className="p-4 md:p-6 text-slate-500">Left for you to research, draft, and file</td>
                    <td className="p-4 md:p-6 text-slate-900 font-bold bg-[#FF5A36]/5">
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#FF5A36] shrink-0" />
                        EOR legal compliance completely managed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-6 font-bold text-slate-900 whitespace-nowrap">Time-to-Shortlist</td>
                    <td className="p-4 md:p-6 text-slate-500">4 to 6 weeks of slow resume filtering cycles</td>
                    <td className="p-4 md:p-6 text-slate-900 font-bold bg-[#FF5A36]/5">
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#FF5A36] shrink-0" />
                        Elite shortlist delivered within 9 days
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-6 font-bold text-slate-900 whitespace-nowrap">Risk Protection</td>
                    <td className="p-4 md:p-6 text-slate-500">Losing hiring fee completely if they leave</td>
                    <td className="p-4 md:p-6 text-slate-900 font-bold bg-[#FF5A36]/5">
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#FF5A36] shrink-0" />
                        Full-period replacement guarantee
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Real Results Stats Cards */}
          <div className="space-y-12">
            <div className="max-w-xl space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#FF5A36] bg-[#FF5A36]/10 px-3 py-1 rounded-full">
                <ShieldCheck className="w-4 h-4" />
                <span>Proof &amp; Impact</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                Our recruiting metrics don't lie.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Stat 1 */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md p-6 flex flex-col justify-between">
                <div>
                  <div className="text-4xl font-display font-black text-slate-900 mb-1">
                    9 days
                  </div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">
                    Average Sourcing Speed
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    From our kickoff call to delivering high-fidelity vetted candidates directly to your portal.
                  </p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md p-6 flex flex-col justify-between">
                <div>
                  <div className="text-4xl font-display font-black text-slate-900 mb-1">
                    $15K+
                  </div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">
                    Saved Per Role
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    By accessing highly-vetted offshore resources versus paying competitive local tech agency fees.
                  </p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md p-6 flex flex-col justify-between">
                <div>
                  <div className="text-4xl font-display font-black text-slate-900 mb-1">
                    94%
                  </div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">
                    Retention Past Year One
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Our strict technical and culture vetting translates directly to long-term reliability and stability.
                  </p>
                </div>
              </div>

            </div>

            {/* Testimonial callout */}
            <div className="bg-white border border-dashed border-gray-300 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Do you have questions about previous client stories?</h3>
                <p className="text-xs text-slate-500">
                  We maintain transparent references and metrics of tech and marketing roles filled for global SaaS platforms.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#C23B0E] bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 px-3 py-1 rounded-md font-bold shrink-0">
                🔶 CLIENT CASE STUDIES COMPLIANT WITH NDAS
              </span>
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


      {/* SECTION 7: FAQ & FINAL CTA (Dark Theme) */}
      <section className="relative bg-[#03090A] pt-24 pb-32 overflow-hidden" id="faq">
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          
          <div className="text-center mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#00ADD8]">
              <HelpCircle className="w-4 h-4 text-[#00ADD8]" />
              <span>General FAQs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white leading-tight">
              Got questions? We've got answers.
            </h2>
          </div>

          <div className="space-y-3 mb-24">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#111116]/45 border border-[#143B41]/30 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-start gap-4 hover:bg-[#111116]/80 transition-colors cursor-pointer"
                  >
                    <span className="font-mono text-[#FF5A36] text-sm font-bold mt-0.5 shrink-0">Q.</span>
                    <span className="text-sm font-bold text-white flex-grow pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#9A9CA8] shrink-0 transition-transform duration-300 mt-1 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs text-[#9A9CA8] leading-relaxed border-t border-[#143B41]/10 pl-[38px]">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Final CTA block */}
          <div className="text-center space-y-6 max-w-xl mx-auto pt-12 border-t border-[#143B41]/20">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white leading-tight">
              Let's secure your next hire.
            </h2>
            <p className="text-[#9A9CA8] text-sm leading-relaxed">
              Book a 30-minute discovery call with our team. Clear answers, strategic roadmap, zero pressure.
            </p>
            <div className="pt-4 flex justify-center">
              <button
                id="cta-hr-book-btn"
                onClick={onRequestCallback}
                className="px-10 py-5 bg-gradient-to-r from-[#FF5A36] to-[#C23B0E] hover:scale-[1.03] active:scale-[0.97] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-[0_8px_30px_rgba(255,90,54,0.3)] hover:shadow-[0_16px_40px_rgba(255,90,54,0.45)] transition-all cursor-pointer"
              >
                Book consultation call
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
