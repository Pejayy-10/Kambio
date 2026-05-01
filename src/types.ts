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

export type DeliveryType =
  | "Async Help"
  | "Video Call"
  | "Face-to-Face"
  | "Mini Course";

export type ProgressStatus =
  | "Requested"
  | "Accepted"
  | "In Progress"
  | "Submitted Work"
  | "Completed"
  | "Rated";

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
  deliveryType: DeliveryType;
  deliverySummary: string;
  trackingSteps: ProgressStatus[];
  rewardNote: string;
};

export type SkillListingInput = {
  title: string;
  category: string;
  credits: number;
  deliveryType: DeliveryType;
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

export type RewardStat = {
  id: string;
  label: string;
  value: string;
  description: string;
};

export type LearningProgress = {
  id: string;
  skillTitle: string;
  teacher: string;
  deliveryType: DeliveryType;
  status: ProgressStatus;
  progress: number;
  nextAction: string;
};

export type TeachingRequest = {
  id: string;
  learner: string;
  skillTitle: string;
  deliveryType: DeliveryType;
  status: ProgressStatus;
  rewardPreview: string;
  requestedAt: string;
};
