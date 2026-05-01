import { useEffect, useState } from "react";
import AppShell from "./components/AppShell";
import {
  currentUser,
  earnTasks,
  featuredSkills,
  learningProgress,
  recentTransactions,
  rewardStats,
  teachingRequests,
  userTeachingQuests,
} from "./data/mockData";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import EarnPage from "./pages/EarnPage";
import LoadingPage from "./pages/LoadingPage";
import MarketplacePage from "./pages/MarketplacePage";
import OnboardingPage from "./pages/OnboardingPage";
import ProfilePage from "./pages/ProfilePage";
import SkillDetailPage from "./pages/SkillDetailPage";
import TeachPage from "./pages/TeachPage";
import WalletPage from "./pages/WalletPage";
import type {
  AppPhase,
  AuthProfile,
  DeliveryType,
  EarnTask,
  LearningProgress,
  Skill,
  SkillListingInput,
  TabId,
  TeachingRequest,
  Transaction,
} from "./types";

const pageMeta: Omit<Record<TabId, { title: string; subtitle: string }>, "dashboard"> = {
  marketplace: {
    title: "Find skills",
    subtitle: "Spend credits with trusted peers",
  },
  earn: {
    title: "Earn credits",
    subtitle: "Complete useful community tasks",
  },
  teach: {
    title: "Teach",
    subtitle: "Share what you can help with",
  },
  wallet: {
    title: "Wallet",
    subtitle: "Track your credit movement",
  },
  profile: {
    title: "Profile",
    subtitle: "Ratings, badges, and rank",
  },
};

const formatByDeliveryType: Record<DeliveryType, Skill["format"]> = {
  "Async Help": "Async",
  "Video Call": "Live",
  "Face-to-Face": "Live",
  "Mini Course": "Hybrid",
};

function App() {
  const [phase, setPhase] = useState<AppPhase>("loading");
  const [profile, setProfile] = useState<AuthProfile>({
    name: currentUser.name,
    email: "mika@kambio.demo",
  });
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [credits, setCredits] = useState(currentUser.credits);
  const [skills, setSkills] = useState<Skill[]>([
    ...userTeachingQuests,
    ...featuredSkills,
  ]);
  const [openedQuests, setOpenedQuests] =
    useState<Skill[]>(userTeachingQuests);
  const [learningCount, setLearningCount] = useState(currentUser.learning);
  const [teachingCount, setTeachingCount] = useState(currentUser.teaching);
  const [completedCount, setCompletedCount] = useState(currentUser.completed);
  const [progressItems, setProgressItems] =
    useState<LearningProgress[]>(learningProgress);
  const [incomingRequests, setIncomingRequests] =
    useState<TeachingRequest[]>(teachingRequests);
  const [transactions, setTransactions] =
    useState<Transaction[]>(recentTransactions);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [requestedSkillIds, setRequestedSkillIds] = useState<string[]>([]);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [requestMessage, setRequestMessage] = useState<string | null>(null);
  const dashboardMeta = {
    title: `Hi, ${profile.name}`,
    subtitle: "Your skill exchange overview",
  };
  const visibleRewards = rewardStats.map((reward) =>
    reward.id === "reward-credits"
      ? {
          ...reward,
          value: credits.toString(),
        }
      : reward,
  );
  const meta =
    activeTab === "marketplace" && selectedSkill
      ? {
          title: "Skill detail",
          subtitle: "Review before spending credits",
        }
      : activeTab === "dashboard"
        ? dashboardMeta
        : pageMeta[activeTab];

  useEffect(() => {
    if (phase !== "loading") {
      return;
    }

    const timer = window.setTimeout(() => {
      setPhase("onboarding");
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [phase]);

  const handleAuthSubmit = (authProfile: AuthProfile) => {
    setProfile(authProfile);
    setPhase("app");
  };

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    setRequestMessage(null);

    if (tabId !== "marketplace") {
      setSelectedSkill(null);
    }
  };

  const handleSelectSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setRequestMessage(null);
  };

  const handleRequestSkill = (skill: Skill) => {
    if (requestedSkillIds.includes(skill.id)) {
      return;
    }

    if (credits < skill.credits) {
      setRequestMessage("You need more credits before requesting this skill.");
      return;
    }

    const transaction: Transaction = {
      id: `txn-spent-${skill.id}-${Date.now()}`,
      title: `${skill.title} request`,
      type: "spent",
      amount: skill.credits,
      time: "Just now",
    };

    setCredits((currentCredits) => currentCredits - skill.credits);
    setLearningCount((currentLearning) => currentLearning + 1);
    setTransactions((currentTransactions) => [
      transaction,
      ...currentTransactions,
    ]);
    setRequestedSkillIds((currentIds) => [...currentIds, skill.id]);
    setProgressItems((currentItems) => [
      {
        id: `progress-${skill.id}-${Date.now()}`,
        skillTitle: skill.title,
        teacher: skill.teacher,
        deliveryType: skill.deliveryType,
        status: "Requested",
        progress: 15,
        nextAction: "Waiting for teacher confirmation",
      },
      ...currentItems,
    ]);
    setRequestMessage("Request sent. Credits were deducted for this session.");
  };

  const handleCompleteTask = (task: EarnTask) => {
    if (completedTaskIds.includes(task.id)) {
      return;
    }

    const transaction: Transaction = {
      id: `txn-earned-${task.id}-${Date.now()}`,
      title: task.title,
      type: "earned",
      amount: task.credits,
      time: "Just now",
    };

    setCredits((currentCredits) => currentCredits + task.credits);
    setCompletedCount((currentCompleted) => currentCompleted + 1);
    setCompletedTaskIds((currentIds) => [...currentIds, task.id]);
    setTransactions((currentTransactions) => [
      transaction,
      ...currentTransactions,
    ]);
  };

  const handleAddSkill = (listing: SkillListingInput) => {
    const newSkill: Skill = {
      id: `skill-demo-${Date.now()}`,
      title: listing.title,
      category: listing.category,
      teacher: profile.name,
      rating: 5,
      duration: "30 min",
      credits: listing.credits,
      format: formatByDeliveryType[listing.deliveryType],
      level: listing.level,
      description: listing.description,
      outcomes: [
        "Get peer support from a new listing",
        "Use credits without direct barter",
        "Continue the exchange asynchronously",
      ],
      nextSlot: "New demo listing",
      deliveryType: listing.deliveryType,
      deliverySummary:
        listing.deliveryType === "Mini Course"
          ? "A compact course-style listing with lessons, checkpoints, and a completion task."
          : "A flexible peer exchange with scheduling and progress tracked in the prototype.",
      trackingSteps:
        listing.deliveryType === "Mini Course"
          ? ["Requested", "Accepted", "In Progress", "Submitted Work", "Completed", "Rated"]
          : ["Requested", "Accepted", "In Progress", "Completed", "Rated"],
      rewardNote:
        "Earn credits, reputation, badge progress, and visible teaching proof.",
    };

    setSkills((currentSkills) => [newSkill, ...currentSkills]);
    setOpenedQuests((currentQuests) => [newSkill, ...currentQuests]);
    setTeachingCount((currentTeaching) => currentTeaching + 1);
    setIncomingRequests((currentRequests) => [
      {
        id: `request-demo-${Date.now()}`,
        learner: "Demo Learner",
        skillTitle: listing.title,
        deliveryType: listing.deliveryType,
        status: "Requested",
        rewardPreview: `+${listing.credits} credits / reputation / portfolio proof`,
        requestedAt: "Just now",
      },
      ...currentRequests,
    ]);
  };

  const handleUpdateSkill = (skillId: string, listing: SkillListingInput) => {
    const updatedFields = {
      title: listing.title,
      category: listing.category,
      credits: listing.credits,
      format: formatByDeliveryType[listing.deliveryType],
      level: listing.level,
      description: listing.description,
      deliveryType: listing.deliveryType,
      deliverySummary:
        listing.deliveryType === "Mini Course"
          ? "A compact course-style listing with lessons, checkpoints, and a completion task."
          : "A flexible peer exchange with scheduling and progress tracked in the prototype.",
      trackingSteps:
        listing.deliveryType === "Mini Course"
          ? [
              "Requested",
              "Accepted",
              "In Progress",
              "Submitted Work",
              "Completed",
              "Rated",
            ]
          : ["Requested", "Accepted", "In Progress", "Completed", "Rated"],
    } satisfies Partial<Skill>;

    setSkills((currentSkills) =>
      currentSkills.map((skill) =>
        skill.id === skillId ? { ...skill, ...updatedFields } : skill,
      ),
    );
    setOpenedQuests((currentQuests) =>
      currentQuests.map((quest) =>
        quest.id === skillId ? { ...quest, ...updatedFields } : quest,
      ),
    );
  };

  const handleDeleteSkill = (skillId: string) => {
    setSkills((currentSkills) =>
      currentSkills.filter((skill) => skill.id !== skillId),
    );
    setOpenedQuests((currentQuests) =>
      currentQuests.filter((quest) => quest.id !== skillId),
    );
    setTeachingCount((currentTeaching) => Math.max(0, currentTeaching - 1));
  };

  const handleAcceptApplicant = (requestId: string) => {
    setIncomingRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: "Accepted",
              requestedAt: "Accepted just now",
            }
          : request,
      ),
    );
  };

  if (phase === "loading") {
    return <LoadingPage />;
  }

  if (phase === "onboarding") {
    return <OnboardingPage onDone={() => setPhase("auth")} />;
  }

  if (phase === "auth") {
    return <AuthPage onSubmit={handleAuthSubmit} />;
  }

  const activePage = (() => {
    switch (activeTab) {
      case "marketplace":
        if (selectedSkill) {
          return (
            <SkillDetailPage
              balance={credits}
              isRequested={requestedSkillIds.includes(selectedSkill.id)}
              requestMessage={requestMessage}
              skill={selectedSkill}
              onBack={() => {
                setSelectedSkill(null);
                setRequestMessage(null);
              }}
              onRequest={handleRequestSkill}
            />
          );
        }

        return (
          <MarketplacePage
            skills={skills}
            onSelectSkill={handleSelectSkill}
          />
        );
      case "earn":
        return (
          <EarnPage
            completedTaskIds={completedTaskIds}
            tasks={earnTasks}
            onCompleteTask={handleCompleteTask}
          />
        );
      case "teach":
        return (
          <TeachPage
            openedQuests={openedQuests}
            requests={incomingRequests}
            rewards={visibleRewards}
            onAddSkill={handleAddSkill}
            onAcceptApplicant={handleAcceptApplicant}
            onDeleteSkill={handleDeleteSkill}
            onUpdateSkill={handleUpdateSkill}
          />
        );
      case "wallet":
        return (
          <WalletPage
            credits={credits}
            transactions={transactions}
          />
        );
      case "profile":
        return (
          <ProfilePage
            completed={completedCount}
            credits={credits}
            learning={learningCount}
            profile={profile}
            rewards={visibleRewards}
            teaching={teachingCount}
            transactions={transactions}
          />
        );
      case "dashboard":
      default:
        return (
          <DashboardPage
            completed={completedCount}
            learning={learningCount}
            teaching={teachingCount}
            skills={skills}
            progressItems={progressItems}
            rewards={visibleRewards}
            transactions={transactions}
          />
        );
    }
  })();

  return (
    <AppShell
      activeTab={activeTab}
      credits={credits}
      title={meta.title}
      subtitle={meta.subtitle}
      onTabChange={handleTabChange}
    >
      {activePage}
    </AppShell>
  );
}

export default App;
