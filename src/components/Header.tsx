/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Menu, X, ArrowRight } from "lucide-react";

interface HeaderProps {
  currentView: "home" | "create-team" | "careers";
  onViewChange: (view: "home" | "create-team" | "careers") => void;
  onRequestCallback: () => void;
}

const REGIONS = [
  { name: "United States", flag: "🇺🇸", code: "US" },
  { name: "United Kingdom", flag: "🇬🇧", code: "UK" },
  { name: "India", flag: "🇮🇳", code: "IN" },
  { name: "Singapore", flag: "🇸🇬", code: "SG" },
  { name: "Australia", flag: "🇦🇺", code: "AU" }
];

export default function Header({ currentView, onViewChange, onRequestCallback }: HeaderProps) {
  const [regionMenuOpen, setRegionMenuOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);
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

  return (
    <header className="sticky top-0 z-40 bg-[#03090A]/90 backdrop-blur-md border-b border-[#143B41]/40 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <div
          id="brand-logo"
          onClick={() => {
            onViewChange("home");
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center cursor-pointer group select-none"
        >
          <span className="text-xl font-sans font-black tracking-wider text-white group-hover:text-[#00ADD8] transition-colors uppercase">
            Cosmonet AI
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#E71C84] ml-1.5 shadow-[0_0_10px_#e71c84] group-hover:scale-125 transition-transform animate-pulse" />
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden xl:flex items-center space-x-1">
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
            id="nav-create-team-btn"
            onClick={() => onViewChange("create-team")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
              currentView === "create-team" ? "text-[#E71C84]" : "text-gray-300 hover:text-white"
            }`}
          >
            Squad Builder
          </button>

          <button
            id="nav-contact-btn"
            onClick={() => handleSectionScroll("contact")}
            className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden xl:flex items-center gap-4">
          {/* Region Dropdown Selector */}
          <div className="relative">
            <button
              id="region-selector-btn"
              onClick={() => setRegionMenuOpen(!regionMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#143B41]/50 bg-[#0B2B30]/30 hover:bg-[#0B2B30] text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#00ADD8]" />
              <span>{selectedRegion.flag}</span>
              <span className="font-mono text-[10px]">{selectedRegion.code}</span>
            </button>

            <AnimatePresence>
              {regionMenuOpen && (
                <>
                  <div
                    id="region-backdrop"
                    className="fixed inset-0 z-10"
                    onClick={() => setRegionMenuOpen(false)}
                  />
                  <motion.div
                    id="region-dropdown"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-[#03090A] border border-[#143B41]/80 rounded-xl shadow-xl z-20 py-1.5"
                  >
                    <p className="px-3 py-1 text-[10px] uppercase font-black tracking-wider text-[#E71C84]">
                      HQ / Regional Nodes
                    </p>
                    {REGIONS.map((region) => (
                      <button
                        key={region.code}
                        onClick={() => {
                          setSelectedRegion(region);
                          setRegionMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs text-gray-300 hover:bg-[#143B41]/50 hover:text-white transition-colors text-left cursor-pointer font-semibold"
                      >
                        <span className="flex items-center gap-2">
                          <span>{region.flag}</span>
                          <span>{region.name}</span>
                        </span>
                        {selectedRegion.code === region.code && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00ADD8]" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Call to action */}
          <button
            id="header-cta-btn"
            onClick={onRequestCallback}
            className="bg-[#E71C84] hover:bg-[#f62693] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:shadow-lg hover:shadow-pink-500/20 transition-all cursor-pointer"
          >
            Contact us
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile / Tablet Menu Icon */}
        <div className="flex xl:hidden items-center gap-2">
          {/* Quick Region Selector for mobile */}
          <button
            id="mobile-region-btn"
            onClick={() => {
              const currentIndex = REGIONS.findIndex((r) => r.code === selectedRegion.code);
              const nextIndex = (currentIndex + 1) % REGIONS.length;
              setSelectedRegion(REGIONS[nextIndex]);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#143B41]/40 bg-[#0B2B30]/30 text-xs text-gray-300 font-mono"
          >
            <span>{selectedRegion.flag}</span>
            <span className="text-[10px] font-bold">{selectedRegion.code}</span>
          </button>

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
                id="mob-nav-create-team"
                onClick={() => {
                  onViewChange("create-team");
                  setMobileMenuOpen(false);
                }}
                className={`w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider ${
                  currentView === "create-team"
                    ? "bg-[#0B2B30]/50 text-[#E71C84] border-l-4 border-[#E71C84]"
                    : "text-gray-300 hover:bg-[#0B2B30]/30"
                }`}
              >
                Squad Builder
              </button>

              <button
                id="mob-nav-contact"
                onClick={() => handleSectionScroll("contact")}
                className="w-full py-2 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#0B2B30]/30"
              >
                Contact
              </button>
            </div>

            <div className="pt-3 border-t border-[#143B41]/30 flex flex-col gap-2">
              <button
                id="mob-contact-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestCallback();
                }}
                className="w-full bg-[#E71C84] hover:bg-[#f62693] text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer"
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
