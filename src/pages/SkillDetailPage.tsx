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
        className="flex h-10 items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 text-sm font-semibold text-slate-700"
        onClick={onBack}
      >
        <ArrowLeft size={17} aria-hidden="true" />
        Back
      </button>

      <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm shadow-stone-200/60">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="rounded-lg bg-stone-100 px-2 py-1 text-xs font-semibold text-slate-600">
              {skill.category}
            </span>
            <h2 className="mt-3 text-2xl font-semibold">{skill.title}</h2>
            <p className="mt-2 text-sm text-slate-500">
              {skill.teacher} / {skill.level}
            </p>
          </div>
          <div className="rounded-lg bg-amber-50 px-3 py-2 text-right text-amber-950">
            <p className="text-xl font-semibold">{skill.credits}</p>
            <p className="text-xs">credits</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm">
          <DetailMetric label="Rating" value={skill.rating.toString()} />
          <DetailMetric label="Length" value={skill.duration} />
          <DetailMetric label="Type" value={skill.deliveryType} />
        </div>
      </section>

      <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm shadow-stone-200/60">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white">
            <Route size={18} aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold">Exchange format</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {skill.deliverySummary}
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {skill.trackingSteps.map((step) => (
            <span
              key={step}
              className="shrink-0 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-semibold text-slate-600"
            >
              {step}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm shadow-stone-200/60">
        <h3 className="text-base font-semibold">What you will get</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {skill.description}
        </p>
        <ul className="mt-4 space-y-2">
          {skill.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-2 text-sm text-slate-700">
              <Check
                className="mt-0.5 shrink-0 text-emerald-700"
                size={16}
                aria-hidden="true"
              />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-950">
        <div className="flex gap-3">
          <Gift size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold">Teacher rewards</p>
            <p className="mt-1 text-sm leading-6">{skill.rewardNote}</p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm shadow-stone-200/60">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
            <CalendarClock size={18} aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold">Next availability</p>
            <p className="mt-1 text-sm text-slate-500">{skill.nextSlot}</p>
          </div>
        </div>

        {requestMessage ? (
          <div
            className={`mt-4 rounded-lg px-3 py-2 text-sm font-medium ${
              isRequested
                ? "bg-emerald-50 text-emerald-800"
                : "bg-rose-50 text-rose-800"
            }`}
          >
            {requestMessage}
          </div>
        ) : null}

        <button
          type="button"
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold ${
            isDisabled
              ? "bg-stone-200 text-slate-500"
              : "bg-slate-950 text-white"
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
    <div className="rounded-lg bg-stone-50 p-3">
      <p className="font-semibold">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{label}</p>
    </div>
  );
}

export default SkillDetailPage;
