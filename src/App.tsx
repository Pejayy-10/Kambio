import { useState } from "react";
import AppShell from "./components/AppShell";
import { currentUser, earnTasks, featuredSkills, recentTransactions } from "./data/mockData";
import DashboardPage from "./pages/DashboardPage";
import EarnPage from "./pages/EarnPage";
import MarketplacePage from "./pages/MarketplacePage";
import SkillDetailPage from "./pages/SkillDetailPage";
import TeachPage from "./pages/TeachPage";
import WalletPage from "./pages/WalletPage";
import type {
  EarnTask,
  Skill,
  SkillListingInput,
  TabId,
  Transaction,
} from "./types";

const pageMeta: Record<TabId, { title: string; subtitle: string }> = {
  dashboard: {
    title: `Hi, ${currentUser.name}`,
    subtitle: "Your skill exchange overview",
  },
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
};

function App() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [credits, setCredits] = useState(currentUser.credits);
  const [skills, setSkills] = useState<Skill[]>(featuredSkills);
  const [learningCount, setLearningCount] = useState(currentUser.learning);
  const [teachingCount, setTeachingCount] = useState(currentUser.teaching);
  const [completedCount, setCompletedCount] = useState(currentUser.completed);
  const [transactions, setTransactions] =
    useState<Transaction[]>(recentTransactions);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [requestedSkillIds, setRequestedSkillIds] = useState<string[]>([]);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [requestMessage, setRequestMessage] = useState<string | null>(null);
  const meta =
    activeTab === "marketplace" && selectedSkill
      ? {
          title: "Skill detail",
          subtitle: "Review before spending credits",
        }
      : pageMeta[activeTab];

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
      teacher: currentUser.name,
      rating: 5,
      duration: "30 min",
      credits: listing.credits,
      format: listing.format,
      level: listing.level,
      description: listing.description,
      outcomes: [
        "Get peer support from a new listing",
        "Use credits without direct barter",
        "Continue the exchange asynchronously",
      ],
      nextSlot: "New demo listing",
    };

    setSkills((currentSkills) => [newSkill, ...currentSkills]);
    setTeachingCount((currentTeaching) => currentTeaching + 1);
  };

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
        return <TeachPage onAddSkill={handleAddSkill} />;
      case "wallet":
        return (
          <WalletPage
            credits={credits}
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
