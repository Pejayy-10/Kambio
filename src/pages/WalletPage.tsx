import { ArrowDownLeft, ArrowUpRight, PiggyBank, ReceiptText } from "lucide-react";
import EmptyState from "../components/EmptyState";
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
      <section className="quest-card-dark float-in rounded-3xl p-5 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-white/65">Available balance</p>
            <p className="mt-2 text-5xl font-black">{credits}</p>
            <p className="mt-1 text-sm font-medium text-white/65">
              skill credits
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-200 text-slate-950 shadow-[0_5px_0_rgba(255,255,255,0.18)]">
            <PiggyBank size={22} aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <WalletMetric label="Earned" value={earned} tone="text-teal-700" />
        <WalletMetric label="Spent" value={spent} tone="text-rose-700" />
      </section>

      <section className="space-y-2">
        {transactions.length === 0 ? (
          <EmptyState
            icon={ReceiptText}
            title="No credit movement yet"
            description="Completed tasks and requested sessions will appear here."
          />
        ) : null}

        {transactions.map((transaction) => {
          const isEarned = transaction.type === "earned";
          const Icon = isEarned ? ArrowDownLeft : ArrowUpRight;

          return (
            <article
              key={transaction.id}
              className="quest-card flex items-center gap-3 rounded-2xl p-3"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-[0_4px_0_rgba(23,32,51,0.1)] ${
                  isEarned
                    ? "bg-teal-100 text-teal-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                <Icon size={18} aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">
                  {transaction.title}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {transaction.time}
                </p>
              </div>
              <span
                className={`text-sm font-black ${
                  isEarned ? "text-teal-700" : "text-rose-700"
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
    <div className="quest-card rounded-2xl p-4">
      <p className={`text-2xl font-black ${tone}`}>{value}</p>
      <p className="mt-1 text-sm font-bold text-slate-500">{label}</p>
    </div>
  );
}

export default WalletPage;
