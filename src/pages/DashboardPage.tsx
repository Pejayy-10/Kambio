import { ArrowRight, Clock3, Route, Sparkles, Trophy } from "lucide-react";
import type { LearningProgress, RewardStat, Skill, Transaction } from "../types";

type DashboardPageProps = {
  completed: number;
  learning: number;
  teaching: number;
  skills: Skill[];
  progressItems: LearningProgress[];
  rewards: RewardStat[];
  transactions: Transaction[];
};

function DashboardPage({
  completed,
  learning,
  teaching,
  skills,
  progressItems,
  rewards,
  transactions,
}: DashboardPageProps) {
  const suggestedSkill = skills[0];

  return (
    <div className="space-y-5">
      <section className="quest-card-dark float-in rounded-3xl p-5 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-black uppercase text-amber-200">
              <Sparkles size={14} aria-hidden="true" />
              Daily quest
            </p>
            <h2 className="mt-2 text-2xl font-black leading-tight">
              Trade one skill, unlock your next boost.
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Spend, earn, and teach to keep your exchange streak moving.
            </p>
          </div>
          <div className="rounded-2xl bg-white/12 px-3 py-2 text-center">
            <p className="text-2xl font-black">75%</p>
            <p className="text-[0.68rem] font-bold uppercase text-white/60">
              XP
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        <MetricCard label="Learning" value={learning} accent="from-teal-400 to-cyan-300" />
        <MetricCard label="Teaching" value={teaching} accent="from-orange-300 to-rose-300" />
        <MetricCard label="Done" value={completed} accent="from-amber-300 to-lime-300" />
      </section>

      <section className="quest-card float-in rounded-3xl p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black text-slate-950">
              {suggestedSkill.title}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-500">
              {suggestedSkill.teacher} / {suggestedSkill.duration}
            </p>
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-teal-700 shadow-[0_4px_0_rgba(23,32,51,0.12)]">
            <Clock3 size={18} aria-hidden="true" />
          </div>
        </div>
        <button className="quest-button mt-4 flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-black">
          Continue exchange
          <ArrowRight size={17} aria-hidden="true" />
        </button>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-black">Quest map</h2>
          <Route size={18} className="text-slate-500" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          {progressItems.slice(0, 2).map((item) => (
            <article
              key={item.id}
              className="quest-card rounded-2xl p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black">{item.skillTitle}</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {item.deliveryType} / {item.status}
                  </p>
                </div>
                <span className="rounded-xl bg-lime-100 px-2 py-1 text-xs font-black text-lime-900">
                  {item.progress}%
                </span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-950/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-400 via-lime-300 to-amber-300"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
              <p className="mt-3 text-xs font-medium text-slate-500">
                {item.nextAction}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-black">Loot earned</h2>
          <Trophy size={18} className="text-slate-500" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          {rewards.map((reward) => (
            <article
              key={reward.id}
              className="reward-chip flex items-start justify-between gap-3 rounded-2xl p-3"
            >
              <div>
                <p className="text-sm font-black text-slate-700">
                  {reward.label}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {reward.description}
                </p>
              </div>
              <p className="text-lg font-black">{reward.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-black">Recent activity</h2>
          <span className="text-xs font-bold text-slate-500">
            {transactions.length} updates
          </span>
        </div>
        <div className="space-y-2">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between rounded-2xl border border-slate-950/10 bg-white/75 p-3"
            >
              <div>
                <p className="text-sm font-bold">{transaction.title}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {transaction.time}
                </p>
              </div>
              <span
                className={`text-sm font-black ${
                  transaction.type === "earned"
                    ? "text-teal-700"
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
    <div className="quest-card rounded-2xl p-3">
      <div className={`mb-3 h-2 w-9 rounded-full bg-gradient-to-r ${accent}`} />
      <p className="text-2xl font-black">{value}</p>
      <p className="mt-1 text-xs font-bold text-slate-500">{label}</p>
    </div>
  );
}

export default DashboardPage;
