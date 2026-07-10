/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import CreateTeamView from "./components/CreateTeamView";
import CareersView from "./components/CareersView";
import ContactDrawer from "./components/ContactDrawer";
import { SelectedRole } from "./types";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "create-team" | "careers">("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [preconfiguredTeam, setPreconfiguredTeam] = useState<SelectedRole[]>([]);

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
    <div className="flex flex-col min-h-screen bg-[#03090A] font-sans antialiased selection:bg-[#E71C84] selection:text-white">
      {/* Sticky global navigation header */}
      <Header
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
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
                onViewChange={(view) => {
                  setCurrentView(view);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onRequestCallback={handleOpenDrawer}
              />
            </motion.div>
          )}

          {currentView === "create-team" && (
            <motion.div
              key="create-team"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <CreateTeamView onTeamConfigured={handleTeamConfigured} />
            </motion.div>
          )}

          {currentView === "careers" && (
            <motion.div
              key="careers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <CareersView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent global footer */}
      <Footer
        onViewChange={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
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
