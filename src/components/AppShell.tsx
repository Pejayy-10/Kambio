import { BookOpen, BriefcaseBusiness, Home, ListChecks, WalletCards } from "lucide-react";
import type { ReactNode } from "react";
import CreditBadge from "./CreditBadge";
import BottomNavigation from "./BottomNavigation";
import type { NavItem, TabId } from "../types";

const navItems: NavItem[] = [
  { id: "dashboard", label: "Home", icon: Home },
  { id: "marketplace", label: "Skills", icon: BookOpen },
  { id: "earn", label: "Earn", icon: ListChecks },
  { id: "teach", label: "Teach", icon: BriefcaseBusiness },
  { id: "wallet", label: "Wallet", icon: WalletCards },
];

type AppShellProps = {
  activeTab: TabId;
  credits: number;
  title: string;
  subtitle: string;
  children: ReactNode;
  onTabChange: (tabId: TabId) => void;
};

function AppShell({
  activeTab,
  credits,
  title,
  subtitle,
  children,
  onTabChange,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-stone-100 text-slate-950">
      <div className="mx-auto min-h-screen w-full max-w-md bg-stone-50 shadow-sm">
        <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/95 px-5 pb-4 pt-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-emerald-700">
                Kambio
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-normal">
                {title}
              </h1>
              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            </div>
            <CreditBadge credits={credits} />
          </div>
        </header>

        <main className="px-5 pb-28 pt-5">{children}</main>
      </div>

      <BottomNavigation
        activeTab={activeTab}
        items={navItems}
        onChange={onTabChange}
      />
    </div>
  );
}

export default AppShell;
