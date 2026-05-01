import type {
  EarnTask,
  LearningProgress,
  RewardStat,
  Skill,
  TeachingRequest,
  Transaction,
} from "../types";

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
    deliveryType: "Async Help",
    deliverySummary:
      "Learner uploads a screen or Figma link, then receives structured written feedback within the day.",
    trackingSteps: ["Requested", "Submitted Work", "Completed", "Rated"],
    rewardNote: "Earn credits, a critique badge, and visible portfolio proof.",
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
    deliveryType: "Video Call",
    deliverySummary:
      "A scheduled live tutoring call with shared-screen walkthrough and a short practice file.",
    trackingSteps: ["Requested", "Accepted", "In Progress", "Completed", "Rated"],
    rewardNote: "Earn credits, reputation, and fast-responder progress.",
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
    deliveryType: "Face-to-Face",
    deliverySummary:
      "Meet on campus or in a shared community space for live practice and peer feedback.",
    trackingSteps: ["Requested", "Accepted", "In Progress", "Completed", "Rated"],
    rewardNote: "Earn credits, mentor reputation, and teaching history.",
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

export const rewardStats: RewardStat[] = [
  {
    id: "reward-credits",
    label: "Credits",
    value: "42",
    description: "Spendable balance earned from tasks and teaching.",
  },
  {
    id: "reward-reputation",
    label: "Reputation",
    value: "4.8",
    description: "Trust score from completed learner feedback.",
  },
  {
    id: "reward-badges",
    label: "Badges",
    value: "3",
    description: "Recognition for helpful, reliable contributions.",
  },
];

export const learningProgress: LearningProgress[] = [
  {
    id: "progress-excel",
    skillTitle: "Excel formulas for reports",
    teacher: "Ken Tan",
    deliveryType: "Video Call",
    status: "Accepted",
    progress: 40,
    nextAction: "Join call tomorrow at 4:00 PM",
  },
  {
    id: "progress-portfolio",
    skillTitle: "Portfolio review",
    teacher: "Nina Cruz",
    deliveryType: "Async Help",
    status: "Submitted Work",
    progress: 70,
    nextAction: "Waiting for feedback notes",
  },
];

export const teachingRequests: TeachingRequest[] = [
  {
    id: "request-branding",
    learner: "Jio Santos",
    skillTitle: "Brand moodboard feedback",
    deliveryType: "Async Help",
    status: "Requested",
    rewardPreview: "+10 credits / reputation / portfolio proof",
    requestedAt: "12 min ago",
  },
  {
    id: "request-slides",
    learner: "Rae Lim",
    skillTitle: "Presentation slide cleanup",
    deliveryType: "Video Call",
    status: "Accepted",
    rewardPreview: "+14 credits / helpful mentor badge progress",
    requestedAt: "Today",
  },
];
