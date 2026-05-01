import {
  Award,
  BadgeCheck,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AuthProfile, RewardStat, Transaction } from "../types";

type ProfilePageProps = {
  completed: number;
  credits: number;
  learning: number;
  profile: AuthProfile;
  rewards: RewardStat[];
  teaching: number;
  transactions: Transaction[];
};

const badges = [
  {
    label: "Helpful Starter",
    description: "Completed first peer support tasks.",
    icon: BadgeCheck,
    tone: "bg-teal-100 text-teal-800",
  },
  {
    label: "Fast Responder",
    description: "Replies quickly to learner requests.",
    icon: Sparkles,
    tone: "bg-amber-100 text-amber-900",
  },
  {
    label: "Portfolio Proof",
    description: "Teaching history can be shown as proof.",
    icon: Award,
    tone: "bg-rose-100 text-rose-800",
  },
];

const rankPath = ["Novice", "Apprentice", "Guide", "Mentor", "Master"];

function ProfilePage({
  completed,
  credits,
  learning,
  profile,
  rewards,
  teaching,
  transactions,
}: ProfilePageProps) {
  const rating =
    rewards.find((reward) => reward.id === "reward-reputation")?.value ?? "4.8";
  const badgeCount =
    rewards.find((reward) => reward.id === "reward-badges")?.value ??
    badges.length.toString();
  const earnedTransactions = transactions.filter(
    (transaction) => transaction.type === "earned",
  ).length;

  return (
    <div className="space-y-5">
      <section className="quest-card-dark float-in rounded-3xl p-5 text-white">
        <div className="flex items-start gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-200 to-lime-200 text-3xl font-black text-slate-950 shadow-[0_7px_0_rgba(255,255,255,0.18)]">
            {profile.name.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black uppercase text-amber-200">
              Novice Mentor
            </p>
            <h2 className="mt-1 truncate text-2xl font-black">
              {profile.name}
            </h2>
            <p className="mt-1 truncate text-sm font-medium text-white/65">
              {profile.email}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-white/12 px-2.5 py-1 text-xs font-black text-lime-200">
                <Star size={13} fill="currentColor" aria-hidden="true" />
                {rating}
              </span>
              <span className="rounded-full bg-white/12 px-2.5 py-1 text-xs font-black text-cyan-100">
                {badgeCount} badges
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        <ProfileStat label="Credits" value={credits} />
        <ProfileStat label="Learning" value={learning} />
        <ProfileStat label="Teaching" value={teaching} />
      </section>

      <section className="quest-card rounded-3xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap size={18} className="text-teal-700" aria-hidden="true" />
            <h2 className="text-base font-black">Rank path</h2>
          </div>
          <span className="text-xs font-black text-slate-500">
            {completed} done
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {rankPath.map((rank, index) => {
            const isUnlocked = index <= 1;

            return (
              <div
                key={rank}
                className={`shrink-0 rounded-2xl border px-3 py-2 text-xs font-black ${
                  isUnlocked
                    ? "border-slate-950 bg-slate-950 text-white shadow-[0_4px_0_#09bc8a]"
                    : "border-slate-950/10 bg-white/75 text-slate-400"
                }`}
              >
                {rank}
              </div>
            );
          })}
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-950/10">
          <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-teal-400 via-lime-300 to-amber-300" />
        </div>
        <p className="mt-3 text-xs font-medium leading-5 text-slate-500">
          Suggested title ladder: Novice, Apprentice, Guide, Mentor, Master.
        </p>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-black">Badges</h2>
          <Trophy size={18} className="text-amber-700" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          {badges.map((badge) => {
            const Icon = badge.icon;

            return (
              <article
                key={badge.label}
                className="quest-card flex items-start gap-3 rounded-2xl p-3"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-[0_4px_0_rgba(23,32,51,0.1)] ${badge.tone}`}
                >
                  <Icon size={18} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-black">{badge.label}</p>
                  <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                    {badge.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <ProfilePanel
          icon={BookOpen}
          label="Proof items"
          value={earnedTransactions}
        />
        <ProfilePanel
          icon={ShieldCheck}
          label="Trust score"
          value={rating}
        />
      </section>
    </div>
  );
}

type ProfileStatProps = {
  label: string;
  value: number;
};

function ProfileStat({ label, value }: ProfileStatProps) {
  return (
    <div className="quest-card rounded-2xl p-3">
      <p className="text-2xl font-black">{value}</p>
      <p className="mt-1 text-xs font-bold text-slate-500">{label}</p>
    </div>
  );
}

type ProfilePanelProps = {
  icon: LucideIcon;
  label: string;
  value: number | string;
};

function ProfilePanel({ icon: Icon, label, value }: ProfilePanelProps) {
  return (
    <div className="quest-card rounded-2xl p-4">
      <Icon size={19} className="text-teal-700" aria-hidden="true" />
      <p className="mt-3 text-2xl font-black">{value}</p>
      <p className="mt-1 text-sm font-bold text-slate-500">{label}</p>
    </div>
  );
}

export default ProfilePage;
