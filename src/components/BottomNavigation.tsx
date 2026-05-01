import type { NavItem, TabId } from "../types";

type BottomNavigationProps = {
  activeTab: TabId;
  items: NavItem[];
  onChange: (tabId: TabId) => void;
};

function BottomNavigation({ activeTab, items, onChange }: BottomNavigationProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-950/10 bg-[#fffaf0]/86 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2 shadow-[0_-18px_44px_rgba(23,32,51,0.12)] backdrop-blur-xl">
      <div
        className="mx-auto grid max-w-md gap-1 rounded-2xl border border-slate-950/10 bg-white/76 p-1"
        style={{
          gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
        }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`relative flex h-14 flex-col items-center justify-center gap-1 rounded-xl text-[0.68rem] font-black transition active:scale-[0.98] ${
                isActive
                  ? "bg-slate-950 text-white shadow-[0_5px_0_#09bc8a]"
                  : "text-slate-500 hover:bg-amber-100/70 hover:text-slate-950"
              }`}
              onClick={() => onChange(item.id)}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive ? (
                <span className="absolute -top-1 h-2 w-2 rounded-full bg-amber-300" />
              ) : null}
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
