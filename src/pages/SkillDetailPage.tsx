import { ArrowLeft, CalendarClock, Check, Gift, Route, Star } from "lucide-react";
import type { Skill } from "../types";

type SkillDetailPageProps = {
  balance: number;
  isRequested: boolean;
  requestMessage: string | null;
  skill: Skill;
  onBack: () => void;
  onRequest: (skill: Skill) => void;
};

function SkillDetailPage({
  balance,
  isRequested,
  requestMessage,
  skill,
  onBack,
  onRequest,
}: SkillDetailPageProps) {
  const hasEnoughCredits = balance >= skill.credits;
  const isDisabled = isRequested || !hasEnoughCredits;

  return (
    <div className="space-y-4">
      <button
        type="button"
        className="flex h-10 items-center gap-2 rounded-2xl border border-slate-950/10 bg-white/75 px-3 text-sm font-black text-slate-700 shadow-[0_4px_0_rgba(23,32,51,0.08)]"
        onClick={onBack}
      >
        <ArrowLeft size={17} aria-hidden="true" />
        Back
      </button>

      <section className="quest-card-dark float-in rounded-3xl p-5 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="rounded-full bg-white/14 px-2.5 py-1 text-xs font-black text-lime-200">
              {skill.category}
            </span>
            <h2 className="mt-3 text-2xl font-black leading-tight">
              {skill.title}
            </h2>
            <p className="mt-2 text-sm font-medium text-white/70">
              {skill.teacher} / {skill.level}
            </p>
          </div>
          <div className="rounded-2xl bg-amber-200 px-3 py-2 text-right text-slate-950 shadow-[0_4px_0_rgba(255,255,255,0.16)]">
            <p className="text-xl font-black">{skill.credits}</p>
            <p className="text-xs font-bold">credits</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm">
          <DetailMetric label="Rating" value={skill.rating.toString()} />
          <DetailMetric label="Length" value={skill.duration} />
          <DetailMetric label="Type" value={skill.deliveryType} />
        </div>
      </section>

      <section className="quest-card rounded-3xl p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_4px_0_#09bc8a]">
            <Route size={18} aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-black">Exchange format</h3>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
              {skill.deliverySummary}
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {skill.trackingSteps.map((step) => (
            <span
              key={step}
              className="reward-chip shrink-0 rounded-2xl px-3 py-2 text-xs font-black text-slate-600"
            >
              {step}
            </span>
          ))}
        </div>
      </section>

      <section className="quest-card rounded-3xl p-4">
        <h3 className="text-base font-black">What you will get</h3>
        <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
          {skill.description}
        </p>
        <ul className="mt-4 space-y-2">
          {skill.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-2 text-sm font-medium text-slate-700">
              <Check
                className="mt-0.5 shrink-0 text-teal-700"
                size={16}
                aria-hidden="true"
              />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-100 to-lime-100 p-4 text-amber-950 shadow-[0_8px_0_rgba(23,32,51,0.06)]">
        <div className="flex gap-3">
          <Gift size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-black">Teacher loot</p>
            <p className="mt-1 text-sm font-medium leading-6">{skill.rewardNote}</p>
          </div>
        </div>
      </section>

      <section className="quest-card rounded-3xl p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 shadow-[0_4px_0_rgba(23,32,51,0.1)]">
            <CalendarClock size={18} aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-black">Next availability</p>
            <p className="mt-1 text-sm font-medium text-slate-500">
              {skill.nextSlot}
            </p>
          </div>
        </div>

        {requestMessage ? (
          <div
            className={`mt-4 rounded-2xl px-3 py-2 text-sm font-bold ${
              isRequested
                ? "bg-teal-100 text-teal-800"
                : "bg-rose-50 text-rose-800"
            }`}
          >
            {requestMessage}
          </div>
        ) : null}

        <button
          type="button"
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black ${
            isDisabled
              ? "bg-slate-200 text-slate-500"
              : "quest-button"
          }`}
          disabled={isDisabled}
          onClick={() => onRequest(skill)}
        >
          <Star size={17} aria-hidden="true" />
          {isRequested
            ? "Requested"
            : hasEnoughCredits
              ? `Request for ${skill.credits} credits`
              : "Not enough credits"}
        </button>
      </section>
    </div>
  );
}

type DetailMetricProps = {
  label: string;
  value: string;
};

function DetailMetric({ label, value }: DetailMetricProps) {
  return (
    <div className="rounded-2xl bg-white/12 p-3">
      <p className="font-black">{value}</p>
      <p className="mt-1 text-xs font-bold text-white/60">{label}</p>
    </div>
  );
}

export default SkillDetailPage;
