import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import type { Transaction } from "../types";

type WalletPageProps = {
  credits: number;
  transactions: Transaction[];
};

function WalletPage({ credits, transactions }: WalletPageProps) {
  const earned = transactions
    .filter((transaction) => transaction.type === "earned")
    .reduce((total, transaction) => total + transaction.amount, 0);
  const spent = transactions
    .filter((transaction) => transaction.type === "spent")
    .reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <div className="space-y-5">
      <section className="rounded-lg bg-slate-950 p-5 text-white">
        <p className="text-sm text-slate-300">Available balance</p>
        <p className="mt-2 text-4xl font-semibold">{credits}</p>
        <p className="mt-1 text-sm text-slate-300">skill credits</p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <WalletMetric label="Earned" value={earned} tone="text-emerald-700" />
        <WalletMetric label="Spent" value={spent} tone="text-rose-700" />
      </section>

      <section className="space-y-2">
        {transactions.map((transaction) => {
          const isEarned = transaction.type === "earned";
          const Icon = isEarned ? ArrowDownLeft : ArrowUpRight;

          return (
            <article
              key={transaction.id}
              className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white p-3"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  isEarned
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                <Icon size={18} aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {transaction.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">{transaction.time}</p>
              </div>
              <span
                className={`text-sm font-semibold ${
                  isEarned ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {isEarned ? "+" : "-"}
                {transaction.amount}
              </span>
            </article>
          );
        })}
      </section>
    </div>
  );
}

type WalletMetricProps = {
  label: string;
  value: number;
  tone: string;
};

function WalletMetric({ label, value, tone }: WalletMetricProps) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <p className={`text-2xl font-semibold ${tone}`}>{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}

export default WalletPage;
