/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { SelectedRole } from "../types";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  preconfiguredTeam?: SelectedRole[];
  clearPreconfiguredTeam?: () => void;
}

export default function ContactDrawer({
  isOpen,
  onClose,
  preconfiguredTeam,
  clearPreconfiguredTeam
}: ContactDrawerProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    location: "San Francisco",
    urgency: "Immediate",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (clearPreconfiguredTeam) {
        clearPreconfiguredTeam();
      }
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      location: "San Francisco",
      urgency: "Immediate",
      message: ""
    });
    setSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="contact-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Sliding Panel */}
          <motion.div
            id="contact-drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-[#03090A] text-white shadow-2xl z-50 flex flex-col overflow-hidden border-l border-[#143B41]/50"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#143B41]/40 flex justify-between items-center bg-[#0B2B30]/30">
              <div>
                <h3 className="text-xl font-display font-black tracking-tight text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A36] animate-pulse"></span>
                  Request a Callback
                </h3>
                <p className="text-xs text-gray-400 mt-1 font-semibold">
                  Connect with a Cosmonet AI Technology Consultant globally
                </p>
              </div>
              <button
                id="close-drawer-btn"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#143B41]/50 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 font-semibold">
              {success ? (
                <motion.div
                  id="success-animation-container"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col justify-center items-center text-center p-8 space-y-4"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#FF5A36] blur-lg opacity-30 rounded-full animate-pulse" />
                    <CheckCircle className="w-16 h-16 text-[#00ADD8] relative z-10" />
                  </div>
                  <h4 className="text-2xl font-display font-black">Success!</h4>
                  <p className="text-sm text-gray-300 max-w-sm">
                    Thank you for reaching out. A specialized Cosmonet AI Consultant in our{" "}
                    <span className="text-[#00ADD8] font-bold">{formData.location}</span> node
                    will contact you within the next 2 working hours.
                  </p>

                  {preconfiguredTeam && preconfiguredTeam.length > 0 && (
                    <div className="bg-[#0B2B30]/30 p-4 rounded-xl border border-[#143B41]/60 w-full text-left mt-4 text-xs space-y-2">
                      <p className="font-bold text-gray-400">YOUR TEAM CONFIGURATION SAVED:</p>
                      {preconfiguredTeam.map(({ role, seniority, quantity }) => (
                        <div key={role.id} className="flex justify-between text-gray-300">
                          <span>{seniority} {role.title}</span>
                          <span className="font-mono text-[#00ADD8] font-bold">x{quantity}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    id="success-done-btn"
                    onClick={handleReset}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-[#FF5A36] to-[#00ADD8] text-white font-bold rounded-full hover:shadow-lg transition-shadow text-sm cursor-pointer"
                  >
                    Close & Return
                  </button>
                </motion.div>
              ) : (
                <form id="drawer-form" onSubmit={handleSubmit} className="space-y-4">
                  {/* Preconfigured Team Highlight Banner */}
                  {preconfiguredTeam && preconfiguredTeam.length > 0 && (
                    <div className="bg-[#0B2B30]/30 p-4 rounded-xl border-l-4 border-[#00ADD8] border-t border-r border-b border-[#143B41]/40 text-xs space-y-2">
                      <p className="font-bold text-[#00ADD8] uppercase tracking-wider">
                        Linked Squad Composition
                      </p>
                      <p className="text-gray-300 font-semibold">
                        We will attach this designed squad configuration to your consulting inquiry:
                      </p>
                      <div className="space-y-1 pl-2 border-l border-[#143B41]/50 mt-2">
                        {preconfiguredTeam.map(({ role, seniority, quantity }) => (
                          <div key={role.id} className="flex justify-between text-gray-300 font-semibold">
                            <span>• {seniority} {role.title}</span>
                            <span className="text-gray-400 font-bold">Qty: {quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className={`w-full bg-[#0B2B30]/40 border ${
                          errors.firstName ? "border-red-500" : "border-[#143B41]/60 hover:border-gray-500"
                        } focus:border-[#00ADD8] rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors text-white font-semibold`}
                        placeholder="Elena"
                      />
                      {errors.firstName && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className={`w-full bg-[#0B2B30]/40 border ${
                          errors.lastName ? "border-red-500" : "border-[#143B41]/60 hover:border-gray-500"
                        } focus:border-[#00ADD8] rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors text-white font-semibold`}
                        placeholder="Rostov"
                      />
                      {errors.lastName && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Work Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-[#0B2B30]/40 border ${
                        errors.email ? "border-red-500" : "border-[#143B41]/60 hover:border-gray-500"
                        } focus:border-[#00ADD8] rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors text-white font-semibold`}
                      placeholder="elena@company.com"
                    />
                    {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0B2B30]/40 border border-[#143B41]/60 hover:border-gray-500 focus:border-[#00ADD8] rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors text-white font-semibold"
                      placeholder="+1 (555) 987-6543"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Company Name *
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className={`w-full bg-[#0B2B30]/40 border ${
                        errors.companyName ? "border-red-500" : "border-[#143B41]/60 hover:border-gray-500"
                        } focus:border-[#00ADD8] rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors text-white font-semibold`}
                      placeholder="Cosmonet AI Active Labs"
                    />
                    {errors.companyName && (
                      <p className="text-[10px] text-red-500 mt-1">{errors.companyName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                        Nearest Regional Node
                      </label>
                      <select
                        id="office-location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full bg-[#0B2B30]/40 border border-[#143B41]/60 focus:border-[#00ADD8] rounded-xl px-4 py-3 text-sm focus:outline-none text-white appearance-none cursor-pointer font-semibold"
                      >
                        <option value="San Francisco">San Francisco HQ 🇺🇸</option>
                        <option value="London">London Office 🇬🇧</option>
                        <option value="Bangalore">Bangalore Office 🇮🇳</option>
                        <option value="Singapore">Singapore Office 🇸🇬</option>
                        <option value="Sydney">Sydney Office 🇦🇺</option>
                        <option value="Dubai">Dubai Office 🇦🇪</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                        Urgency Level
                      </label>
                      <select
                        id="urgency"
                        value={formData.urgency}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                        className="w-full bg-[#0B2B30]/40 border border-[#143B41]/60 focus:border-[#00ADD8] rounded-xl px-4 py-3 text-sm focus:outline-none text-white appearance-none cursor-pointer font-semibold"
                      >
                        <option value="Immediate">Immediate (&lt; 2 weeks)</option>
                        <option value="Planning">Planning (1-2 months)</option>
                        <option value="Advisory">Consultancy / Advisory Only</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Tell us what you need
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#0B2B30]/40 border border-[#143B41]/60 hover:border-gray-500 focus:border-[#00ADD8] rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors text-white resize-none font-semibold"
                      placeholder="Explain your product requirements or talent shortages..."
                    />
                  </div>

                  <div className="flex items-start gap-2.5 pt-2">
                    <input
                      id="opt-in"
                      type="checkbox"
                      defaultChecked
                      className="mt-1 accent-[#FF5A36] rounded focus:ring-0"
                    />
                    <p className="text-[11px] text-gray-400 leading-snug font-semibold">
                      I agree to receive communications from Cosmonet AI about specialized digital and AI insights.
                      Your data is handled securely under our global privacy frameworks.
                    </p>
                  </div>

                  <button
                    id="submit-callback-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 bg-gradient-to-r from-[#FF5A36] to-[#00ADD8] text-white py-3.5 px-6 rounded-full font-bold hover:shadow-lg hover:shadow-orange-500/15 transition-all text-sm flex justify-center items-center gap-2 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#00ADD8]" />
                        Validating inquiry...
                      </>
                    ) : (
                      <>
                        Request Free Callback
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
