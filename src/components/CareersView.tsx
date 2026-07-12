/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { JOBS } from "../data";
import { Job } from "../types";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  ArrowRight,
  Upload,
  X,
  CheckCircle,
  FileText,
  Building,
  Loader2,
  Bookmark
} from "lucide-react";

export default function CareersView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeType, setActiveType] = useState<string>("All");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Apply workflow state
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [applicantForm, setApplicantForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ["All", "Technology", "Creative", "Marketing", "Sales"];

  const filteredJobs = JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = activeCategory === "All" || job.department === activeCategory;
    const matchesType = activeType === "All" || job.type === activeType;

    return matchesSearch && matchesCategory && matchesType;
  });

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleManualFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    // Only accept PDF/DOCX
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (extension !== "pdf" && extension !== "docx" && extension !== "doc") {
      alert("Please upload a PDF or Microsoft Word document");
      return;
    }

    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantForm.name || !applicantForm.email || !uploadedFile) return;

    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleCloseApply = () => {
    setApplyModalOpen(false);
    setUploadedFile(null);
    setUploadProgress(0);
    setIsSuccess(false);
    setApplicantForm({ name: "", email: "", phone: "" });
  };

  return (
    <div className="bg-[#03090A] min-h-screen text-white px-4 py-12 md:py-16">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 bg-[#00ADD8]/10 text-[#00ADD8] border border-[#00ADD8]/20 rounded-full text-xs font-bold uppercase tracking-wider">
            Cosmetic AI Careers Center
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight">
            Find Your Next Future
          </h1>
          <p className="text-sm text-gray-300 font-semibold leading-relaxed">
            Browse our verified, high-quality permanent and contract digital opportunities across 
            global technology hubs. Apply instantly with your resume.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-[#0B2B30]/30 border border-[#143B41]/55 rounded-[24px] p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="job-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jobs, tech stacks, or departments (e.g. AI, React...)"
                className="w-full bg-[#03090A] border border-[#143B41]/60 focus:border-[#00ADD8] rounded-xl pl-11 pr-4 py-3 text-xs text-white focus:outline-none transition-colors font-semibold"
              />
            </div>

            {/* Department dropdown */}
            <div className="md:col-span-3">
              <select
                id="job-category-filter"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full h-full bg-[#03090A] border border-[#143B41]/60 focus:border-[#00ADD8] rounded-xl px-4 py-3 text-xs text-white focus:outline-none appearance-none cursor-pointer font-semibold"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Departments" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Employment Type Selector */}
            <div className="md:col-span-3">
              <select
                id="job-type-filter"
                value={activeType}
                onChange={(e) => setActiveType(e.target.value)}
                className="w-full h-full bg-[#03090A] border border-[#143B41]/60 focus:border-[#00ADD8] rounded-xl px-4 py-3 text-xs text-white focus:outline-none appearance-none cursor-pointer font-semibold"
              >
                <option value="All">All Formats (Perm &amp; Contract)</option>
                <option value="Permanent">Permanent Placement</option>
                <option value="Contract">Contract / Freelance</option>
              </select>
            </div>

          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center text-xs text-gray-400 font-semibold">
          <p>
            Showing <span className="text-[#00ADD8] font-bold">{filteredJobs.length}</span> matching opportunities
          </p>
          <p className="hidden md:block">Updated live every 10 minutes</p>
        </div>

        {/* Main Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className="bg-[#0B2B30]/10 border border-[#143B41]/40 rounded-2xl p-5 hover:border-[#00ADD8] transition-all cursor-pointer flex flex-col justify-between hover:shadow-xl group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#03090A] border border-[#143B41]/60 text-[9px] font-bold uppercase tracking-wider text-[#00ADD8]">
                    {job.type}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono font-bold">{job.postedDate}</span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-display font-black text-white group-hover:text-[#00ADD8] transition-colors line-clamp-1">
                    {job.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 flex items-center gap-1 font-semibold">
                    <Building className="w-3 h-3" />
                    {job.companyName}
                  </p>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 font-semibold">
                  {job.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#143B41]/30 flex justify-between items-center">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
                    <MapPin className="w-3 h-3 text-[#FF5A36]" />
                    {job.location}
                  </div>
                  <p className="text-xs font-bold text-white font-mono">{job.salary.split(" per")[0]}</p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedJob(job);
                  }}
                  className="p-2.5 rounded-full bg-[#0B2B30] text-[#00ADD8] hover:bg-[#FF5A36] hover:text-white transition-all cursor-pointer border border-[#143B41]/50"
                  aria-label="View Job details"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <p className="text-sm text-gray-400 font-semibold">No jobs match your search tags.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
                setActiveType("All");
              }}
              className="text-xs text-[#00ADD8] hover:underline cursor-pointer font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* JOB DETAIL OVERLAY MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#03090A] border border-[#143B41]/80 rounded-[24px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
            
            {/* Header */}
            <div className="p-6 border-b border-[#143B41]/40 bg-[#0B2B30]/30 flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#03090A] border border-[#143B41]/60 text-[9px] font-bold text-[#00ADD8] uppercase tracking-wider">
                    {selectedJob.type}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">{selectedJob.postedDate}</span>
                </div>
                <h3 className="text-lg md:text-xl font-display font-black text-white">
                  {selectedJob.title}
                </h3>
                <p className="text-xs text-[#00ADD8] flex items-center gap-1 font-bold">
                  <Building className="w-3.5 h-3.5" />
                  {selectedJob.companyName} • {selectedJob.location}
                </p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 rounded-full hover:bg-[#143B41] text-gray-400 hover:text-white transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 overflow-y-auto font-semibold">
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Role Description</h4>
                <p className="text-xs text-gray-300 leading-relaxed">{selectedJob.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Target Requirements</h4>
                <ul className="space-y-1.5 pl-4 list-disc text-xs text-gray-300 leading-relaxed">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Compensation &amp; Benefits</h4>
                <ul className="space-y-1.5 pl-4 list-disc text-xs text-gray-300 leading-relaxed">
                  <li>Salary: {selectedJob.salary}</li>
                  {selectedJob.benefits.map((ben, index) => (
                    <li key={index}>{ben}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="p-6 border-t border-[#143B41]/30 bg-[#051517] flex justify-between gap-4">
              <button
                onClick={() => alert("Job Saved to your Cosmetic AI profile!")}
                className="px-5 py-3 border border-white/20 hover:border-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer text-gray-300 hover:text-white transition-colors"
              >
                <Bookmark className="w-4 h-4 text-[#00ADD8]" />
                Save Job
              </button>

              <button
                id="apply-job-btn"
                onClick={() => setApplyModalOpen(true)}
                className="flex-1 bg-gradient-to-r from-[#FF5A36] to-[#00ADD8] text-white py-3 px-6 rounded-full text-xs font-bold uppercase tracking-widest text-center flex justify-center items-center gap-2 cursor-pointer"
              >
                Quick Apply Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* QUICK APPLY DIALOG MODAL (Includes drag-and-drop file upload) */}
      {applyModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black/95 z-55 flex items-center justify-center p-4">
          <div className="bg-[#03090A] border border-[#143B41]/80 rounded-[24px] w-full max-w-lg overflow-hidden shadow-2xl flex flex-col justify-between">
            
            {/* Header */}
            <div className="p-6 border-b border-[#143B41]/40 bg-[#0B2B30]/30 flex justify-between items-center">
              <div>
                <h3 className="text-md font-display font-black text-white">
                  Quick Apply
                </h3>
                <p className="text-[10px] text-gray-400 mt-0.5 font-semibold">
                  Applying for {selectedJob.title}
                </p>
              </div>
              <button
                onClick={handleCloseApply}
                className="p-2 rounded-full hover:bg-[#143B41] text-gray-400 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleApplySubmit} className="p-6 space-y-4">
              {isSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#FF5A36] blur-md opacity-25 rounded-full" />
                    <CheckCircle className="w-14 h-14 text-[#00ADD8] mx-auto relative z-10 animate-bounce" />
                  </div>
                  <h4 className="text-xl font-display font-black">Application Transmitted!</h4>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed font-semibold">
                    Thank you. Your resume and application metrics have been successfully routed to our{" "}
                    <span className="text-[#00ADD8] font-bold">Talent Sourcing</span> department.
                  </p>
                  <button
                    type="button"
                    onClick={handleCloseApply}
                    className="px-6 py-2 bg-[#0B2B30] hover:bg-[#143B41] text-xs font-bold rounded-full uppercase tracking-wider cursor-pointer"
                  >
                    Close Dialog
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Full Name *
                    </label>
                    <input
                      id="apply-fullname"
                      type="text"
                      required
                      value={applicantForm.name}
                      onChange={(e) => setApplicantForm({ ...applicantForm, name: e.target.value })}
                      className="w-full bg-[#0B2B30]/40 border border-[#143B41]/50 focus:border-[#00ADD8] rounded-xl px-4 py-2.5 text-xs focus:outline-none text-white font-semibold"
                      placeholder="Elena Rostov"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Email Address *
                    </label>
                    <input
                      id="apply-email"
                      type="email"
                      required
                      value={applicantForm.email}
                      onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                      className="w-full bg-[#0B2B30]/40 border border-[#143B41]/50 focus:border-[#00ADD8] rounded-xl px-4 py-2.5 text-xs focus:outline-none text-white font-semibold"
                      placeholder="elena@company.com"
                    />
                  </div>

                  {/* Drag & Drop File Upload Area */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 font-semibold">
                      Attach CV / Resume * (PDF, DOCX)
                    </label>

                    {uploadedFile ? (
                      <div className="bg-[#0B2B30]/50 border border-[#143B41]/65 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-[#00ADD8]" />
                          <div>
                            <p className="text-xs font-bold text-white max-w-[200px] truncate">
                              {uploadedFile.name}
                            </p>
                            <p className="text-[10px] text-gray-500 font-mono">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>

                        {isUploading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-[#00ADD8]" />
                            <span className="text-[10px] font-mono text-[#00ADD8]">{uploadProgress}%</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setUploadedFile(null)}
                            className="p-1 rounded bg-[#03090A] hover:bg-[#143B41] text-gray-400 hover:text-[#FF5A36] cursor-pointer"
                            aria-label="Remove attached file"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ) : (
                      <div
                        id="dropzone"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                          isDragging
                            ? "border-[#00ADD8] bg-[#00ADD8]/5"
                            : "border-[#143B41] bg-[#0B2B30]/20 hover:border-gray-500"
                        }`}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleManualFileSelect}
                          accept=".pdf,.docx,.doc"
                          className="hidden"
                        />
                        <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2 animate-bounce" />
                        <p className="text-xs font-bold text-white">Drag and drop file here</p>
                        <p className="text-[10px] text-gray-500 mt-1">or click to browse from directory</p>
                        <p className="text-[9px] text-gray-600 mt-2">Max scale: 5MB • Formats: PDF, DOCX</p>
                      </div>
                    )}
                  </div>

                  {/* Submission row */}
                  <div className="pt-4 border-t border-[#143B41]/40 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setApplyModalOpen(false)}
                      className="px-5 py-3 border border-white/15 rounded-full text-xs font-bold uppercase tracking-wider hover:border-white transition-all text-gray-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!applicantForm.name || !applicantForm.email || !uploadedFile || isUploading}
                      className="flex-1 bg-[#FF5A36] hover:bg-[#FF7352] text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest text-center flex justify-center items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Submit Application
                    </button>
                  </div>
                </>
              )}
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
