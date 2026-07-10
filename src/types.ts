/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TeamRole {
  id: string;
  title: string;
  category: "Technology" | "Creative" | "Marketing" | "Sales";
  description: string;
  skills: string[];
  baseRatePerDay: number;
  averagePermanentSalary: number;
}

export interface SelectedRole {
  role: TeamRole;
  seniority: "Junior" | "Mid" | "Senior" | "Lead";
  quantity: number;
}

export interface Job {
  id: string;
  title: string;
  department: "Technology" | "Creative" | "Marketing" | "Sales";
  location: string;
  type: "Permanent" | "Contract";
  salary: string;
  postedDate: string;
  companyName: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface Article {
  id: string;
  title: string;
  category: "Future of Work" | "Leadership" | "Discipline Deep Dives" | "Hiring Advice" | "Expert Insights";
  date: string;
  readTime: string;
  image: string;
  summary: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

export interface OfficeLocation {
  city: string;
  country: string;
  region: "Europe" | "Americas" | "Asia Pacific" | "Middle East & Africa";
  flag: string;
  address: string;
  phone: string;
}
