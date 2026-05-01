import { Coins } from "lucide-react";

type CreditBadgeProps = {
  credits: number;
};

function CreditBadge({ credits }: CreditBadgeProps) {
  return (
    <div className="bob flex h-12 shrink-0 items-center gap-2 rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-200 to-lime-200 px-3 text-slate-950 shadow-[0_5px_0_#172033]">
      <Coins size={18} aria-hidden="true" />
      <span className="text-base font-black">{credits}</span>
    </div>
  );
}

export default CreditBadge;
