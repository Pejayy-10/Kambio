import { useMemo, useState } from "react";
import AppShell from "./components/AppShell";
import { currentUser, earnTasks, featuredSkills, recentTransactions } from "./data/mockData";
import DashboardPage from "./pages/DashboardPage";
import EarnPage from "./pages/EarnPage";
import MarketplacePage from "./pages/MarketplacePage";
import TeachPage from "./pages/TeachPage";
import WalletPage from "./pages/WalletPage";
import type { TabId } from "./types";

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
  const meta = pageMeta[activeTab];

  const activePage = useMemo(() => {
    switch (activeTab) {
      case "marketplace":
        return <MarketplacePage skills={featuredSkills} />;
      case "earn":
        return <EarnPage tasks={earnTasks} />;
      case "teach":
        return <TeachPage />;
      case "wallet":
        return (
          <WalletPage
            credits={currentUser.credits}
            transactions={recentTransactions}
          />
        );
      case "dashboard":
      default:
        return (
          <DashboardPage
            completed={currentUser.completed}
            learning={currentUser.learning}
            teaching={currentUser.teaching}
            skills={featuredSkills}
            transactions={recentTransactions}
          />
        );
    }
  }, [activeTab]);

  return (
    <AppShell
      activeTab={activeTab}
      credits={currentUser.credits}
      title={meta.title}
      subtitle={meta.subtitle}
      onTabChange={setActiveTab}
    >
      {activePage}
    </AppShell>
  );
}

export default App;
