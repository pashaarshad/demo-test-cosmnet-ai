/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { TEAM_ROLES } from "../data";
import { TeamRole, SelectedRole } from "../types";
import {
  Plus,
  Minus,
  Briefcase,
  Users,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Sparkles,
  ChevronRight,
  RefreshCw,
  Cpu,
  Trash2
} from "lucide-react";

interface CreateTeamViewProps {
  onTeamConfigured: (team: SelectedRole[]) => void;
}

export default function CreateTeamView({ onTeamConfigured }: CreateTeamViewProps) {
  const [selectedRoles, setSelectedRoles] = useState<SelectedRole[]>([]);
  const [contractType, setContractType] = useState<"Permanent" | "Contract">("Contract");
  const [location, setLocation] = useState("San Francisco");
  const [timeline, setTimeline] = useState("Immediate");
  const [customBrief, setCustomBrief] = useState("");

  const handleAddRole = (role: TeamRole) => {
    setSelectedRoles((prev) => {
      const exists = prev.find((item) => item.role.id === role.id);
      if (exists) {
        return prev.map((item) =>
          item.role.id === role.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { role, seniority: "Senior", quantity: 1 }];
      }
    });
  };

  const handleRemoveRole = (roleId: string) => {
    setSelectedRoles((prev) =>
      prev
        .map((item) =>
          item.role.id === roleId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleUpdateSeniority = (roleId: string, seniority: "Junior" | "Mid" | "Senior" | "Lead") => {
    setSelectedRoles((prev) =>
      prev.map((item) => (item.role.id === roleId ? { ...item, seniority } : item))
    );
  };

  const handleClearAll = () => {
    setSelectedRoles([]);
  };

  const getCurrencySymbol = () => {
    if (location === "London") return "£";
    if (location === "Bangalore") return "₹";
    if (location === "Sydney") return "A$";
    if (location === "Dubai") return "AED ";
    return "$";
  };

  const formatCurrency = (amount: number) => {
    const symbol = getCurrencySymbol();
    if (symbol === "₹") {
      // rough conversion from dollars to rupees
      return `${symbol}${(amount * 85).toLocaleString()}`;
    }
    if (symbol === "AED ") {
      return `${symbol}${(amount * 3.67).toLocaleString()}`;
    }
    if (symbol === "A$") {
      return `${symbol}${(amount * 1.5).toLocaleString()}`;
    }
    return `${symbol}${amount.toLocaleString()}`;
  };

  const calculateTotal = () => {
    return selectedRoles.reduce((acc, { role, seniority, quantity }) => {
      let rateModifier = 1;
      if (seniority === "Junior") rateModifier = 0.75;
      if (seniority === "Mid") rateModifier = 0.9;
      if (seniority === "Lead") rateModifier = 1.25;

      const rate = contractType === "Contract" ? role.baseRatePerDay : role.averagePermanentSalary;
      return acc + rate * rateModifier * quantity;
    }, 0);
  };

  const getSeniorityRates = (role: TeamRole) => {
    const base = contractType === "Contract" ? role.baseRatePerDay : role.averagePermanentSalary;
    return {
      Junior: Math.round(base * 0.75),
      Mid: Math.round(base * 0.9),
      Senior: Math.round(base),
      Lead: Math.round(base * 1.25)
    };
  };

  const getCandidateDensity = () => {
    if (selectedRoles.length === 0) return { score: 0, text: "Configure roles to evaluate pool", color: "text-gray-400" };
    const count = selectedRoles.reduce((sum, item) => sum + item.quantity, 0);
    if (count <= 2) return { score: 98, text: "Extremely High candidate density", color: "text-[#00ADD8]" };
    if (count <= 5) return { score: 88, text: "Excellent candidate density", color: "text-[#00ADD8]" };
    return { score: 72, text: "Moderate candidate density (requires active pooling)", color: "text-[#E71C84]" };
  };

  const density = getCandidateDensity();

  return (
    <div className="bg-[#03090A] min-h-screen text-white px-4 py-12 md:py-16">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#0B2B30]/50 border border-[#143B41]/80 rounded-full py-1.5 px-3.5 text-xs text-[#00ADD8] font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-[#E71C84] animate-pulse" />
            <span>AI-Driven Team Configuration Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight">
            Configure Your Custom Tech Squad
          </h1>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            Select the digital and AI disciplines required for your initiative. Adjust seniority levels and instantly calibrate estimated run-rate budgets, regional nodes, and matching engineer density.
          </p>
        </div>

        {/* Global Configuration Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-[#0B2B30]/30 border border-[#143B41]/50 rounded-2xl p-4">
          
          {/* Toggle contract/permanent */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-black tracking-wider text-gray-400">
              Engagement Format
            </span>
            <div className="grid grid-cols-2 bg-[#03090A] p-1 rounded-xl border border-[#143B41]/60">
              <button
                id="toggle-contract-btn"
                onClick={() => setContractType("Contract")}
                className={`py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                  contractType === "Contract"
                    ? "bg-[#00ADD8] text-[#03090A]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Contract
              </button>
              <button
                id="toggle-permanent-btn"
                onClick={() => setContractType("Permanent")}
                className={`py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                  contractType === "Permanent"
                    ? "bg-[#E71C84] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Permanent
              </button>
            </div>
          </div>

          {/* Location selector */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-black tracking-wider text-gray-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#E71C84]" />
              Primary Regional Node
            </span>
            <select
              id="team-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#03090A] border border-[#143B41]/60 focus:border-[#00ADD8] rounded-xl px-4 py-2 text-xs focus:outline-none text-white appearance-none cursor-pointer h-10 font-semibold"
            >
              <option value="San Francisco">San Francisco HQ 🇺🇸</option>
              <option value="London">London Office 🇬🇧</option>
              <option value="Bangalore">Bangalore Office 🇮🇳</option>
              <option value="Singapore">Singapore Office 🇸🇬</option>
              <option value="Sydney">Sydney Office 🇦🇺</option>
              <option value="Dubai">Dubai Office 🇦🇪</option>
            </select>
          </div>

          {/* Timeline Selector */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-black tracking-wider text-gray-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#00ADD8]" />
              Initiation Timeline
            </span>
            <select
              id="team-timeline"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full bg-[#03090A] border border-[#143B41]/60 focus:border-[#00ADD8] rounded-xl px-4 py-2 text-xs focus:outline-none text-white appearance-none cursor-pointer h-10 font-semibold"
            >
              <option value="Immediate">Immediate (&lt; 2 weeks)</option>
              <option value="NextMonth">Next 30 Days</option>
              <option value="Planning">In 2-3 Months (Planning)</option>
            </select>
          </div>

          {/* Action indicator info */}
          <div className="flex items-center gap-3 bg-[#03090A]/50 p-3 rounded-xl border border-[#143B41]/50">
            <TrendingUp className="w-5 h-5 text-[#00ADD8]" />
            <div>
              <p className="text-[10px] uppercase font-black tracking-wider text-gray-400">Hub Match Velocity</p>
              <p className="text-xs text-white font-bold">{timeline === "Immediate" ? "Fastest match route" : "Advisory planning route"}</p>
            </div>
          </div>

        </div>

        {/* Core Layout: Role Picker vs Team Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Role Selector Directory */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-display font-black flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-[#E71C84]" />
              Disciplines Catalog
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TEAM_ROLES.map((role) => {
                const selected = selectedRoles.find((sr) => sr.role.id === role.id);
                const rates = getSeniorityRates(role);

                return (
                  <div
                    key={role.id}
                    className={`bg-[#0B2B30]/10 border rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:border-[#00ADD8] transition-all group ${
                      selected ? "border-[#00ADD8]/80 bg-[#0B2B30]/30" : "border-[#143B41]/40"
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 rounded-full bg-[#03090A] border border-[#143B41]/50 text-[9px] font-bold uppercase tracking-wider text-gray-400">
                          {role.category}
                        </span>
                        {selected && (
                          <span className="text-xs font-bold text-[#00ADD8] bg-[#00ADD8]/10 px-2.5 py-0.5 rounded-full">
                            x{selected.quantity} Selected
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-display font-black text-white group-hover:text-[#00ADD8] transition-colors">
                        {role.title}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 font-semibold">
                        {role.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#143B41]/30 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-wider">
                          {contractType === "Contract" ? "Est. Day Rate:" : "Est. Salary:"}
                        </p>
                        <p className="text-xs font-mono font-bold text-white">
                          {contractType === "Contract"
                            ? `${formatCurrency(rates.Senior)}/day`
                            : `${formatCurrency(rates.Senior)}/year`}
                        </p>
                      </div>

                      <div className="flex gap-1.5">
                        {selected && (
                          <button
                            onClick={() => handleRemoveRole(role.id)}
                            className="p-1.5 rounded-lg bg-[#03090A] border border-[#143B41]/60 text-gray-400 hover:text-[#E71C84] hover:bg-[#143B41]/50 transition-all cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleAddRole(role)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#00ADD8] text-[#03090A] hover:bg-[#11beea] font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Custom Built Team Composition Canvas */}
          <div className="lg:col-span-5 bg-[#051517] border-2 border-[#143B41]/50 rounded-[28px] p-6 space-y-6 shadow-2xl relative sticky top-24">
            <div className="flex justify-between items-center border-b border-[#143B41]/40 pb-4">
              <div>
                <h3 className="text-md font-display font-black text-white flex items-center gap-2 uppercase tracking-wider">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00ADD8] animate-pulse" />
                  Squad Configurator
                </h3>
                <p className="text-[10px] text-gray-400 mt-0.5 font-semibold">
                  Calibrating team for {location}
                </p>
              </div>
              {selectedRoles.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-xs text-gray-400 hover:text-[#E71C84] flex items-center gap-1 transition-all cursor-pointer font-bold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {selectedRoles.length === 0 ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full border border-dashed border-[#143B41] flex items-center justify-center mx-auto text-gray-500">
                  <Users className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-400">Your custom squad is empty</p>
                  <p className="text-[11px] text-gray-500 max-w-xs mx-auto">
                    Select roles from the catalog on the left to calibrate rates, skillsets, and availability.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Selected Roles List */}
                <div className="space-y-3.5 max-h-[280px] overflow-y-auto pr-1">
                  {selectedRoles.map(({ role, seniority, quantity }) => {
                    const rates = getSeniorityRates(role);
                    let displayRate = rates[seniority];

                    return (
                      <div
                        key={role.id}
                        className="bg-[#0B2B30]/30 border border-[#143B41]/80 rounded-xl p-3.5 space-y-3.5"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-xs font-bold text-white">{role.title}</h4>
                            <p className="text-[10px] text-gray-400 font-mono">
                              Rate:{" "}
                              {contractType === "Contract"
                                ? `${formatCurrency(displayRate)}/day`
                                : `${formatCurrency(displayRate)}/year`}
                            </p>
                          </div>
                          
                          {/* Counter adjustments */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleRemoveRole(role.id)}
                              className="p-1 rounded bg-[#03090A] border border-[#143B41]/50 hover:bg-[#143B41] text-gray-400 hover:text-white cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-bold text-white">{quantity}</span>
                            <button
                              onClick={() => handleAddRole(role)}
                              className="p-1 rounded bg-[#03090A] border border-[#143B41]/50 hover:bg-[#143B41] text-gray-400 hover:text-white cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Seniority select controllers */}
                        <div className="grid grid-cols-4 gap-1 p-0.5 bg-[#03090A] rounded-lg border border-[#143B41]/50">
                          {(["Junior", "Mid", "Senior", "Lead"] as const).map((level) => (
                            <button
                              key={level}
                              onClick={() => handleUpdateSeniority(role.id, level)}
                              className={`py-1 text-[9px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer ${
                                seniority === level
                                  ? contractType === "Contract"
                                    ? "bg-[#00ADD8] text-[#03090A]"
                                    : "bg-[#E71C84] text-white"
                                  : "text-gray-500 hover:text-gray-300"
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Density Meter */}
                <div className="bg-[#0B2B30]/30 p-3.5 rounded-2xl border border-[#143B41]/60 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-bold">Cosmonet AI Candidate Density:</span>
                    <span className={`font-bold ${density.color}`}>{density.score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#03090A] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#E71C84] to-[#00ADD8] rounded-full transition-all duration-500"
                      style={{ width: `${density.score}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 font-semibold leading-snug">{density.text}</p>
                </div>

                {/* Summary calculation box */}
                <div className="bg-[#0B2B30]/60 p-4 rounded-2xl border border-[#143B41]/80 space-y-3">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-xs text-gray-400 font-bold">Estimated Run-rate:</span>
                    <span className="text-lg font-mono font-bold text-white">
                      {contractType === "Contract"
                        ? `${formatCurrency(calculateTotal())}/day`
                        : `${formatCurrency(calculateTotal())}/year`}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">
                    *Estimates are calculated based on benchmark regional contractor rates in{" "}
                    <span className="text-white font-bold">{location}</span>.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    id="submit-squad-btn"
                    onClick={() => onTeamConfigured(selectedRoles)}
                    className="w-full py-4 bg-[#E71C84] hover:bg-[#f62693] text-white font-bold rounded-full hover:shadow-lg hover:shadow-pink-500/20 transition-all text-xs uppercase tracking-widest text-center flex justify-center items-center gap-2 cursor-pointer"
                  >
                    Propose Squad Configuration
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
