import { BookOpen, Inbox, MapPin, MessageSquare, Plus, Trophy, Video } from "lucide-react";
import { type FormEvent, useState } from "react";
import type {
  DeliveryType,
  RewardStat,
  SkillListingInput,
  TeachingRequest,
} from "../types";

type TeachPageProps = {
  requests: TeachingRequest[];
  rewards: RewardStat[];
  onAddSkill: (listing: SkillListingInput) => void;
};

const initialForm: SkillListingInput = {
  title: "",
  category: "Design",
  credits: 12,
  deliveryType: "Async Help",
  level: "Beginner",
  description: "",
};

const deliveryOptions: Array<{
  type: DeliveryType;
  label: string;
  description: string;
  icon: typeof MessageSquare;
}> = [
  {
    type: "Async Help",
    label: "Async",
    description: "Learner submits work, teacher replies later.",
    icon: MessageSquare,
  },
  {
    type: "Video Call",
    label: "Video",
    description: "Scheduled tutoring with live conversation.",
    icon: Video,
  },
  {
    type: "Face-to-Face",
    label: "In person",
    description: "Campus or community tutorial session.",
    icon: MapPin,
  },
  {
    type: "Mini Course",
    label: "Course",
    description: "Lessons, checkpoints, and final task.",
    icon: BookOpen,
  },
];

function TeachPage({ requests, rewards, onAddSkill }: TeachPageProps) {
  const [form, setForm] = useState<SkillListingInput>(initialForm);
  const [message, setMessage] = useState<string | null>(null);

  const updateField = <Field extends keyof SkillListingInput>(
    field: Field,
    value: SkillListingInput[Field],
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title.trim() || !form.description.trim() || form.credits < 1) {
      setMessage("Add a title, description, and credit price first.");
      return;
    }

    onAddSkill({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
    setForm(initialForm);
    setMessage("Listing added. Open Skills to see it at the top.");
  };

  return (
    <div className="space-y-4">
      <section className="quest-card-dark float-in rounded-3xl p-5 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-200 text-slate-950 shadow-[0_5px_0_rgba(255,255,255,0.18)]">
            <Plus size={19} aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl font-black">Open a teaching quest</h2>
            <p className="mt-1 text-sm font-medium text-white/70">
              Create a temporary listing for the demo session.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black">Delivery options</h2>
          <span className="text-xs font-bold text-slate-500">
            Choose one
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {deliveryOptions.map((option) => {
            const Icon = option.icon;
            const isActive = option.type === form.deliveryType;

            return (
              <button
                key={option.type}
                type="button"
                className={`rounded-2xl border p-3 text-left transition active:scale-95 ${
                  isActive
                    ? "border-slate-950 bg-slate-950 text-white shadow-[0_5px_0_#09bc8a]"
                    : "border-slate-950/10 bg-white/75 text-slate-700 shadow-[0_4px_0_rgba(23,32,51,0.05)]"
                }`}
                onClick={() => updateField("deliveryType", option.type)}
              >
                <Icon size={18} aria-hidden="true" />
                <p className="mt-2 text-sm font-black">{option.label}</p>
                <p
                  className={`mt-1 text-xs font-medium leading-5 ${
                    isActive ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="quest-card rounded-3xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Inbox size={18} className="text-slate-500" aria-hidden="true" />
            <h2 className="text-base font-black">Teaching requests</h2>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {requests.length}
          </span>
        </div>
        <div className="space-y-2">
          {requests.slice(0, 3).map((request) => (
            <article
              key={request.id}
              className="rounded-2xl border border-slate-950/10 bg-white/70 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black">{request.skillTitle}</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {request.learner} / {request.deliveryType}
                  </p>
                </div>
                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-black text-amber-800">
                  {request.status}
                </span>
              </div>
              <p className="mt-2 text-xs font-bold leading-5 text-teal-700">
                {request.rewardPreview}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">
                {request.requestedAt}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="quest-card rounded-3xl p-4">
        <div className="mb-3 flex items-center gap-2">
          <Trophy size={18} className="text-amber-700" aria-hidden="true" />
          <h2 className="text-base font-black">Rewards beyond credits</h2>
        </div>
        <div className="space-y-2">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="reward-chip flex items-start justify-between gap-3 rounded-2xl p-3"
            >
              <div>
                <p className="text-sm font-black">{reward.label}</p>
                <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                  {reward.description}
                </p>
              </div>
              <span className="text-sm font-black text-slate-950">
                {reward.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      <form
        className="quest-card space-y-3 rounded-3xl p-4"
        onSubmit={handleSubmit}
      >
        <label className="block">
          <span className="text-xs font-black uppercase text-slate-500">
            Skill title
          </span>
          <input
            className="soft-input mt-2 h-11 w-full rounded-2xl px-3 text-sm font-semibold outline-none focus:border-teal-600"
            placeholder="e.g. Portfolio feedback"
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-xs font-black uppercase text-slate-500">
            Category
          </span>
          <select
            className="soft-input mt-2 h-11 w-full rounded-2xl px-3 text-sm font-semibold outline-none focus:border-teal-600"
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
          >
            <option>Design</option>
            <option>Productivity</option>
            <option>Communication</option>
            <option>Writing</option>
            <option>Community</option>
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-black uppercase text-slate-500">
            Level
          </span>
          <select
            className="soft-input mt-2 h-11 w-full rounded-2xl px-3 text-sm font-semibold outline-none focus:border-teal-600"
            value={form.level}
            onChange={(event) =>
              updateField(
                "level",
                event.target.value as SkillListingInput["level"],
              )
            }
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-black uppercase text-slate-500">
            Credit price
          </span>
          <input
            type="number"
            min="1"
            className="soft-input mt-2 h-11 w-full rounded-2xl px-3 text-sm font-semibold outline-none focus:border-teal-600"
            placeholder="12"
            inputMode="numeric"
            value={form.credits}
            onChange={(event) =>
              updateField("credits", Number(event.target.value))
            }
          />
        </label>

        <label className="block">
          <span className="text-xs font-black uppercase text-slate-500">
            Description
          </span>
          <textarea
            className="soft-input mt-2 min-h-24 w-full resize-none rounded-2xl px-3 py-3 text-sm font-semibold leading-6 outline-none focus:border-teal-600"
            placeholder="Describe what learners will receive."
            value={form.description}
            onChange={(event) =>
              updateField("description", event.target.value)
            }
          />
        </label>

        {message ? (
          <div
            className={`rounded-2xl px-3 py-2 text-sm font-bold ${
              message.startsWith("Listing")
                ? "bg-teal-100 text-teal-800"
                : "bg-rose-50 text-rose-800"
            }`}
          >
            {message}
          </div>
        ) : null}

        <button
          type="submit"
          className="quest-button w-full rounded-2xl px-4 py-3 text-sm font-black"
        >
          Add listing
        </button>
      </form>
    </div>
  );
}

export default TeachPage;
