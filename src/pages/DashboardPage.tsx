import { ArrowRight, Clock3 } from "lucide-react";
import type { Skill, Transaction } from "../types";

type DashboardPageProps = {
  completed: number;
  learning: number;
  teaching: number;
  skills: Skill[];
  transactions: Transaction[];
};

function DashboardPage({
  completed,
  learning,
  teaching,
  skills,
  transactions,
}: DashboardPageProps) {
  const suggestedSkill = skills[0];

  return (
    <div className="space-y-5">
      <section className="grid grid-cols-3 gap-3">
        <MetricCard label="Learning" value={learning} accent="bg-emerald-600" />
        <MetricCard label="Teaching" value={teaching} accent="bg-indigo-600" />
        <MetricCard label="Done" value={completed} accent="bg-amber-500" />
      </section>

      <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm shadow-stone-200/60">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-950">
              {suggestedSkill.title}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {suggestedSkill.teacher} / {suggestedSkill.duration}
            </p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
            <Clock3 size={18} aria-hidden="true" />
          </div>
        </div>
        <button className="mt-4 flex w-full items-center justify-between rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white">
          Continue exchange
          <ArrowRight size={17} aria-hidden="true" />
        </button>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">Recent activity</h2>
          <span className="text-xs font-medium text-slate-500">
            {transactions.length} updates
          </span>
        </div>
        <div className="space-y-2">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between rounded-lg border border-stone-200 bg-white p-3"
            >
              <div>
                <p className="text-sm font-medium">{transaction.title}</p>
                <p className="mt-1 text-xs text-slate-500">{transaction.time}</p>
              </div>
              <span
                className={`text-sm font-semibold ${
                  transaction.type === "earned"
                    ? "text-emerald-700"
                    : "text-rose-700"
                }`}
              >
                {transaction.type === "earned" ? "+" : "-"}
                {transaction.amount}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

type MetricCardProps = {
  label: string;
  value: number;
  accent: string;
};

function MetricCard({ label, value, accent }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-3">
      <div className={`mb-3 h-1.5 w-8 rounded-full ${accent}`} />
      <p className="text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}

export default DashboardPage;
