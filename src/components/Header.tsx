/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Menu, X, ArrowRight } from "lucide-react";
import logoImg from "../assets/images/logo.png";
import logoTextImg from "../assets/images/logo_text.png";

interface HeaderProps {
  currentView: "home" | "careers" | "tech" | "ai";
  onViewChange: (view: "home" | "careers" | "tech" | "ai") => void;
  onRequestCallback: () => void;
}

export default function Header({ currentView, onViewChange, onRequestCallback }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSectionScroll = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView !== "home") {
      onViewChange("home");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleTechSectionScroll = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#03090A]/90 backdrop-blur-md border-b border-[#143B41]/40 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <div
          id="brand-logo"
          onClick={() => {
            if (currentView === "tech" || currentView === "ai") {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              onViewChange("home");
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <img 
            src={logoImg} 
            alt="Cosmonet AI Logo" 
            className="w-12 h-12 md:w-18 md:h-18 object-contain group-hover:rotate-12 transition-transform duration-500 ease-out" 
            referrerPolicy="no-referrer" 
          />
          <img 
            src={logoTextImg} 
            alt="Cosmonet AI" 
            className="h-16 md:h-24 w-auto object-contain" 
            referrerPolicy="no-referrer" 
          />
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36] shadow-[0_0_8px_#FF5A36] group-hover:scale-125 transition-transform animate-pulse" />
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden xl:flex items-center space-x-1">
          {currentView === "tech" ? (
            <>
              <button
                id="tech-nav-home-btn"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#00ADD8] transition-colors"
              >
                Home
              </button>
              <button
                id="tech-nav-process-btn"
                onClick={() => handleTechSectionScroll("process")}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#00ADD8] transition-colors"
              >
                Sprints
              </button>
              <button
                id="tech-nav-problems-btn"
                onClick={() => handleTechSectionScroll("problems")}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#00ADD8] transition-colors"
              >
                Risks &amp; Fixes
              </button>
              <button
                id="tech-nav-services-btn"
                onClick={() => handleTechSectionScroll("services")}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#00ADD8] transition-colors"
              >
                Services
              </button>
              <button
                id="tech-nav-techstack-btn"
                onClick={() => handleTechSectionScroll("techstack")}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#00ADD8] transition-colors"
              >
                Stack
              </button>
              <button
                id="tech-nav-how-we-work-btn"
                onClick={() => handleTechSectionScroll("how-we-work")}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#00ADD8] transition-colors"
              >
                Process
              </button>
              <button
                id="tech-nav-why-us-btn"
                onClick={() => handleTechSectionScroll("why-us")}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#00ADD8] transition-colors"
              >
                Comparison
              </button>
              <button
                id="tech-nav-faqs-btn"
                onClick={() => handleTechSectionScroll("faqs")}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#00ADD8] transition-colors"
              >
                FAQs
              </button>
            </>
          ) : currentView === "ai" ? (
            <>
              <button
                id="ai-nav-home-btn"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#FF5A36] transition-colors"
              >
                Home
              </button>
              <button
                id="ai-nav-integrations-btn"
                onClick={() => handleTechSectionScroll("integrations")}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#FF5A36] transition-colors"
              >
                Integrations
              </button>
              <button
                id="ai-nav-process-btn"
                onClick={() => handleTechSectionScroll("process")}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#FF5A36] transition-colors"
              >
                Process
              </button>
              <button
                id="ai-nav-why-btn"
                onClick={() => handleTechSectionScroll("why")}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#FF5A36] transition-colors"
              >
                Why Us
              </button>
              <button
                id="ai-nav-faq-btn"
                onClick={() => handleTechSectionScroll("faq")}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#FF5A36] transition-colors"
              >
                FAQ
              </button>
            </>
          ) : (
            <>
              <button
                id="nav-home-btn"
                onClick={() => {
                  onViewChange("home");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                  currentView === "home" ? "text-[#00ADD8]" : "text-gray-300 hover:text-white"
                }`}
              >
                Home
              </button>

              <button
                id="nav-about-btn"
                onClick={() => handleSectionScroll("who-we-are")}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
              >
                About
              </button>

              <button
                id="nav-services-btn"
                onClick={() => handleSectionScroll("our-services")}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
              >
                Services
              </button>

              <button
                id="nav-techstack-btn"
                onClick={() => handleSectionScroll("tech-stack")}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
              >
                Tech Stack
              </button>

              <button
                id="nav-industries-btn"
                onClick={() => handleSectionScroll("industries")}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
              >
                Industries
              </button>

              <button
                id="nav-blog-btn"
                onClick={() => handleSectionScroll("blog")}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
              >
                Blog
              </button>

              <button
                id="nav-careers-btn"
                onClick={() => onViewChange("careers")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                  currentView === "careers" ? "text-[#00ADD8]" : "text-gray-300 hover:text-white"
                }`}
              >
                Careers
              </button>

              <button
                id="nav-contact-btn"
                onClick={() => handleSectionScroll("contact")}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </button>
            </>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden xl:flex items-center gap-4">
          {/* Call to action */}
          <button
            id="header-cta-btn"
            onClick={onRequestCallback}
            className="bg-[#FF5A36] hover:bg-[#FF7352] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:shadow-lg hover:shadow-orange-500/20 transition-all cursor-pointer"
          >
            Contact us
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile / Tablet Menu Icon */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-[#143B41]/40 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden border-t border-[#143B41]/30 mt-3 py-4 space-y-3 overflow-hidden"
          >
            <div className="flex flex-col space-y-1">
              {currentView === "tech" ? (
                <>
                  <button
                    id="mob-tech-nav-home"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    Home
                  </button>
                  <button
                    id="mob-tech-nav-process"
                    onClick={() => handleTechSectionScroll("process")}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    Sprints
                  </button>
                  <button
                    id="mob-tech-nav-problems"
                    onClick={() => handleTechSectionScroll("problems")}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    Risks &amp; Fixes
                  </button>
                  <button
                    id="mob-tech-nav-services"
                    onClick={() => handleTechSectionScroll("services")}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    Services
                  </button>
                  <button
                    id="mob-tech-nav-techstack"
                    onClick={() => handleTechSectionScroll("techstack")}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    Stack
                  </button>
                  <button
                    id="mob-tech-nav-how-we-work"
                    onClick={() => handleTechSectionScroll("how-we-work")}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    Process
                  </button>
                  <button
                    id="mob-tech-nav-why-us"
                    onClick={() => handleTechSectionScroll("why-us")}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    Comparison
                  </button>
                  <button
                    id="mob-tech-nav-faqs"
                    onClick={() => handleTechSectionScroll("faqs")}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    FAQs
                  </button>
                </>
              ) : currentView === "ai" ? (
                <>
                  <button
                    id="mob-ai-nav-home"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    Home
                  </button>
                  <button
                    id="mob-ai-nav-integrations"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleTechSectionScroll("integrations");
                    }}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    Integrations
                  </button>
                  <button
                    id="mob-ai-nav-process"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleTechSectionScroll("process");
                    }}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    Process
                  </button>
                  <button
                    id="mob-ai-nav-why"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleTechSectionScroll("why");
                    }}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    Why Us
                  </button>
                  <button
                    id="mob-ai-nav-faq"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleTechSectionScroll("faq");
                    }}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    FAQ
                  </button>
                </>
              ) : (
                <>
                  <button
                    id="mob-nav-home"
                    onClick={() => {
                      onViewChange("home");
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider ${
                      currentView === "home"
                        ? "bg-[#0B2B30]/50 text-[#00ADD8] border-l-4 border-[#00ADD8]"
                        : "text-gray-300 hover:bg-[#0B2B30]/30"
                    }`}
                  >
                    Home
                  </button>

                  <button
                    id="mob-nav-about"
                    onClick={() => handleSectionScroll("who-we-are")}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    About
                  </button>

                  <button
                    id="mob-nav-services"
                    onClick={() => handleSectionScroll("our-services")}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    Services
                  </button>

                  <button
                    id="mob-nav-techstack"
                    onClick={() => handleSectionScroll("tech-stack")}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    Tech Stack
                  </button>

                  <button
                    id="mob-nav-industries"
                    onClick={() => handleSectionScroll("industries")}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    Industries
                  </button>

                  <button
                    id="mob-nav-blog"
                    onClick={() => handleSectionScroll("blog")}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    Blog
                  </button>

                  <button
                    id="mob-nav-careers"
                    onClick={() => {
                      onViewChange("careers");
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider ${
                      currentView === "careers"
                        ? "bg-[#0B2B30]/50 text-[#00ADD8] border-l-4 border-[#00ADD8]"
                        : "text-gray-300 hover:bg-[#0B2B30]/30"
                    }`}
                  >
                    Careers
                  </button>

                  <button
                    id="mob-nav-contact"
                    onClick={() => handleSectionScroll("contact")}
                    className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
                  >
                    Contact
                  </button>
                </>
              )}
            </div>

            <div className="pt-3 border-t border-[#143B41]/30 flex flex-col gap-2">
              <button
                id="mob-contact-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestCallback();
                }}
                className="w-full bg-[#FF5A36] hover:bg-[#FF7352] text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                Contact us
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
