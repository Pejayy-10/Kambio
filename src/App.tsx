import { useState } from "react";
import AppShell from "./components/AppShell";
import { currentUser, earnTasks, featuredSkills, recentTransactions } from "./data/mockData";
import DashboardPage from "./pages/DashboardPage";
import EarnPage from "./pages/EarnPage";
import MarketplacePage from "./pages/MarketplacePage";
import SkillDetailPage from "./pages/SkillDetailPage";
import TeachPage from "./pages/TeachPage";
import WalletPage from "./pages/WalletPage";
import type { Skill, TabId, Transaction } from "./types";

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
  const [learningCount, setLearningCount] = useState(currentUser.learning);
  const [transactions, setTransactions] =
    useState<Transaction[]>(recentTransactions);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [requestedSkillIds, setRequestedSkillIds] = useState<string[]>([]);
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
            skills={featuredSkills}
            onSelectSkill={handleSelectSkill}
          />
        );
      case "earn":
        return <EarnPage tasks={earnTasks} />;
      case "teach":
        return <TeachPage />;
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
            completed={currentUser.completed}
            learning={learningCount}
            teaching={currentUser.teaching}
            skills={featuredSkills}
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
