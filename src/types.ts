import type { LucideIcon } from "lucide-react";

export type TabId = "dashboard" | "marketplace" | "earn" | "teach" | "wallet";

export type NavItem = {
  id: TabId;
  label: string;
  icon: LucideIcon;
};

export type AuthMode = "login" | "register";

export type AppPhase = "loading" | "onboarding" | "auth" | "app";

export type AuthProfile = {
  name: string;
  email: string;
};

export type Skill = {
  id: string;
  title: string;
  category: string;
  teacher: string;
  rating: number;
  duration: string;
  credits: number;
  format: "Live" | "Async" | "Hybrid";
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  outcomes: string[];
  nextSlot: string;
};

export type SkillListingInput = {
  title: string;
  category: string;
  credits: number;
  format: Skill["format"];
  level: Skill["level"];
  description: string;
};

export type EarnTask = {
  id: string;
  title: string;
  category: string;
  credits: number;
  effort: string;
};

export type Transaction = {
  id: string;
  title: string;
  type: "earned" | "spent";
  amount: number;
  time: string;
};
