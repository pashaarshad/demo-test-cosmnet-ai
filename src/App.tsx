/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import HrView from "./components/HrView";
import TechView from "./components/TechView";
import AiView from "./components/AiView";
import ContactDrawer from "./components/ContactDrawer";
import { SelectedRole } from "./types";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Initialize view state based on the current window pathname on page load
  const [currentView, setCurrentView] = useState<"home" | "hr" | "tech" | "ai">(() => {
    const path = window.location.pathname.toLowerCase().replace(/\/$/, "");
    if (path === "/tech" || path === "/tech.html") {
      return "tech";
    }
    if (path === "/hr" || path === "/hr.html") {
      return "hr";
    }
    if (path === "/ai" || path === "/ai.html") {
      return "ai";
    }
    return "home";
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [preconfiguredTeam, setPreconfiguredTeam] = useState<SelectedRole[]>([]);

  // Keep path and browser history in perfect sync when currentView changes
  const handleViewChange = (view: "home" | "hr" | "tech" | "ai") => {
    setCurrentView(view);
    const targetPath = view === "home" ? "/" : `/${view}`;
    if (window.location.pathname !== targetPath && window.location.pathname !== `${targetPath}.html`) {
      window.history.pushState(null, "", targetPath);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Synchronize component state if the user navigates via browser Back/Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, "");
      if (path === "/tech" || path === "/tech.html") {
        setCurrentView("tech");
      } else if (path === "/hr" || path === "/hr.html") {
        setCurrentView("hr");
      } else if (path === "/ai" || path === "/ai.html") {
        setCurrentView("ai");
      } else {
        setCurrentView("home");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleTeamConfigured = (team: SelectedRole[]) => {
    setPreconfiguredTeam(team);
    setDrawerOpen(true);
  };

  const clearPreconfiguredTeam = () => {
    setPreconfiguredTeam([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#03090A] font-sans antialiased selection:bg-[#FF5A36] selection:text-white">
      {/* Sticky global navigation header */}
      <Header
        currentView={currentView}
        onViewChange={handleViewChange}
        onRequestCallback={handleOpenDrawer}
      />

      {/* Main content router stage with smooth slide-fade transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentView === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <HomeView
                onViewChange={handleViewChange}
                onRequestCallback={handleOpenDrawer}
              />
            </motion.div>
          )}

          {currentView === "hr" && (
            <motion.div
              key="hr"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <HrView onRequestCallback={handleOpenDrawer} />
            </motion.div>
          )}

          {currentView === "tech" && (
            <motion.div
              key="tech"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <TechView
                onRequestCallback={handleOpenDrawer}
              />
            </motion.div>
          )}

          {currentView === "ai" && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <AiView
                onRequestCallback={handleOpenDrawer}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent global footer */}
      <Footer
        onViewChange={handleViewChange}
        currentView={currentView}
      />

      {/* Slidable right-side inquiry drawer popover */}
      <ContactDrawer
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
        preconfiguredTeam={preconfiguredTeam}
        clearPreconfiguredTeam={clearPreconfiguredTeam}
      />
    </div>
  );
}
