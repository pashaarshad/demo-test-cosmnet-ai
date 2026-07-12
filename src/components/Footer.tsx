/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Send, Github, Linkedin, Twitter } from "lucide-react";
import logoImg from "../assets/images/logo.png";
import logoTextImg from "../assets/images/logo_text.png";

interface FooterProps {
  onViewChange: (view: "home" | "careers" | "tech") => void;
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
          <div className="md:col-span-4 space-y-4">
            <div
              id="footer-logo"
              onClick={() => onViewChange("home")}
              className="flex items-center gap-2.5 cursor-pointer select-none w-fit group"
            >
              <img 
                src={logoImg} 
                alt="Cosmetic AI Logo" 
                className="w-14 h-14 md:w-20 md:h-20 object-contain group-hover:rotate-12 transition-transform duration-500 ease-out" 
                referrerPolicy="no-referrer" 
              />
              <img 
                src={logoTextImg} 
                alt="Cosmetic AI" 
                className="h-12 md:h-16 w-auto object-contain" 
                referrerPolicy="no-referrer" 
              />
              <span className="w-1.5 h-1.5 rounded-full bg-[#E71C84] shadow-[0_0_8px_#e71c84] group-hover:scale-125 transition-transform animate-pulse" />
            </div>
            
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Cosmetic AI is a technology and artificial intelligence solutions company focused on building AI-driven products, digital platforms, and intelligent automation systems for modern enterprises.
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
                  onClick={() => onViewChange("careers")}
                  className="hover:text-white hover:underline transition-all text-left text-gray-400 cursor-pointer font-semibold"
                >
                  Join Our AI Team
                </button>
              </li>
            </ul>
          </div>

          {/* Landing Pages Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#00ADD8]">Landing Page</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onViewChange("tech")}
                  className="hover:text-white hover:underline transition-all text-left text-gray-400 cursor-pointer font-semibold"
                >
                  Tech
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Input Block */}
          <div className="md:col-span-3 space-y-4">
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

        {/* Bottom Legal bar */}
        <div className="pt-8 border-t border-[#143B41]/30 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Cosmetic AI. All rights reserved.
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
