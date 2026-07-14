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
  Database, 
  MessageSquare, 
  Zap, 
  Network, 
  TrendingUp, 
  HelpCircle,
  AlertTriangle,
  Layers,
  Inbox,
  Sparkles,
  RefreshCw,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronRight
} from "lucide-react";

interface AiViewProps {
  onRequestCallback: (subject?: string) => void;
}

export default function AiView({ onRequestCallback }: AiViewProps) {
  // Tabs for "Work In Action"
  const [activeWorkflow, setActiveWorkflow] = useState<"crm" | "llm" | "support" | "cost">("crm");
  // FAQ state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Typewriter state for log simulator
  const [displayedLogs, setDisplayedLogs] = useState<Array<{ prefix: string; text: string; colorClass: string }>>([]);
  const [currentTypingText, setCurrentTypingText] = useState("");
  const [currentPrefix, setCurrentPrefix] = useState("");
  const [currentColorClass, setCurrentColorClass] = useState("");

  useEffect(() => {
    const sequence = [
      { prefix: "$", text: "incoming_lead.event", colorClass: "text-[#FF5A36] font-semibold" },
      { prefix: "→", text: "New lead: priya@growthco.in", colorClass: "text-gray-300" },
      { prefix: "→", text: "Analyzing intent...", colorClass: "text-gray-400" },
      { prefix: "→", text: "Drafting personalized reply...", colorClass: "text-gray-400" },
      { prefix: "✓", text: "Response sent in 00:04s", colorClass: "text-[#00ADD8] font-medium" },
      { prefix: "$", text: "support_ticket.event", colorClass: "text-[#FF5A36] font-semibold" },
      { prefix: "→", text: "Question matched to knowledge base", colorClass: "text-gray-300" },
      { prefix: "✓", text: "Resolved automatically — no agent needed", colorClass: "text-[#00ADD8] font-medium" },
    ];

    let isMounted = true;
    let sequenceIndex = 0;

    const startTypewriter = async () => {
      if (!isMounted) return;
      setDisplayedLogs([]);
      setCurrentTypingText("");
      sequenceIndex = 0;

      const typeNextLine = () => {
        if (!isMounted) return;
        if (sequenceIndex >= sequence.length) {
          // Pause at completion, then loop
          setTimeout(() => {
            if (isMounted) {
              startTypewriter();
            }
          }, 3500);
          return;
        }

        const line = sequence[sequenceIndex];
        setCurrentPrefix(line.prefix);
        setCurrentColorClass(line.colorClass);
        setCurrentTypingText("");

        let charIndex = 0;
        const textToType = line.text;

        const interval = setInterval(() => {
          if (!isMounted) {
            clearInterval(interval);
            return;
          }
          charIndex++;
          setCurrentTypingText(textToType.slice(0, charIndex));

          if (charIndex >= textToType.length) {
            clearInterval(interval);
            // Store complete line
            setDisplayedLogs(prev => [...prev, {
              prefix: line.prefix,
              text: line.text,
              colorClass: line.colorClass
            }]);
            setCurrentTypingText("");
            sequenceIndex++;
            // Short delay before beginning next line typing
            setTimeout(typeNextLine, 600);
          }
        }, 25);
      };

      typeNextLine();
    };

    startTypewriter();

    return () => {
      isMounted = false;
    };
  }, []);

  // Work In Action Workflows config
  const workflows = {
    crm: {
      tag: "CRM INTEGRATION",
      title: "Lead qualification, built into the CRM",
      stat: "80% faster lead response",
      steps: [
        { num: "01", label: "Lead comes in", desc: "Instantly captured from email or form", icon: <Inbox className="w-5 h-5 text-[#FF5A36]" /> },
        { num: "02", label: "AI scores & qualifies", desc: "Analyzes intent, budget & fit", icon: <Cpu className="w-5 h-5 text-[#00ADD8]" /> },
        { num: "03", label: "CRM auto-updated", desc: "Enriches fields instantly", icon: <Database className="w-5 h-5 text-[#FF5A36]" /> },
        { num: "04", label: "Sales rep notified", desc: "Ready with high-context draft", icon: <Zap className="w-5 h-5 text-[#00ADD8]" /> },
      ]
    },
    llm: {
      tag: "LLM DEVELOPMENT",
      title: "Document data, extracted automatically",
      stat: "Zero manual data entry",
      steps: [
        { num: "01", label: "Document uploaded", desc: "PDFs, invoices, or paper forms", icon: <Layers className="w-5 h-5 text-[#FF5A36]" /> },
        { num: "02", label: "LLM extracts data", desc: "Handles complex non-standard layouts", icon: <Cpu className="w-5 h-5 text-[#00ADD8]" /> },
        { num: "03", label: "Validated against rules", desc: "Checks totals, lines and taxonomy", icon: <ShieldCheck className="w-5 h-5 text-[#FF5A36]" /> },
        { num: "04", label: "Synced to database", desc: "Feeds directly to ERP / database", icon: <Database className="w-5 h-5 text-[#00ADD8]" /> },
      ]
    },
    support: {
      tag: "AI SUPPORT AGENT",
      title: "Customer questions, resolved instantly",
      stat: "24/7 automated coverage",
      steps: [
        { num: "01", label: "Customer message", desc: "Enters via web chat, Slack or email", icon: <MessageSquare className="w-5 h-5 text-[#FF5A36]" /> },
        { num: "02", label: "AI understands intent", desc: "Understands queries in 100+ languages", icon: <Cpu className="w-5 h-5 text-[#00ADD8]" /> },
        { num: "03", label: "Resolves or escalates", desc: "Quotes knowledge base or alerts rep", icon: <Zap className="w-5 h-5 text-[#FF5A36]" /> },
        { num: "04", label: "Ticket logged", desc: "Saves transcript & resolution summary", icon: <CheckCircle2 className="w-5 h-5 text-[#00ADD8]" /> },
      ]
    },
    cost: {
      tag: "COST-EFFICIENT AI",
      title: "Same output, fewer tokens spent",
      stat: "40% lower AI running cost",
      steps: [
        { num: "01", label: "Request comes in", desc: "High-volume user inquiry stream", icon: <Network className="w-5 h-5 text-[#FF5A36]" /> },
        { num: "02", label: "Trims prompt elements", desc: "Removes boilerplate & extracts core", icon: <RefreshCw className="w-5 h-5 text-[#00ADD8]" /> },
        { num: "03", label: "Routes to micro-LLM", desc: "Picks smallest capable local model", icon: <Cpu className="w-5 h-5 text-[#FF5A36]" /> },
        { num: "04", label: "Same outcome, lower cost", desc: "Slashes API usage billing by 40%+", icon: <TrendingUp className="w-5 h-5 text-[#00ADD8]" /> },
      ]
    }
  };

  const faqData = [
    {
      q: "Is this just a chatbot?",
      a: "No. We automate a specific business workflow — like lead follow-up, invoice processing, or CRM synchronization — not just a generic chat widget on a website."
    },
    {
      q: "What if our process changes later?",
      a: "Our modular approach allows us to update the specific AI rules or models without rewriting the workflow logic. We quote updates separately, ensuring what is already live continues running smoothly."
    },
    {
      q: "Where does our data go?",
      a: "You will get a clear, written answer before we start. We implement private LLM sandboxes or enterprise API calls with strict zero-data-retention, ensuring compliance with your enterprise privacy rules."
    },
    {
      q: "What happens after launch?",
      a: "We actively monitor all transactions and API responses, fix any edge cases, and remain completely reachable. This is an ongoing operational partnership, not a simple one-time sandbox delivery."
    }
  ];

  const getHorizontalKeyframes = (index: number) => {
    if (index === 0) {
      return {
        left: ["-64px", "100%", "100%", "-64px", "-64px"],
        leadLeft: ["-10px", "100%", "100%", "-10px", "-10px"],
        opacity: [1, 1, 0, 0, 1],
        times: [0, 0.33, 0.34, 0.99, 1]
      };
    } else if (index === 1) {
      return {
        left: ["-64px", "-64px", "100%", "100%", "-64px"],
        leadLeft: ["-10px", "-10px", "100%", "100%", "-10px"],
        opacity: [0, 1, 1, 0, 0],
        times: [0, 0.33, 0.66, 0.67, 1]
      };
    } else {
      return {
        left: ["-64px", "-64px", "100%", "100%"],
        leadLeft: ["-10px", "-10px", "100%", "100%"],
        opacity: [0, 0, 1, 1],
        times: [0, 0.66, 0.99, 1]
      };
    }
  };

  const getVerticalKeyframes = (index: number) => {
    if (index === 0) {
      return {
        top: ["-40px", "100%", "100%", "-40px", "-40px"],
        leadTop: ["-10px", "100%", "100%", "-10px", "-10px"],
        opacity: [1, 1, 0, 0, 1],
        times: [0, 0.33, 0.34, 0.99, 1]
      };
    } else if (index === 1) {
      return {
        top: ["-40px", "-40px", "100%", "100%", "-40px"],
        leadTop: ["-10px", "-10px", "100%", "100%", "-10px"],
        opacity: [0, 1, 1, 0, 0],
        times: [0, 0.33, 0.66, 0.67, 1]
      };
    } else {
      return {
        top: ["-40px", "-40px", "100%", "100%"],
        leadTop: ["-10px", "-10px", "100%", "100%"],
        opacity: [0, 0, 1, 1],
        times: [0, 0.66, 0.99, 1]
      };
    }
  };

  return (
    <div className="bg-[#03090A] text-gray-100 min-h-screen relative overflow-hidden font-sans selection:bg-[#FF5A36] selection:text-white">
      {/* Background radial soft ambient glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-[#FF5A36]/8 to-transparent blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-[#00ADD8]/8 to-transparent blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-[#FF5A36]/6 to-transparent blur-[130px] pointer-events-none z-0" />

      {/* Grid Overlay matching the core design pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,59,65,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(20,59,65,0.06)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-28 md:pt-32 md:pb-40 px-4 md:px-8 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-7 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5A36]/10 border border-[#FF5A36]/25 shadow-inner"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF5A36] animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#FF5A36] font-mono">
                AI AUTOMATION &amp; AGENTS
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] font-display text-white"
            >
              AI that works in <span className="bg-gradient-to-r from-[#FF5A36] to-[#00ADD8] bg-clip-text text-transparent drop-shadow-sm font-black">production</span>.<br />
              Not just in a demo.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed"
            >
              We automate one real workflow in your business — leads, support, or data entry — and keep it running after launch. No hype, no vague "AI-powered" promises.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-3"
            >
              <button
                onClick={() => onRequestCallback("AI Automation Consultation Request")}
                className="group px-8 py-4.5 rounded-full bg-gradient-to-r from-[#FF5A36] to-[#E24320] hover:scale-[1.02] active:scale-[0.98] text-white font-bold tracking-wider shadow-lg shadow-[#FF5A36]/25 transition-all text-xs uppercase flex items-center gap-2 cursor-pointer border border-[#FF5A36]/20"
              >
                Book consultation call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Benefit Tags */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-[#143B41]/25"
            >
              {[
                "Live in production, not a demo",
                "Fixed delivery timeline",
                "Works with tools you already use",
                "Transparent, fixed pricing"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5.5 h-5.5 rounded-full bg-[#00ADD8]/10 flex items-center justify-center border border-[#00ADD8]/25 shrink-0 shadow-inner">
                    <Check className="w-3.2 h-3.2 text-[#00ADD8]" />
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-gray-300">{benefit}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Terminal Block - Starting immediately from line 1 */}
          <div className="lg:col-span-5 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-[#143B41]/40 bg-[#040D0F]/90 backdrop-blur-md shadow-2xl shadow-black/90 overflow-hidden font-mono text-xs md:text-sm"
            >
              {/* Terminal Window Header */}
              <div className="px-5 py-3.5 bg-[#061416] border-b border-[#143B41]/45 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5A36]/40" />
                  <div className="w-3 h-3 rounded-full bg-[#00ADD8]/40" />
                  <div className="w-3 h-3 rounded-full bg-gray-700" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-extrabold flex items-center gap-1.5 font-mono">
                  <TerminalIcon className="w-3.5 h-3.5 text-[#00ADD8]" />
                  live_workflow.log
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse" />
                  <span className="text-[9px] text-green-400 font-bold font-mono">ACTIVE</span>
                </div>
              </div>

              {/* Terminal Body - Starts from first line (justify-start instead of justify-end) */}
              <div className="p-6 space-y-3 min-h-[280px] flex flex-col justify-start text-left">
                {displayedLogs.map((log, index) => (
                  <div key={index} className="flex items-start gap-2.5 animate-fade-in leading-relaxed">
                    <span className="text-[#FF5A36]/60 select-none font-bold shrink-0">{log.prefix}</span>
                    <span className={log.colorClass}>{log.text}</span>
                  </div>
                ))}
                
                {/* Active character typing line */}
                {(currentTypingText || currentPrefix) && (
                  <div className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#FF5A36]/60 select-none font-bold shrink-0">{currentPrefix}</span>
                    <span className={currentColorClass}>
                      {currentTypingText}
                      <span className="inline-block w-1.5 h-3.5 bg-[#00ADD8] ml-1 animate-pulse align-middle" />
                    </span>
                  </div>
                )}

                {/* Idle Prompt Marker when not typing line */}
                {!currentTypingText && !currentPrefix && (
                  <div className="flex items-center gap-2">
                    <span className="text-[#FF5A36]/60 select-none font-bold shrink-0">$</span>
                    <span className="w-1.5 h-3.5 bg-[#FF5A36] animate-pulse" />
                  </div>
                )}
              </div>
            </motion.div>
          </div>

        </div>

        {/* CURVED DIVIDER: Transition from dark `#03090A` to light `#EEF7F6` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#EEF7F6] fill-current">
            <path d="M0,32 C300,120 900,-50 1200,32 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* WORK IN ACTION SECTION (Alternate bg: Light Mint Gray `#EEF7F6` with beautiful dotted grid pattern) */}
      <section className="relative py-24 px-4 md:px-8 bg-[#EEF7F6] text-slate-800 z-10 overflow-hidden" style={{ backgroundImage: "radial-gradient(#cbe2e0 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}>
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00ADD8] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#00ADD8] font-mono">
                WORK IN ACTION
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
              See how we've automated real workflows.
            </h2>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF5A36]/8 border border-[#FF5A36]/15 text-[10px] md:text-xs font-mono font-bold text-[#D43F1E] shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>🔶 SAMPLE WORKFLOWS — REPLACE WITH REAL CLIENT PROJECTS</span>
            </div>
          </div>

          {/* Dynamic Workflow Tab Selectors */}
          <div className="flex flex-wrap gap-3">
            {(Object.keys(workflows) as Array<keyof typeof workflows>).map((key) => (
              <button
                key={key}
                onClick={() => setActiveWorkflow(key)}
                className={`px-6 py-3.5 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                  activeWorkflow === key
                    ? "bg-[#FF5A36] border-[#FF5A36] text-white shadow-lg shadow-[#FF5A36]/20 scale-[1.02]"
                    : "bg-white/80 backdrop-blur-sm border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400 hover:bg-white hover:shadow-md"
                }`}
              >
                {key === "crm" && "CRM Integration"}
                {key === "llm" && "LLM Development"}
                {key === "support" && "AI Support Agent"}
                {key === "cost" && "Cost-Efficient AI"}
              </button>
            ))}
          </div>

          {/* Displayed Active Workflow Staging Canvas */}
          <div className="p-6 md:p-10 rounded-3xl border border-slate-200/80 bg-white relative overflow-hidden shadow-xl shadow-slate-200/50">
            {/* Fine ambient background grid overlay inside the frame */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,90,31,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,90,31,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWorkflow}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
                className="space-y-10 relative z-10"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="space-y-1.5">
                    <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#FF5A36] font-mono uppercase">
                      {workflows[activeWorkflow].tag}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 font-display">
                      {workflows[activeWorkflow].title}
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs md:text-sm font-bold text-[#16a34a] bg-[#16a34a]/8 border border-[#16a34a]/20 shadow-inner">
                    <TrendingUp className="w-4 h-4 text-[#16a34a]" />
                    {workflows[activeWorkflow].stat}
                  </div>
                </div>

                {/* Workflow Diagram Node Flow Layout */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-4 lg:gap-0 relative w-full pt-6">
                  {workflows[activeWorkflow].steps.map((step, idx) => (
                    <React.Fragment key={idx}>
                      {/* Node Container */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6, delay: idx * 0.1 }}
                        className="flex flex-col items-center text-center max-w-[220px] relative z-10"
                      >
                        {/* Step label index */}
                        <span className="font-mono text-xs text-[#FF5A36] font-bold tracking-widest mb-3 block">
                          STEP {step.num}
                        </span>
                        
                        {/* Elegant glowing icon container */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200/80 shadow-md flex items-center justify-center text-[#FF5A36] relative hover:scale-105 transition-transform duration-300 shadow-[0_4px_20px_rgba(255,90,54,0.06)] hover:shadow-[0_8px_30px_rgba(255,90,54,0.12)]">
                          {step.icon}
                          {/* Ripple or breath glow decoration inside container */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#FF5A36]/5 to-[#00ADD8]/5 animate-pulse pointer-events-none" />
                        </div>
                        
                        {/* Step Label */}
                        <h4 className="text-sm md:text-base font-extrabold text-slate-900 mt-4 leading-snug font-display">
                          {step.label}
                        </h4>
                        {/* Step Description */}
                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-[170px] font-medium">
                          {step.desc}
                        </p>
                      </motion.div>

                      {/* Connected Flow Connector Arrow */}
                      {idx < 3 && (
                        <>
                          {/* Desktop Arrow */}
                          <div className="hidden lg:block flex-1 relative h-[3px] bg-slate-200/40 min-w-[60px] overflow-visible" style={{ marginTop: "68px" }}>
                            {/* The flowing glowing dot/comet */}
                            <motion.div
                              className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-[#FF5A36] to-transparent"
                              style={{
                                boxShadow: "0 0 10px #FF5A36, 0 0 15px rgba(255, 90, 54, 0.6)",
                                height: "3px"
                              }}
                              initial={{ left: "-64px", opacity: idx === 0 ? 1 : 0 }}
                              animate={{ 
                                left: getHorizontalKeyframes(idx).left, 
                                opacity: getHorizontalKeyframes(idx).opacity 
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 3.6,
                                ease: "linear",
                                times: getHorizontalKeyframes(idx).times
                              }}
                            />
                            {/* Glowing lead point */}
                            <motion.div
                              className="absolute w-2.5 h-2.5 rounded-full bg-[#FF5A36] -translate-y-1/2 top-1/2 shadow-[0_0_8px_#FF5A36]"
                              initial={{ left: "-10px", opacity: idx === 0 ? 1 : 0 }}
                              animate={{ 
                                left: getHorizontalKeyframes(idx).leadLeft, 
                                opacity: getHorizontalKeyframes(idx).opacity 
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 3.6,
                                ease: "linear",
                                times: getHorizontalKeyframes(idx).times
                              }}
                            />
                            {/* Visible Arrowhead */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                              <ChevronRight className="w-5 h-5 text-[#FF5A36] drop-shadow-sm" />
                            </div>
                          </div>

                          {/* Mobile/Tablet Vertical Arrow */}
                          <div className="lg:hidden flex justify-center py-6 relative h-20 w-full overflow-visible">
                            <div className="w-[3px] h-full bg-slate-200/40 relative">
                              {/* Flowing animated dot/comet */}
                              <motion.div
                                className="absolute left-0 right-0 h-10 bg-gradient-to-b from-transparent via-[#FF5A36] to-transparent"
                                style={{
                                  boxShadow: "0 0 10px #FF5A36, 0 0 15px rgba(255, 90, 54, 0.6)",
                                  width: "3px"
                                }}
                                initial={{ top: "-40px", opacity: idx === 0 ? 1 : 0 }}
                                animate={{ 
                                  top: getVerticalKeyframes(idx).top, 
                                  opacity: getVerticalKeyframes(idx).opacity 
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 3.6,
                                ease: "linear",
                                times: getVerticalKeyframes(idx).times
                              }}
                              />
                              {/* Glowing lead point */}
                              <motion.div
                                className="absolute w-2.5 h-2.5 rounded-full bg-[#FF5A36] -translate-x-1/2 left-1/2 shadow-[0_0_8px_#FF5A36]"
                                initial={{ top: "-10px", opacity: idx === 0 ? 1 : 0 }}
                                animate={{ 
                                  top: getVerticalKeyframes(idx).leadTop, 
                                  opacity: getVerticalKeyframes(idx).opacity 
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 3.6,
                                ease: "linear",
                                times: getVerticalKeyframes(idx).times
                              }}
                              />
                              {/* Arrowhead pointing down */}
                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
                                <ChevronDown className="w-5 h-5 text-[#FF5A36] drop-shadow-sm" />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CURVED DIVIDER: Transition from light `#EEF7F6` to dark `#03090A` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#03090A] fill-current">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* THE PROBLEM — AND HOW WE FIX IT (Alternate bg: Dark Slate #03090A) */}
      <section className="relative py-24 px-4 md:px-8 z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="max-w-3xl space-y-4 text-left">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FF5A36] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF5A36] font-mono">
                THE PROBLEM — AND HOW WE FIX IT
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-display">
              Most "AI solutions" don't ship. Here's how we're different.
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                num: "01",
                riskTitle: "Demos that never ship",
                riskDesc: "You see an impressive sandbox demonstration, then nothing actually goes live or integrates with your active daily business pipelines.",
                fixTitle: "Live in production, fast",
                fixDesc: "We build one real, atomic workflow with actual production pipelines and launch it live — not a simple slide deck or sandbox."
              },
              {
                num: "02",
                riskTitle: "Vague \"AI-powered\" promises",
                riskDesc: "Every vendor says their product is \"AI-powered.\" Almost none tell you exactly what it automates or where it takes action in your workflow.",
                fixTitle: "One clear workflow, named upfront",
                fixDesc: "We name the exact, actionable task we're automating before you sign anything — no fuzzy language or vague marketing claims."
              },
              {
                num: "03",
                riskTitle: "No answer on data & compliance",
                riskDesc: "You ask where your customer logs or API context goes and get a shrug instead of a straight enterprise compliance answer.",
                fixTitle: "Clear on data & governance",
                fixDesc: "You'll know exactly where your database queries go, how data is processed, and we guarantee your parameters in writing."
              }
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Risk Card */}
                <div className="p-7 rounded-2xl border-l-4 border-red-500 border-y border-r border-[#143B41]/20 bg-[#061416]/15 space-y-3 text-left hover:border-l-red-400 transition-all duration-300">
                  <span className="font-mono text-[10px] md:text-xs text-red-400 font-extrabold tracking-wider">
                    RISK / {row.num}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2.5 font-display">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                    {row.riskTitle}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    {row.riskDesc}
                  </p>
                </div>

                {/* Fix Card */}
                <div className="p-7 rounded-2xl border-l-4 border-[#FF5A36] border-y border-r border-[#143B41]/40 bg-[#FF5A36]/3 space-y-3 text-left hover:bg-[#FF5A36]/6 transition-all duration-300">
                  <span className="font-mono text-[10px] md:text-xs text-[#FF5A36] font-extrabold tracking-wider">
                    FIX / {row.num}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2.5 font-display">
                    <CheckCircle2 className="w-5 h-5 text-[#FF5A36] shrink-0" />
                    {row.fixTitle}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-200 leading-relaxed">
                    {row.fixDesc}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* CURVED DIVIDER: Transition from dark `#03090A` to light `#EEF7F6` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#EEF7F6] fill-current">
            <path d="M0,32 C300,120 900,-50 1200,32 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* OUR SERVICES SECTION (Alternate bg: Light Mint Gray `#EEF7F6` with beautiful dotted grid pattern) */}
      <section className="relative py-24 px-4 md:px-8 bg-[#EEF7F6] text-slate-800 z-10 overflow-hidden" style={{ backgroundImage: "radial-gradient(#cbe2e0 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}>
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00ADD8] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#00ADD8] font-mono">
                OUR SERVICES
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
              What we automate.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Lead Response & Follow-Up",
                desc: "Instant replies and scheduling sequences to qualified leads across chat, WhatsApp, and email systems."
              },
              {
                num: "02",
                title: "AI Support Agents",
                desc: "Handle common customer questions automatically with secure compliance rails, handing off tricky tickets smoothly."
              },
              {
                num: "03",
                title: "Document & Data Processing",
                desc: "Extract and map data accurately from complex forms, PDF files, and invoices without boring manual key-ins."
              },
              {
                num: "04",
                title: "Workflow Automation",
                desc: "Tie your CRMs, Google Sheets, databases, and communication tools together so operational updates complete themselves."
              }
            ].map((service, i) => (
              <div key={i} className="p-7 rounded-2xl border border-slate-200/80 bg-white hover:border-[#FF5A36]/40 hover:shadow-lg hover:shadow-slate-200/80 transition-all duration-300 space-y-5 group text-left flex flex-col justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF5A36] to-[#E24320] flex items-center justify-center font-mono font-bold text-white text-base shadow-lg shadow-[#FF5A36]/15">
                  {service.num}
                </div>
                <div className="space-y-2">
                  <h3 className="text-base md:text-lg font-bold text-slate-900 group-hover:text-[#FF5A36] transition-colors font-display">
                    {service.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CURVED DIVIDER: Transition from light `#EEF7F6` to dark `#03090A` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#03090A] fill-current">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* WHAT WE CONNECT WITH SECTION (Alternate bg: Dark Slate #03090A) */}
      <section className="relative py-24 px-4 md:px-8 bg-[#03090A] z-10 border-t border-[#143B41]/20" id="integrations">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FF5A36] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF5A36] font-mono">
                WHAT WE CONNECT WITH
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-display">
              Built into tools you already use.
            </h2>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF5A36]/10 border border-[#FF5A36]/20 text-[10px] md:text-xs font-mono font-bold text-[#FF5A36]">
              <Network className="w-3.5 h-3.5" />
              <span>🔶 CONFIRM ACTUAL INTEGRATIONS WITH CLIENT</span>
            </div>
          </div>

          <div className="divide-y divide-[#143B41]/25 border-t border-b border-[#143B41]/25">
            {[
              {
                cat: "CRM Systems",
                desc: "Where customer data and pipeline leads live",
                items: ["Salesforce", "HubSpot", "Zoho CRM", "Pipedrive"]
              },
              {
                cat: "Communication Layers",
                desc: "Where conversational pipelines happen",
                items: ["WhatsApp Business API", "Slack Enterprise", "Google Workspace & Outlook Email", "Voice / IVR Engines"]
              },
              {
                cat: "Data Warehouses & Storage",
                desc: "Where operational records are stored",
                items: ["Google Sheets", "PostgreSQL", "Airtable Sync", "Snowflake DB"]
              },
              {
                cat: "AI Models & Core Frameworks",
                desc: "The computational models powering automation",
                items: ["OpenAI GPT Models", "Anthropic Claude Suite", "LangChain Orchestrator", "Llama & Open-source LLMs"]
              }
            ].map((layer, idx) => (
              <div key={idx} className="py-7 grid grid-cols-1 md:grid-cols-12 gap-6 items-start text-left">
                <div className="md:col-span-4 space-y-1">
                  <h4 className="text-sm md:text-base font-bold text-white font-display">
                    {layer.cat}
                  </h4>
                  <p className="text-xs text-gray-400 font-mono">
                    {layer.desc}
                  </p>
                </div>
                <div className="md:col-span-8">
                  <div className="flex flex-wrap gap-2.5">
                    {layer.items.map((item, idy) => (
                      <span
                        key={idy}
                        className="px-4 py-2.5 rounded-full border border-[#143B41]/40 bg-[#03090A]/50 hover:border-[#FF5A36]/55 hover:text-white text-xs md:text-sm font-mono text-gray-300 transition-all duration-200 shadow-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CURVED DIVIDER: Transition from dark `#03090A` to light `#EEF7F6` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#EEF7F6] fill-current">
            <path d="M0,32 C300,120 900,-50 1200,32 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* HOW WE WORK SECTION (Alternate bg: Light Mint Gray `#EEF7F6` with beautiful dotted grid pattern) */}
      <section className="relative py-24 px-4 md:px-8 bg-[#EEF7F6] text-slate-800 z-10 overflow-hidden" style={{ backgroundImage: "radial-gradient(#cbe2e0 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} id="process">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00ADD8] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#00ADD8] font-mono">
                HOW WE WORK
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
              Simple process, no surprises.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                week: "WEEK 0",
                title: "We talk",
                desc: "A focused 30-minute diagnostic session to identify the highest ROI workflow worth automating first."
              },
              {
                num: "02",
                week: "WEEK 1",
                title: "We plan",
                desc: "A clear, fixed price agreement, timeline blueprint, and naming what is being automated — all in writing."
              },
              {
                num: "03",
                week: "BUILD PHASE",
                title: "We build",
                desc: "You watch it run on staging endpoints with actual sandbox transaction logs every single week, not slides."
              },
              {
                num: "04",
                week: "LAUNCH",
                title: "We launch & monitor",
                desc: "The agent goes live inside your ecosystem, and our engineers watch production errors and logs continuously."
              }
            ].map((step, idx) => (
              <div key={idx} className="p-7 rounded-2xl border border-slate-200 bg-white hover:border-[#00ADD8]/40 hover:shadow-lg hover:shadow-slate-200/80 transition-all duration-300 space-y-5 relative group text-left h-full flex flex-col justify-between">
                <div className="w-12 h-12 rounded-full border-2 border-[#FF5A36] flex items-center justify-center font-mono font-bold text-[#FF5A36] text-sm shadow-[0_0_14px_rgba(255,90,31,0.1)]">
                  {step.num}
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] md:text-xs font-extrabold font-mono text-[#00ADD8] tracking-widest block">
                    {step.week}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 group-hover:text-[#00ADD8] transition-colors font-display">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CURVED DIVIDER: Transition from light `#EEF7F6` to dark `#03090A` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#03090A] fill-current">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* WHY COSMONET COMPARISON TABLE SECTION (Alternate bg: Dark Slate #03090A) */}
      <section className="relative py-24 px-4 md:px-8 bg-[#03090A] z-10" id="why">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FF5A36] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF5A36] font-mono">
                WHY COSMONET
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-display">
              How we're different.
            </h2>
          </div>

          <div className="rounded-2xl border border-[#143B41]/35 overflow-hidden bg-[#040D0F]/70 backdrop-blur-sm shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-[#143B41]/40 bg-[#061416]/70">
                    <th className="p-5 font-mono text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-gray-400">
                      Feature Evaluation
                    </th>
                    <th className="p-5 font-mono text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-gray-400 border-l border-[#143B41]/20">
                      Typical AI Vendor
                    </th>
                    <th className="p-5 font-mono text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-[#FF5A36] bg-[#FF5A36]/5 border-l border-[#143B41]/20">
                      Cosmonet AI Automation
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#143B41]/15 text-gray-300">
                  {[
                    { key: "Method of Delivery", vendor: "Impression sandbox or demo script only", cosmonet: "Live code deployed inside production systems" },
                    { key: "Defined Scope", vendor: "Vague \"AI-powered\" consulting pitch", cosmonet: "One named, atomic business workflow agreed upfront" },
                    { key: "Compliance & Security", vendor: "Rarely addressed or pushed off for later", cosmonet: "Strict custom compliance and data privacy in writing" },
                    { key: "Post-Launch Management", vendor: "One-time handoff; you support the integration", cosmonet: "Continuous active monitoring and bug support included" }
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-[#061416]/25 transition-all text-left">
                      <td className="p-5 font-extrabold text-white border-r border-[#143B41]/15 font-display">
                        {row.key}
                      </td>
                      <td className="p-5 text-gray-400 border-r border-[#143B41]/15 leading-relaxed">
                        {row.vendor}
                      </td>
                      <td className="p-5 text-white bg-[#FF5A36]/2">
                        <div className="flex items-start gap-2.5 font-bold">
                          <Check className="w-4.5 h-4.5 text-[#FF5A36] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{row.cosmonet}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CURVED DIVIDER: Transition from dark `#03090A` to light `#EEF7F6` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#EEF7F6] fill-current">
            <path d="M0,32 C300,120 900,-50 1200,32 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* PROOF SECTION (Alternate bg: Light Mint Gray `#EEF7F6` with beautiful dotted grid pattern) */}
      <section className="relative py-24 px-4 md:px-8 bg-[#EEF7F6] text-slate-800 z-10 overflow-hidden" style={{ backgroundImage: "radial-gradient(#cbe2e0 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}>
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00ADD8] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#00ADD8] font-mono">
                PROOF
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
              Real results.
            </h2>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF5A36]/10 border border-[#FF5A36]/25 text-[10px] md:text-xs font-mono font-bold text-[#FF5A36] shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>🔶 SAMPLE LAYOUT — REPLACE WITH REAL CLIENT PHOTOS &amp; NUMBERS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                stat: "80%",
                label: "faster lead response time",
                author: "Client Name, Industry"
              },
              {
                stat: "24/7",
                label: "automated coverage, no added headcount",
                author: "Client Name, Industry"
              },
              {
                stat: "3x",
                label: "more leads followed up per week",
                author: "Client Name, Industry"
              }
            ].map((metric, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between space-y-6 hover:border-[#00ADD8]/35 hover:shadow-lg hover:shadow-slate-200/80 transition-all duration-300">
                <div className="w-full h-32 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-mono text-slate-400 shadow-inner">
                  [ CLIENT PHOTO / BRAND LOGO ]
                </div>
                <div className="space-y-2 text-left">
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#FF5A36] to-[#00ADD8] bg-clip-text text-transparent drop-shadow-sm font-display">
                    {metric.stat}
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 font-semibold leading-snug">
                    {metric.label}
                  </p>
                  <div className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wide">
                    — {metric.author}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Staging Story Action Prompt */}
          <div className="p-6 md:p-8 rounded-2xl border border-dashed border-slate-300 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md">
            <div className="space-y-1.5 text-left">
              <h3 className="text-base md:text-lg font-bold text-slate-900 font-display">
                Add a client story here
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-xl">
                One client name, one workflow automated, one hard number. This one block builds more trust than the rest of the page combined.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#FF5A36]/10 border border-[#FF5A36]/25 text-[10px] md:text-xs font-mono font-bold text-[#FF5A36] shrink-0">
              <span>🔶 NEEDS REAL CLIENT DATA</span>
            </div>
          </div>
        </div>

        {/* CURVED DIVIDER: Transition from light `#EEF7F6` to dark `#03090A` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#03090A] fill-current">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* FAQS SECTION (Alternate bg: Dark Slate #03090A) */}
      <section className="relative py-24 px-4 md:px-8 bg-[#03090A] z-10" id="faq">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#FF5A36]/15 border border-[#FF5A36]/25 text-xs font-bold uppercase tracking-widest text-[#FF5A36] font-mono">
              FAQS
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-display">
              Quick answers.
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#143B41]/35 bg-[#03090A]/60 overflow-hidden hover:border-[#FF5A36]/40 transition-all duration-200 shadow-md"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 font-bold text-white text-sm md:text-base hover:bg-[#061416]/40 transition-all cursor-pointer font-display"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[#FF5A36] font-extrabold">Q.</span>
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${activeFaq === idx ? "rotate-180 text-[#FF5A36]" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 border-t border-[#143B41]/10 text-xs md:text-sm text-gray-400 leading-relaxed pl-10 text-left">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* CURVED DIVIDER: Transition from dark `#03090A` to light `#EEF7F6` */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#EEF7F6] fill-current">
            <path d="M0,32 C300,120 900,-50 1200,32 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* FINAL BOOK CONSULTATION CALL ACTION SECTION (Alternate bg: Light Mint Gray #EEF7F6 with beautiful dotted pattern) */}
      <section className="py-28 px-4 md:px-8 text-center relative overflow-hidden bg-[#EEF7F6] text-slate-800 z-10" style={{ backgroundImage: "radial-gradient(#cbe2e0 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} id="cta">
        {/* Subtle glowing elements to frame layout */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] rounded-full bg-[#FF5A36]/4 blur-[140px] pointer-events-none z-0" />
        
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 font-display">
            Let's find the workflow worth automating.
          </h2>
          <p className="text-base md:text-xl text-slate-600 max-w-xl mx-auto font-mono">
            30 minutes. No pressure, no pushy sales pitch.
          </p>
          <div className="pt-6 flex justify-center">
            <button
              onClick={() => onRequestCallback("AI Automation Workflow Inquiry")}
              className="group px-10 py-5 rounded-full bg-gradient-to-r from-[#FF5A36] to-[#E24320] hover:scale-[1.03] active:scale-[0.97] text-white font-bold tracking-wider shadow-xl shadow-[#FF5A36]/20 hover:shadow-[#FF5A36]/40 transition-all text-xs uppercase flex items-center gap-2.5 cursor-pointer border border-[#FF5A36]/25"
            >
              Book consultation call
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
