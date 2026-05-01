import type { EarnTask, Skill, Transaction } from "../types";

export const currentUser = {
  name: "Mika",
  role: "Design student",
  credits: 42,
  learning: 3,
  teaching: 2,
  completed: 18,
};

export const featuredSkills: Skill[] = [
  {
    id: "skill-ui-critique",
    title: "Mobile UI critique",
    category: "Design",
    teacher: "Ana Reyes",
    rating: 4.9,
    duration: "30 min",
    credits: 12,
    format: "Async",
    level: "Intermediate",
    description:
      "Get a structured critique of a mobile screen, with notes on spacing, hierarchy, and interaction clarity.",
    outcomes: [
      "Identify layout issues",
      "Improve visual hierarchy",
      "Receive prioritized action notes",
    ],
    nextSlot: "Available today",
  },
  {
    id: "skill-excel",
    title: "Excel formulas for reports",
    category: "Productivity",
    teacher: "Ken Tan",
    rating: 4.8,
    duration: "45 min",
    credits: 16,
    format: "Live",
    level: "Beginner",
    description:
      "Learn practical spreadsheet formulas for class reports, trackers, and quick analysis work.",
    outcomes: [
      "Use lookup formulas",
      "Clean repeated data",
      "Build a simple report table",
    ],
    nextSlot: "Tomorrow, 4:00 PM",
  },
  {
    id: "skill-speaking",
    title: "Presentation delivery practice",
    category: "Communication",
    teacher: "Lea Santos",
    rating: 4.7,
    duration: "25 min",
    credits: 10,
    format: "Hybrid",
    level: "Beginner",
    description:
      "Practice a short presentation and receive focused feedback on pacing, structure, and delivery.",
    outcomes: [
      "Refine opening remarks",
      "Improve delivery pacing",
      "Get confidence notes",
    ],
    nextSlot: "Friday, 2:30 PM",
  },
];

export const earnTasks: EarnTask[] = [
  {
    id: "task-proofread",
    title: "Proofread a project abstract",
    category: "Writing",
    credits: 6,
    effort: "10 min",
  },
  {
    id: "task-feedback",
    title: "Give feedback on a poster layout",
    category: "Design",
    credits: 8,
    effort: "15 min",
  },
  {
    id: "task-resource",
    title: "Share useful study resources",
    category: "Community",
    credits: 5,
    effort: "8 min",
  },
];

export const recentTransactions: Transaction[] = [
  {
    id: "txn-earned-1",
    title: "Poster layout feedback",
    type: "earned",
    amount: 8,
    time: "Today",
  },
  {
    id: "txn-spent-1",
    title: "Excel formulas session",
    type: "spent",
    amount: 16,
    time: "Yesterday",
  },
  {
    id: "txn-earned-2",
    title: "Portfolio review",
    type: "earned",
    amount: 12,
    time: "Apr 29",
  },
];
