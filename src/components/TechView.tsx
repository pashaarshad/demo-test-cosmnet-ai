/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Check, 
  Terminal as TerminalIcon, 
  Cpu, 
  ShieldCheck, 
  Clock, 
  Code, 
  Layers, 
  Users, 
  Sparkles, 
  HelpCircle, 
  MessageSquare,
  Network,
  Zap,
  Lock,
  HeartHandshake,
  Database,
  Cloud,
  TrendingUp,
  Award
} from "lucide-react";

interface TechViewProps {
  onRequestCallback: (prefilledSubject?: string) => void;
}

export default function TechView({ onRequestCallback }: TechViewProps) {
  const [activeTab, setActiveTab] = useState<"mvp" | "enterprise" | "internal">("mvp");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Cool Interactive Terminal States
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [cpuUsage, setCpuUsage] = useState(42);
  const [activeNodes, setActiveNodes] = useState(5);

  // Simulated live CPU/Node fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => {
        const diff = Math.floor(Math.random() * 10) - 5;
        const next = prev + diff;
        return next > 90 || next < 15 ? 45 : next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter Terminal Log Sequence
  useEffect(() => {
    const sequence = [
      { text: "$ sprint_board.event --Week-3", delay: 800, type: "cmd" },
      { text: "→ Ticket: 'User auth flow' moved to Review", delay: 1800, type: "log" },
      { text: "→ Code review passed, 2 approvals", delay: 2800, type: "log" },
      { text: "✓ Deployed to staging — 00:12s (SSL secure)", delay: 3800, type: "success" },
      { text: "$ sprint_board.event --Week-4", delay: 4800, type: "cmd" },
      { text: "→ Ticket: 'Payment integration' started", delay: 5800, type: "log" },
      { text: "✓ Demo shared with client — on schedule", delay: 6800, type: "success" },
      { text: "$ system_health.check()", delay: 7800, type: "cmd" },
      { text: "● ALL SYSTEMS NOMINAL - 99.99% uptime verified", delay: 8800, type: "success" },
      { text: "------------------------------------------", delay: 9400, type: "meta" }
    ];

    let timers: NodeJS.Timeout[] = [];
    
    // Reset and start sequence loop
    const runSequence = () => {
      setTerminalLogs([]);
      sequence.forEach((item, idx) => {
        const timer = setTimeout(() => {
          setTerminalLogs(prev => [...prev, item.text]);
        }, item.delay);
        timers.push(timer);
      });

      // Restart sequence every 14 seconds
      const resetTimer = setTimeout(() => {
        runSequence();
      }, 14000);
      timers.push(resetTimer);
    };

    runSequence();

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, []);

  const timelineData = {
    mvp: {
      tag: "MVP BUILD",
      title: "From idea to a live, testable product",
      badge: "Launched in 8 weeks",
      steps: [
        { week: "Week 1", text: "Requirements agreed with you", desc: "Detailed scoping, functional mapping, and high-fidelity wireframes finalized." },
        { week: "Week 5", text: "Core product built", desc: "Major database architectures, authentication systems, and critical user flows established." },
        { week: "Week 7", text: "Tested end-to-end", desc: "Rigorous QA testing, continuous integration checks, and security audits completed." },
        { week: "Week 8", text: "Live for real users", desc: "Production launch on scalable cloud architectures with complete deployment tracking." }
      ]
    },
    enterprise: {
      tag: "ENTERPRISE PLATFORM",
      title: "Larger systems, shipped without disruption",
      badge: "12-week rollout, zero downtime",
      steps: [
        { week: "Week 1", text: "Requirements agreed with you", desc: "System architecture, database schema design, and load-capacity models agreed." },
        { week: "Week 8", text: "Core platform built", desc: "All back-end services, API schemas, and scalable frontend panels integrated." },
        { week: "Week 11", text: "Tested under real load", desc: "Automated load tests and penetration tests conducted to ensure high availability." },
        { week: "Week 12", text: "Live, with zero downtime", desc: "Phased blue-green deployment strategies executed with live fallback backups." }
      ]
    },
    internal: {
      tag: "INTERNAL TOOL",
      title: "The tool your team actually needed",
      badge: "Live in 4 weeks",
      steps: [
        { week: "Week 1", text: "Requirements agreed with you", desc: "Operational workflow assessment and specialized database triggers customized." },
        { week: "Week 3", text: "Tool built", desc: "Admin dashboards, custom visual filters, and real-time report download engines integrated." },
        { week: "Week 3", text: "Tested with your team", desc: "Interactive feedback loops and interface tuning based on user training sessions." },
        { week: "Week 4", text: "Live for your team", desc: "Smooth enterprise integration with existing LDAP/SSO logins fully operational." }
      ]
    }
  };

  const faqData = [
    {
      q: "Who owns the code?",
      a: "You do. 100% of every repository, document, and asset belongs to you the moment the final payment clears. No exemptions, no hidden licensing fees."
    },
    {
      q: "What if my requirements change?",
      a: "We understand that tech projects evolve. We will quote any substantial changes separately as an add-on sprint, ensuring your original timeline and deliverables stay completely untouched."
    },
    {
      q: "What happens after launch?",
      a: "You get the full source code, architecture documentation, configuration files, and credentials. We also provide a guaranteed support period with dedicated developer hours included."
    },
    {
      q: "Why not just hire freelancers?",
      a: "With Cosmetic AI, you get a fully synchronized team of senior product engineers, designers, and project leads under a single clear contract, instead of wasting weeks managing independent freelancers."
    }
  ];

  return (
    <div className="relative text-gray-200 overflow-hidden bg-[#03090A] min-h-screen">
      {/* Background Aesthetic Glow Elements */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-[#00ADD8]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#E71C84]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[800px] -right-40 w-96 h-96 bg-[#00ADD8]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-36 lg:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#E71C84]/10 border border-[#E71C84]/30 text-[#E71C84] text-xs font-mono font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#E71C84] animate-ping" />
                Custom Software Development
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-tight">
                Custom software, built by a team you can <span className="text-[#00ADD8] bg-gradient-to-r from-[#00ADD8] to-[#E71C84] bg-clip-text text-transparent">trust</span>.
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                We build your product. You get a clear timeline, full code ownership, and an expert technical team that stays dedicated even after launch.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <button
                  onClick={() => onRequestCallback("Technology Custom Software Consultation")}
                  className="px-8 py-4 bg-[#E71C84] hover:bg-[#f62693] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(231,28,132,0.3)] hover:shadow-[0_0_25px_rgba(231,28,132,0.5)] flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Book consultation call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Trust Strip Bullet Blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#143B41]/40">
                <div className="space-y-1 text-left">
                  <div className="text-white font-mono text-xs font-extrabold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E71C84]" />
                    NDA-first
                  </div>
                  <p className="text-[11px] text-gray-500">Strict IP Protection</p>
                </div>
                <div className="space-y-1 text-left">
                  <div className="text-white font-mono text-xs font-extrabold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ADD8]" />
                    Fixed Timeline
                  </div>
                  <p className="text-[11px] text-gray-500">Agreed In Writing</p>
                </div>
                <div className="space-y-1 text-left">
                  <div className="text-white font-mono text-xs font-extrabold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E71C84]" />
                    100% Ownership
                  </div>
                  <p className="text-[11px] text-gray-500">No Hidden Licensing</p>
                </div>
                <div className="space-y-1 text-left">
                  <div className="text-white font-mono text-xs font-extrabold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ADD8]" />
                    Transparent
                  </div>
                  <p className="text-[11px] text-gray-500">Fixed Cost Structure</p>
                </div>
              </div>
            </div>

            {/* Hero Right - Enhanced interactive simulator Terminal */}
            <div className="lg:col-span-5">
              <div className="relative group">
                {/* Glow behind terminal */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#E71C84] to-[#00ADD8] rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
                
                <div className="relative bg-[#041113]/90 border border-[#143B41]/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#071F22] border-b border-[#143B41]/60">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#00ADD8] font-bold">
                      <TerminalIcon className="w-3.5 h-3.5" />
                      <span>live_sprint_board.log</span>
                    </div>
                    <div className="w-12 h-1 bg-[#143B41]/50 rounded" />
                  </div>

                  {/* Terminal Stats Widget Row */}
                  <div className="grid grid-cols-3 gap-2 px-4 py-2.5 bg-[#03191C]/50 border-b border-[#143B41]/40 text-[10px] font-mono">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Cpu className="w-3.5 h-3.5 text-[#E71C84]" />
                      <span>CPU: <b className="text-white">{cpuUsage}%</b></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Network className="w-3.5 h-3.5 text-[#00ADD8]" />
                      <span>Nodes: <b className="text-white">{activeNodes}</b></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#5FD98A] justify-end">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5FD98A] animate-pulse" />
                      <span>HEALTHY</span>
                    </div>
                  </div>

                  {/* Terminal Log Console */}
                  <div className="p-5 font-mono text-xs min-h-[320px] h-auto space-y-2 text-left bg-black/40">
                    <AnimatePresence>
                      {terminalLogs.map((log, idx) => {
                        let textClass = "text-gray-400";
                        if (log.startsWith("$")) textClass = "text-[#00ADD8] font-bold";
                        else if (log.startsWith("✓")) textClass = "text-[#5FD98A] font-bold";
                        else if (log.startsWith("→")) textClass = "text-gray-300";
                        else if (log.includes("VERIFIED")) textClass = "text-[#E71C84] font-bold";

                        return (
                          <motion.div
                             key={idx}
                             initial={{ opacity: 0, x: -10 }}
                             animate={{ opacity: 1, x: 0 }}
                             className={`${textClass} leading-relaxed`}
                          >
                            {log}
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                    <div className="flex items-center gap-1 text-[#00ADD8]">
                      <span>$</span>
                      <span className="w-2 h-4 bg-[#00ADD8] animate-pulse" />
                    </div>
                  </div>
                </div>
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

      {/* WORK IN ACTION */}
      <section id="process" className="relative py-28 md:py-36 bg-[#EEF7F6] text-slate-800 overflow-hidden" style={{
        backgroundImage: "radial-gradient(#cbe2e0 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px"
      }}>
        {/* Glowing backgrounds */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#00ADD8]/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#E71C84]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ADD8]/10 text-[#00ADD8] rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-4">
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              Sustained Sprints
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 tracking-tight leading-none">
              What actually happens, <span className="bg-gradient-to-r from-[#00ADD8] to-[#E71C84] bg-clip-text text-transparent">week by week</span>.
            </h2>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
              We operate in transparent, hyper-focused weekly cycles. No black box development, no silent periods — just rapid, high-quality, continuous delivery.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-850 text-[10px] font-mono tracking-wide">
              <span>🔶 SAMPLE TIMELINE — DEFINED SPRINT ARCHITECTURE</span>
            </div>
          </div>

          {/* Interactive Flow Tabs with premium visual styling */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {(["mvp", "enterprise", "internal"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 rounded-full font-mono text-xs sm:text-sm font-bold tracking-wider transition-all border cursor-pointer flex items-center gap-2.5 shadow-sm ${
                  activeTab === tab
                    ? "bg-[#E71C84] border-[#E71C84] text-white shadow-[0_4px_20px_rgba(231,28,132,0.4)] scale-105"
                    : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400 hover:shadow-md"
                }`}
              >
                {tab === "mvp" && <Sparkles className="w-4 h-4" />}
                {tab === "enterprise" && <Layers className="w-4 h-4" />}
                {tab === "internal" && <Cpu className="w-4 h-4" />}
                {tab === "mvp" ? "MVP Build (8 Weeks)" : tab === "enterprise" ? "Enterprise Platform (12 Weeks)" : "Internal Tool (4 Weeks)"}
              </button>
            ))}
          </div>

          {/* Active Tab Panel details with Animation */}
          <div className="relative bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-2xl shadow-slate-200/50">
            {/* Corner Decorative Dots */}
            <div className="absolute top-4 left-4 flex gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-200" />
              <span className="w-2 h-2 rounded-full bg-slate-200" />
              <span className="w-2 h-2 rounded-full bg-slate-200" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-10"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-100 pb-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#E71C84] tracking-widest block mb-1 uppercase">
                      {timelineData[activeTab].tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 font-display tracking-tight">
                      {timelineData[activeTab].title}
                    </h3>
                  </div>
                  <span className="px-5 py-2 bg-gradient-to-r from-[#00ADD8]/10 to-[#E71C84]/10 border border-[#00ADD8]/20 rounded-full text-slate-800 text-xs sm:text-sm font-mono font-bold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#00ADD8]" />
                    {timelineData[activeTab].badge}
                  </span>
                </div>

                <div className="relative">
                  {/* Connecting Line */}
                  <div className="absolute top-16 left-8 right-8 h-[2px] bg-gradient-to-r from-[#00ADD8]/30 via-[#E71C84]/30 to-[#00ADD8]/30 hidden lg:block z-0" />

                  {/* Steps list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {timelineData[activeTab].steps.map((step, idx) => {
                      const deliverables = (() => {
                        if (activeTab === "mvp") {
                          return [
                            ["Figma High-Fis", "Technical Spec Arch", "Functional Map"],
                            ["Core DB Architecture", "Auth & Identity Flow", "CRUD API Endpoints"],
                            ["Full End-to-End Suite", "Rigorous QA & Audit", "Secure Client Demo"],
                            ["Scalable Cloud Deploy", "CDN & Asset Optimize", "Code Repo Handover"]
                          ][idx];
                        } else if (activeTab === "enterprise") {
                          return [
                            ["Cloud Architecture Model", "DB Relational Schema", "Enterprise SSO Scope"],
                            ["High-load APIs Built", "API Documentation Live", "Admin Config Panel"],
                            ["10k User Stress Test", "Automated QA Verification", "Security Penetration Review"],
                            ["Blue-Green Deployment", "Zero-Downtime Migration", "DB Hot-Failover Ready"]
                          ][idx];
                        } else {
                          return [
                            ["Employee Workflow Draft", "Legacy API Assessment", "Functional Map Document"],
                            ["Speed Optimized Tables", "Custom Visual Filters", "Admin Data View Screens"],
                            ["Team Beta Sandbox Set", "Staff Feedback Iteration", "System Access Config"],
                            ["Employee SSO Active", "Role-Based Permissions", "Admin Training Handover"]
                          ][idx];
                        }
                      })();

                      const getStepIcon = (index: number) => {
                        switch (index) {
                          case 0: return <Layers className="w-5 h-5 text-[#E71C84]" />;
                          case 1: return <Code className="w-5 h-5 text-[#00ADD8]" />;
                          case 2: return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
                          case 3: return <Zap className="w-5 h-5 text-amber-500" />;
                          default: return <Sparkles className="w-5 h-5 text-purple-500" />;
                        }
                      };

                      return (
                        <div key={idx} className="relative bg-white border border-slate-100 hover:border-[#00ADD8]/50 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden flex flex-col justify-between min-h-[340px]">
                          {/* Step Number Background Watermark */}
                          <div className="absolute right-4 bottom-2 font-display font-black text-7xl text-slate-100 group-hover:text-[#00ADD8]/5 transition-colors duration-300 select-none pointer-events-none">
                            0{idx + 1}
                          </div>

                          <div className="space-y-4 relative z-10">
                            {/* Card top badges */}
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-extrabold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-md border border-cyan-100 flex items-center gap-1.5 shadow-sm">
                                <Clock className="w-3.5 h-3.5" />
                                {step.week}
                              </span>
                              <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-[#E71C84]/10 group-hover:border-[#E71C84]/20 flex items-center justify-center transition-all">
                                {getStepIcon(idx)}
                              </div>
                            </div>

                            {/* Text description */}
                            <div className="space-y-2">
                              <h4 className="text-base font-bold text-slate-900 group-hover:text-[#00ADD8] transition-colors leading-snug">
                                {step.text}
                              </h4>
                              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                                {step.desc}
                              </p>
                            </div>

                            {/* Technical Deliverables List */}
                            <div className="pt-4 border-t border-slate-100 space-y-2">
                              <span className="text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-widest block">
                                SPRINT DELIVERABLES
                              </span>
                              <ul className="space-y-1.5">
                                {deliverables.map((item, dIdx) => (
                                  <li key={dIdx} className="flex items-start gap-1.5 text-xs text-slate-600 font-semibold">
                                    <Check className="w-3.5 h-3.5 text-[#E71C84] mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-6 pt-3 flex items-center justify-between border-t border-slate-100 relative z-10">
                            <span className="text-[10px] font-mono text-[#00ADD8] font-bold tracking-wider flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Active Review
                            </span>
                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#E71C84] group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* CURVED DIVIDER: Transition from light `#EEF7F6` to dark `#03090A` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#03090A] fill-current">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* THE PROBLEM — AND HOW WE FIX IT */}
      <section id="problems" className="relative py-24 md:py-36 bg-[#03090A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#E71C84] mb-2">
              THE PROBLEM — AND HOW WE FIX IT
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white">
              Picking a dev team is risky. Here's how we solve it.
            </h2>
          </div>

          <div className="space-y-6">
            {/* Risk / Fix Pair 01 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Problem */}
              <div className="bg-red-950/10 border-l-4 border-red-500/80 border border-[#143B41]/30 rounded-r-xl p-6 relative overflow-hidden">
                <div className="absolute right-3 top-3 text-[10px] font-mono text-red-500/30 font-bold">RISK / 01</div>
                <div className="text-[#E71C84] font-mono text-xs font-bold mb-2">PROBLEM</div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">Timelines slip</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  A 3-month project turns into 8 months with vague status reports, zero transparency, and no explanations.
                </p>
              </div>
              {/* Fix */}
              <div className="bg-[#0B2B30]/20 border-l-4 border-[#00ADD8] border border-[#143B41]/30 rounded-r-xl p-6 relative overflow-hidden">
                <div className="absolute right-3 top-3 text-[10px] font-mono text-[#00ADD8]/30 font-bold">FIX / 01</div>
                <div className="text-[#00ADD8] font-mono text-xs font-bold mb-2">SOLUTION</div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">Fixed timeline, in writing</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  You get a legally binding price and detailed weekly sprint delivery calendar before we start coding. No sudden updates.
                </p>
              </div>
            </div>

            {/* Risk / Fix Pair 02 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Problem */}
              <div className="bg-red-950/10 border-l-4 border-red-500/80 border border-[#143B41]/30 rounded-r-xl p-6 relative overflow-hidden">
                <div className="absolute right-3 top-3 text-[10px] font-mono text-red-500/30 font-bold">RISK / 02</div>
                <div className="text-[#E71C84] font-mono text-xs font-bold mb-2">PROBLEM</div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">You don't own the code</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Confusing contract structures mean you can't migrate repositories or switch developers without paying massive release fines.
                </p>
              </div>
              {/* Fix */}
              <div className="bg-[#0B2B30]/20 border-l-4 border-[#00ADD8] border border-[#143B41]/30 rounded-r-xl p-6 relative overflow-hidden">
                <div className="absolute right-3 top-3 text-[10px] font-mono text-[#00ADD8]/30 font-bold">FIX / 02</div>
                <div className="text-[#00ADD8] font-mono text-xs font-bold mb-2">SOLUTION</div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">You own 100% of the code</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Every functional directory and database migration script belongs to your entity the second payments clear. No loops, no strings.
                </p>
              </div>
            </div>

            {/* Risk / Fix Pair 03 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Problem */}
              <div className="bg-red-950/10 border-l-4 border-red-500/80 border border-[#143B41]/30 rounded-r-xl p-6 relative overflow-hidden">
                <div className="absolute right-3 top-3 text-[10px] font-mono text-red-500/30 font-bold">RISK / 03</div>
                <div className="text-[#E71C84] font-mono text-xs font-bold mb-2">PROBLEM</div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">Support disappears</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  The software launches, the core invoice gets paid, and the engineering company stops answering critical bugs or system reports.
                </p>
              </div>
              {/* Fix */}
              <div className="bg-[#0B2B30]/20 border-l-4 border-[#00ADD8] border border-[#143B41]/30 rounded-r-xl p-6 relative overflow-hidden">
                <div className="absolute right-3 top-3 text-[10px] font-mono text-[#00ADD8]/30 font-bold">FIX / 03</div>
                <div className="text-[#00ADD8] font-mono text-xs font-bold mb-2">SOLUTION</div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">Support after launch</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  We stay actively staffed on your cloud monitoring systems for a predefined cooldown period to guarantee bug-free operational stability.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* CURVED DIVIDER: Transition from dark `#03090A` to light `#FFFFFF` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-white fill-current">
            <path d="M0,32 C300,120 900,-50 1200,32 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section id="services" className="relative py-24 md:py-36 bg-white text-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#E71C84] mb-2">
              OUR SERVICES
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-slate-900">
              What we do.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="bg-slate-50 border border-slate-100 hover:border-[#00ADD8] hover:bg-white rounded-2xl p-6 space-y-4 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#E71C84]/10 border border-[#E71C84]/30 text-[#E71C84] flex items-center justify-center font-mono font-black text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Custom Software Development</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                End-to-end product builds, designed and engineered around your exact corporate requirements.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-slate-50 border border-slate-100 hover:border-[#00ADD8] hover:bg-white rounded-2xl p-6 space-y-4 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#00ADD8]/10 border border-[#00ADD8]/30 text-[#00ADD8] flex items-center justify-center font-mono font-black text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">MVP Development</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get a working, testable product in front of real users fast — built to scale, not thrown away.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-slate-50 border border-slate-100 hover:border-[#00ADD8] hover:bg-white rounded-2xl p-6 space-y-4 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#E71C84]/10 border border-[#E71C84]/30 text-[#E71C84] flex items-center justify-center font-mono font-black text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Platform &amp; Enterprise Engineering</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Larger systems, administrative panels, and secure databases engineered for teams scaling fast.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-slate-50 border border-slate-100 hover:border-[#00ADD8] hover:bg-white rounded-2xl p-6 space-y-4 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#00ADD8]/10 border border-[#00ADD8]/30 text-[#00ADD8] flex items-center justify-center font-mono font-black text-sm">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">Post-Launch Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bug tracking, server optimization, and a dedicated technician available whenever you dial.
              </p>
            </div>
          </div>

        </div>

        {/* CURVED DIVIDER: Transition from light `#FFFFFF` to dark `#03090A` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#03090A] fill-current">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* OUR STACK */}
      <section id="techstack" className="py-20 border-t border-[#143B41]/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#E71C84] mb-2">
              OUR STACK
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white">
              The tools we build with.
            </h2>
            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded text-yellow-500 text-[10px] font-mono tracking-wide">
              <span>🔶 CONFIRM ACTUAL STACK WITH CLIENT</span>
            </div>
          </div>

          <div className="bg-[#041113]/40 border border-[#143B41]/50 rounded-2xl divide-y divide-[#143B41]/40">
            {/* Layer 1: Frontend */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-3">
                <span className="text-xs font-mono font-bold text-[#00ADD8] block mb-0.5">Frontend</span>
                <span className="text-[11px] text-gray-500 font-medium">User interfaces</span>
              </div>
              <div className="md:col-span-9 flex flex-wrap gap-2.5">
                {["React", "Next.js", "TypeScript", "Tailwind CSS"].map((tech) => (
                  <span key={tech} className="px-3.5 py-1.5 bg-[#0B2B30]/35 border border-[#143B41]/60 hover:border-[#00ADD8]/60 text-gray-300 font-mono text-xs rounded-full transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Layer 2: Backend */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-3">
                <span className="text-xs font-mono font-bold text-[#E71C84] block mb-0.5">Backend</span>
                <span className="text-[11px] text-gray-500 font-medium">Systems &amp; logic</span>
              </div>
              <div className="md:col-span-9 flex flex-wrap gap-2.5">
                {["Node.js", "Python", "Go", "PostgreSQL"].map((tech) => (
                  <span key={tech} className="px-3.5 py-1.5 bg-[#0B2B30]/35 border border-[#143B41]/60 hover:border-[#00ADD8]/60 text-gray-300 font-mono text-xs rounded-full transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Layer 3: Infrastructure */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-3">
                <span className="text-xs font-mono font-bold text-[#00ADD8] block mb-0.5">Infrastructure</span>
                <span className="text-[11px] text-gray-500 font-medium">Cloud &amp; scale</span>
              </div>
              <div className="md:col-span-9 flex flex-wrap gap-2.5">
                {["AWS", "Docker", "Kubernetes", "CI / CD"].map((tech) => (
                  <span key={tech} className="px-3.5 py-1.5 bg-[#0B2B30]/35 border border-[#143B41]/60 hover:border-[#00ADD8]/60 text-gray-300 font-mono text-xs rounded-full transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Layer 4: AI / ML */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-3">
                <span className="text-xs font-mono font-bold text-[#E71C84] block mb-0.5">AI / ML</span>
                <span className="text-[11px] text-gray-500 font-medium">Intelligent agents</span>
              </div>
              <div className="md:col-span-9 flex flex-wrap gap-2.5">
                {["OpenAI", "LangChain", "PyTorch", "Vector DBs"].map((tech) => (
                  <span key={tech} className="px-3.5 py-1.5 bg-[#0B2B30]/35 border border-[#143B41]/60 hover:border-[#00ADD8]/60 text-gray-300 font-mono text-xs rounded-full transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* HOW WE WORK */}
      <section id="how-we-work" className="relative py-24 md:py-36 bg-[#03090A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#00ADD8] mb-2">
              HOW WE WORK
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white">
              Simple process, no surprises.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-[#071F22]/30 border border-[#143B41]/50 p-6 rounded-2xl relative space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold text-[#00ADD8] tracking-widest bg-[#00ADD8]/10 border border-[#00ADD8]/30 px-2 py-0.5 rounded">
                  WEEK 0
                </span>
                <span className="text-gray-500 font-mono font-bold text-xs">01</span>
              </div>
              <h3 className="text-base font-bold text-white">We talk</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                A structured 30-minute introductory call to completely map out what parameters and structures you require.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#071F22]/30 border border-[#143B41]/50 p-6 rounded-2xl relative space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold text-[#E71C84] tracking-widest bg-[#E71C84]/10 border border-[#E71C84]/30 px-2 py-0.5 rounded">
                  WEEK 1
                </span>
                <span className="text-gray-500 font-mono font-bold text-xs">02</span>
              </div>
              <h3 className="text-base font-bold text-white">We plan</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                You receive a detailed technical proposal with clear pricing, calendar deliverables, and ownership terms in writing.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#071F22]/30 border border-[#143B41]/50 p-6 rounded-2xl relative space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold text-[#00ADD8] tracking-widest bg-[#00ADD8]/10 border border-[#00ADD8]/30 px-2 py-0.5 rounded">
                  BUILD PHASE
                </span>
                <span className="text-gray-500 font-mono font-bold text-xs">03</span>
              </div>
              <h3 className="text-base font-bold text-white">We build</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                You get actual screen progress updates and access to interactive staging environments on a regular weekly basis.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#071F22]/30 border border-[#143B41]/50 p-6 rounded-2xl relative space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold text-[#E71C84] tracking-widest bg-[#E71C84]/10 border border-[#E71C84]/30 px-2 py-0.5 rounded">
                  LAUNCH
                </span>
                <span className="text-gray-500 font-mono font-bold text-xs">04</span>
              </div>
              <h3 className="text-base font-bold text-white">We hand over</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                You receive all active server keys, repository control, configuration instructions, and full database ownership. Everything.
              </p>
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

      {/* WHY COSMETIC AI (Comparison Table) */}
      <section id="why-us" className="relative py-24 md:py-32 bg-[#EEF7F6] text-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#E71C84] mb-2">
              WHY COSMETIC AI
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-slate-900">
              How we're different.
            </h2>
          </div>

          <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl shadow-md">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="p-5 font-mono text-xs text-slate-500 uppercase tracking-wider">Features</th>
                  <th className="p-5 font-mono text-xs text-slate-500 uppercase tracking-wider">Typical Dev Shop</th>
                  <th className="p-5 font-mono text-xs text-[#00ADD8] uppercase tracking-wider bg-[#00ADD8]/5">Cosmetic AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-sm">
                <tr>
                  <td className="p-5 text-slate-850">Price &amp; Timeline</td>
                  <td className="p-5 text-slate-500">Fluctuates frequently mid-sprint</td>
                  <td className="p-5 text-[#00ADD8] bg-[#00ADD8]/5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00ADD8] flex-shrink-0" />
                    Fixed, in writing
                  </td>
                </tr>
                <tr>
                  <td className="p-5 text-slate-850">Code Ownership</td>
                  <td className="p-5 text-slate-500">Unclear terms with licensing locks</td>
                  <td className="p-5 text-[#00ADD8] bg-[#00ADD8]/5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00ADD8] flex-shrink-0" />
                    100% legally yours
                  </td>
                </tr>
                <tr>
                  <td className="p-5 text-slate-850">SLA Updates</td>
                  <td className="p-5 text-slate-500">Monthly or semi-monthly syncs</td>
                  <td className="p-5 text-[#00ADD8] bg-[#00ADD8]/5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00ADD8] flex-shrink-0" />
                    Interactive checks every week
                  </td>
                </tr>
                <tr>
                  <td className="p-5 text-slate-850">Cooldown Support</td>
                  <td className="p-5 text-slate-500">No guaranteed debugging period</td>
                  <td className="p-5 text-[#00ADD8] bg-[#00ADD8]/5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00ADD8] flex-shrink-0" />
                    Dedicated period included
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* PROOF Section */}
      <section id="proof" className="relative py-24 md:py-32 bg-[#EEF7F6] text-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#00ADD8] mb-2">
              PROOF
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-slate-900">
              Real results.
            </h2>
            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-700 text-[10px] font-mono tracking-wide">
              <span>🔶 SAMPLE LAYOUT — MEASURED PERFORMANCE INDICATORS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Stat 1 */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-md">
              <div className="text-3xl sm:text-4xl font-display font-extrabold bg-gradient-to-r from-[#00ADD8] to-[#E71C84] bg-clip-text text-transparent">
                40%
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#00ADD8]">
                Faster Time-to-Launch
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                — Lead Software Architect, FinTech Suite
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-md">
              <div className="text-3xl sm:text-4xl font-display font-extrabold bg-gradient-to-r from-[#E71C84] to-[#00ADD8] bg-clip-text text-transparent">
                ₹12L
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#E71C84]">
                Saved in Dev Costs
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                — Founder, MedTech Portal
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-md">
              <div className="text-3xl sm:text-4xl font-display font-extrabold bg-gradient-to-r from-[#00ADD8] to-[#E71C84] bg-clip-text text-transparent">
                3x
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#00ADD8]">
                Faster Feature Delivery
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                — VP of Engineering, Logistics SaaS
              </div>
            </div>
          </div>

          {/* Core Client Story Card */}
          <div className="mt-8 bg-white border border-dashed border-[#00ADD8]/40 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-sm">
            <div className="space-y-3 max-w-xl text-left">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#E71C84]" />
                Add a client story here
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                "By partnering with Cosmetic AI, we took our complex custom application code to a fully operational MVP stage in exactly 8 weeks. Their support team remained actively staffed throughout deployment and we owned 100% of our code repositories from week one."
              </p>
            </div>
            <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-700 text-[9px] font-mono whitespace-nowrap self-start sm:self-center">
              🔶 NEEDS REAL CLIENT DATA
            </span>
          </div>

        </div>

        {/* CURVED DIVIDER: Transition from light `#EEF7F6` to dark `#03090A` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#03090A] fill-current">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* FAQS Section */}
      <section id="faqs" className="py-20 border-t border-[#143B41]/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          
          <div className="text-center mb-16">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#E71C84] mb-2">
              FAQS
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
              Quick answers.
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#071F22]/20 border border-[#143B41]/40 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 text-white hover:text-[#00ADD8] transition-colors focus:outline-none cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-base flex gap-3">
                      <span className="text-[#E71C84] font-mono">Q.</span>
                      {faq.q}
                    </span>
                    <span className={`text-xl transition-transform duration-250 ${isOpen ? "rotate-45 text-[#E71C84]" : "text-[#00ADD8]"}`}>
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 pt-0 border-t border-[#143B41]/20 text-xs sm:text-sm text-gray-400 leading-relaxed pl-[42px]">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FINAL CTA Section */}
      <section className="py-24 border-t border-[#143B41]/30 relative overflow-hidden bg-gradient-to-b from-[#03090A] to-[#041215]">
        <div className="absolute inset-0 bg-[#E71C84]/5 blur-[120px] rounded-full -bottom-40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight leading-tight">
            Let's talk about your project.
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto font-medium">
            30 minutes. No pressure, no pushy sales pitch. We'll map out your technical stack and timeline strategy.
          </p>
          <div className="pt-4">
            <button
              onClick={() => onRequestCallback("Custom Software consultation call")}
              className="px-10 py-4.5 bg-[#E71C84] hover:bg-[#f62693] text-white rounded-full font-bold text-sm tracking-wider transition-all shadow-[0_0_25px_rgba(231,28,132,0.4)] hover:shadow-[0_0_35px_rgba(231,28,132,0.6)] cursor-pointer"
            >
              Book consultation call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
