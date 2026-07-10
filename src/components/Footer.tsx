/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { OFFICE_LOCATIONS } from "../data";
import { Send, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";

interface FooterProps {
  onViewChange: (view: "home" | "create-team" | "careers") => void;
}

export default function Footer({ onViewChange }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 2000);
  };

  const handleSectionScroll = (id: string) => {
    onViewChange("home");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  return (
    <footer className="bg-[#03090A] border-t border-[#143B41]/50 pt-16 pb-12 text-gray-300 relative overflow-hidden">
      {/* Curved divider to transition into footer */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Logo & Vision Block */}
          <div className="md:col-span-5 space-y-4">
            <div
              id="footer-logo"
              onClick={() => onViewChange("home")}
              className="flex items-center cursor-pointer select-none w-fit group"
            >
              <span className="text-2xl font-sans font-black tracking-wider text-white group-hover:text-[#00ADD8] transition-colors uppercase">
                COSMONET AI
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#E71C84] ml-1.5 shadow-[0_0_10px_#e71c84]" />
            </div>
            
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Cosmonet AI is a technology and artificial intelligence solutions company focused on building AI-driven products, digital platforms, and intelligent automation systems for modern enterprises.
            </p>

            <div className="flex gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#0B2B30]/50 hover:bg-[#143B41]/80 text-gray-400 hover:text-white transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#0B2B30]/50 hover:bg-[#143B41]/80 text-gray-400 hover:text-white transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/pashaarshad/cosmonet-ai"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#0B2B30]/50 hover:bg-[#143B41]/80 text-gray-400 hover:text-white transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#00ADD8]">Our Capabilities</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleSectionScroll("our-services")}
                  className="hover:text-white hover:underline transition-all text-left text-gray-400 cursor-pointer font-semibold"
                >
                  AI &amp; Data Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionScroll("our-services")}
                  className="hover:text-white hover:underline transition-all text-left text-gray-400 cursor-pointer font-semibold"
                >
                  Application Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionScroll("our-services")}
                  className="hover:text-white hover:underline transition-all text-left text-gray-400 cursor-pointer font-semibold"
                >
                  Generative AI (LLMs)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionScroll("our-services")}
                  className="hover:text-white hover:underline transition-all text-left text-gray-400 cursor-pointer font-semibold"
                >
                  Cloud &amp; DevOps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onViewChange("create-team")}
                  className="hover:text-white hover:underline transition-all text-left text-gray-400 cursor-pointer font-semibold"
                >
                  Dedicated Squad Builder
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Input Block */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E71C84]">Stay Updated</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Stay updated with the latest in AI innovation. Receive strategic blueprints, technical insights, and digital trends.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (subscribed) setSubscribed(false);
                }}
                placeholder={subscribed ? "Thanks for subscribing!" : "your@email.com"}
                disabled={subscribed}
                className="w-full bg-[#0B2B30]/40 border border-[#143B41]/50 rounded-full py-3 pl-4 pr-12 text-xs text-white focus:outline-none focus:border-[#00ADD8] disabled:bg-[#071F22] disabled:text-[#00ADD8] disabled:border-[#00ADD8]/30 transition-all placeholder-gray-500 font-semibold"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="absolute right-1.5 top-1.5 p-2 bg-[#E71C84] hover:bg-[#f62693] text-white rounded-full transition-colors disabled:bg-transparent disabled:text-[#00ADD8] cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Middle Global Office Address Grid */}
        <div className="pt-10 border-t border-[#143B41]/30 space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#00ADD8] text-center md:text-left">
            Our Regional Locations &amp; HQ
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFICE_LOCATIONS.map((loc) => (
              <div
                key={loc.city}
                className="bg-[#0B2B30]/10 border border-[#143B41]/30 hover:border-[#00ADD8]/50 rounded-2xl p-4 space-y-2.5 transition-all group"
              >
                <div className="flex justify-between items-center">
                  <span className="font-display font-bold text-white group-hover:text-[#00ADD8] transition-colors">
                    {loc.city}
                  </span>
                  <span className="text-sm" title={loc.country}>
                    {loc.flag}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-gray-400 font-semibold">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 text-[#E71C84] flex-shrink-0" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#00ADD8] flex-shrink-0" />
                    <span className="font-mono">{loc.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 border-t border-[#143B41]/30 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Cosmonet AI. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-white hover:underline transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-white hover:underline transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#cookies" className="hover:text-white hover:underline transition-colors">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
