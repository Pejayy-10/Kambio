import { Coins } from "lucide-react";

type CreditBadgeProps = {
  credits: number;
};

function CreditBadge({ credits }: CreditBadgeProps) {
  return (
    <div className="flex h-10 items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 text-amber-950">
      <Coins size={17} aria-hidden="true" />
      <span className="text-sm font-semibold">{credits}</span>
    </div>
  );
}

export default CreditBadge;
