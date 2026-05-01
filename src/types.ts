import type { LucideIcon } from "lucide-react";

export type TabId = "dashboard" | "marketplace" | "earn" | "teach" | "wallet";

export type NavItem = {
  id: TabId;
  label: string;
  icon: LucideIcon;
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
