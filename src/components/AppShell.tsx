import {
  BookOpen,
  BriefcaseBusiness,
  Flame,
  Home,
  ListChecks,
  Sparkles,
  UserRound,
  WalletCards,
} from "lucide-react";
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
  { id: "profile", label: "Me", icon: UserRound },
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
    <div className="app-stage min-h-screen text-slate-950 antialiased">
      <div className="screen-shell mx-auto min-h-screen w-full max-w-md border-x border-slate-950/10 shadow-2xl shadow-slate-950/10">
        <header className="sticky top-0 z-10 border-b border-slate-950/10 bg-[#fffaf0]/88 px-5 pb-4 pt-[max(env(safe-area-inset-top),1.25rem)] backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-xs font-black uppercase text-teal-700">
                <Sparkles size={14} aria-hidden="true" />
                Kambio Quest
              </p>
              <h1 className="mt-1 text-balance text-2xl font-black tracking-normal text-slate-950">
                {title}
              </h1>
              <p className="mt-1 text-sm font-medium text-slate-500">
                {subtitle}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-1 text-xs font-black text-rose-700">
                  <Flame size={13} aria-hidden="true" />
                  Level 7
                </span>
                <span className="h-2 w-28 shrink-0 overflow-hidden rounded-full bg-slate-950/10">
                  <span className="block h-full w-3/4 rounded-full bg-gradient-to-r from-teal-400 via-lime-300 to-amber-300" />
                </span>
              </div>
            </div>
            <CreditBadge credits={credits} />
          </div>
        </header>

        <main className="relative z-[1] min-h-[calc(100vh-7rem)] px-5 pb-28 pt-5">
          {children}
        </main>
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
