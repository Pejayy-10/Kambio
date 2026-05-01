import type { NavItem, TabId } from "../types";

type BottomNavigationProps = {
  activeTab: TabId;
  items: NavItem[];
  onChange: (tabId: TabId) => void;
};

function BottomNavigation({ activeTab, items, onChange }: BottomNavigationProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-stone-200 bg-white/95 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2 backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`flex h-14 flex-col items-center justify-center gap-1 rounded-lg text-xs font-medium transition ${
                isActive
                  ? "bg-slate-950 text-white"
                  : "text-slate-500 hover:bg-stone-100 hover:text-slate-950"
              }`}
              onClick={() => onChange(item.id)}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={19} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNavigation;
