import {
  BookOpen,
  ClipboardList,
  Edit3,
  Inbox,
  MapPin,
  MessageSquare,
  Plus,
  Save,
  Trash2,
  Users,
  Video,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";
import type {
  DeliveryType,
  RewardStat,
  Skill,
  SkillListingInput,
  TeachingRequest,
} from "../types";

type TeachPageProps = {
  openedQuests: Skill[];
  requests: TeachingRequest[];
  rewards: RewardStat[];
  onAddSkill: (listing: SkillListingInput) => void;
  onDeleteSkill: (skillId: string) => void;
  onUpdateSkill: (skillId: string, listing: SkillListingInput) => void;
};

type TeachView = "create" | "quests" | "applicants";

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

const viewOptions: Array<{
  id: TeachView;
  label: string;
  icon: typeof Plus;
}> = [
  { id: "create", label: "Open", icon: Plus },
  { id: "quests", label: "Quests", icon: ClipboardList },
  { id: "applicants", label: "Applicants", icon: Users },
];

function skillToForm(skill: Skill): SkillListingInput {
  return {
    title: skill.title,
    category: skill.category,
    credits: skill.credits,
    deliveryType: skill.deliveryType,
    level: skill.level,
    description: skill.description,
  };
}

function TeachPage({
  openedQuests,
  requests,
  rewards,
  onAddSkill,
  onDeleteSkill,
  onUpdateSkill,
}: TeachPageProps) {
  const [activeView, setActiveView] = useState<TeachView>("quests");
  const [form, setForm] = useState<SkillListingInput>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const questTitles = useMemo(
    () => new Set(openedQuests.map((quest) => quest.title)),
    [openedQuests],
  );
  const questApplicants = requests.filter((request) =>
    questTitles.has(request.skillTitle),
  );

  const updateField = <Field extends keyof SkillListingInput>(
    field: Field,
    value: SkillListingInput[Field],
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title.trim() || !form.description.trim() || form.credits < 1) {
      setMessage("Add a title, description, and credit price first.");
      return;
    }

    const listing = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    };

    if (editingId) {
      onUpdateSkill(editingId, listing);
      setMessage("Quest updated.");
      resetForm();
      setActiveView("quests");
      return;
    }

    onAddSkill(listing);
    setMessage("Quest opened. Learners can now apply.");
    resetForm();
    setActiveView("quests");
  };

  const startEdit = (quest: Skill) => {
    setForm(skillToForm(quest));
    setEditingId(quest.id);
    setMessage(null);
    setActiveView("create");
  };

  const deleteQuest = (quest: Skill) => {
    onDeleteSkill(quest.id);
    if (editingId === quest.id) {
      resetForm();
    }
    setMessage("Quest deleted.");
  };

  return (
    <div className="space-y-4">
      <section className="quest-card-dark float-in rounded-3xl p-5 text-white">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lime-200 text-slate-950 shadow-[0_5px_0_rgba(255,255,255,0.18)]">
            <Plus size={19} aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl font-black">Teaching quests</h2>
            <p className="mt-1 text-sm font-medium leading-6 text-white/70">
              Open a quest, manage your listings, and review learner applicants.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-2">
        {viewOptions.map((option) => {
          const Icon = option.icon;
          const isActive = activeView === option.id;

          return (
            <button
              key={option.id}
              type="button"
              className={`flex h-16 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-black transition active:scale-95 ${
                isActive
                  ? "bg-slate-950 text-white shadow-[0_5px_0_#09bc8a]"
                  : "border border-slate-950/10 bg-white/75 text-slate-500 shadow-[0_4px_0_rgba(23,32,51,0.05)]"
              }`}
              onClick={() => {
                setActiveView(option.id);
                setMessage(null);
              }}
            >
              <Icon size={18} aria-hidden="true" />
              {option.label}
            </button>
          );
        })}
      </section>

      {activeView === "create" ? (
        <QuestForm
          editingId={editingId}
          form={form}
          message={message}
          onCancelEdit={resetForm}
          onSubmit={handleSubmit}
          onUpdateField={updateField}
        />
      ) : null}

      {activeView === "quests" ? (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black">My opened quests</h2>
            <span className="text-xs font-black text-slate-500">
              {openedQuests.length} active
            </span>
          </div>

          {openedQuests.length === 0 ? (
            <EmptyPanel
              icon={ClipboardList}
              title="No opened quests"
              description="Open a teaching quest so learners can apply."
            />
          ) : null}

          {openedQuests.map((quest) => (
            <article key={quest.id} className="quest-card rounded-3xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-black text-teal-800">
                    {quest.deliveryType}
                  </span>
                  <h3 className="mt-3 text-base font-black">{quest.title}</h3>
                  <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                    {quest.category} / {quest.level} / {quest.credits} credits
                  </p>
                </div>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-900">
                  Open
                </span>
              </div>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                {quest.description}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-slate-950/10 bg-white/75 px-3 py-3 text-sm font-black text-slate-700"
                  onClick={() => startEdit(quest)}
                >
                  <Edit3 size={16} aria-hidden="true" />
                  Edit
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-rose-100 px-3 py-3 text-sm font-black text-rose-800"
                  onClick={() => deleteQuest(quest)}
                >
                  <Trash2 size={16} aria-hidden="true" />
                  Delete
                </button>
              </div>
            </article>
          ))}

          {message ? (
            <div className="rounded-2xl bg-teal-100 px-3 py-2 text-sm font-bold text-teal-800">
              {message}
            </div>
          ) : null}
        </section>
      ) : null}

      {activeView === "applicants" ? (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black">Learner applicants</h2>
            <span className="text-xs font-black text-slate-500">
              {questApplicants.length} requests
            </span>
          </div>

          {questApplicants.length === 0 ? (
            <EmptyPanel
              icon={Inbox}
              title="No applicants yet"
              description="Requests for your opened quests will appear here."
            />
          ) : null}

          {questApplicants.map((request) => (
            <article key={request.id} className="quest-card rounded-3xl p-4">
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
              <p className="mt-3 text-xs font-bold leading-5 text-teal-700">
                {request.rewardPreview}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="quest-button rounded-2xl px-3 py-3 text-sm font-black"
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="rounded-2xl border border-slate-950/10 bg-white/75 px-3 py-3 text-sm font-black text-slate-700"
                >
                  View
                </button>
              </div>
            </article>
          ))}
        </section>
      ) : null}

      <section className="quest-card rounded-3xl p-4">
        <h2 className="text-base font-black">Reward snapshot</h2>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="reward-chip rounded-2xl p-3 text-center"
            >
              <p className="text-lg font-black">{reward.value}</p>
              <p className="mt-1 text-[0.68rem] font-bold text-slate-500">
                {reward.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

type QuestFormProps = {
  editingId: string | null;
  form: SkillListingInput;
  message: string | null;
  onCancelEdit: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUpdateField: <Field extends keyof SkillListingInput>(
    field: Field,
    value: SkillListingInput[Field],
  ) => void;
};

function QuestForm({
  editingId,
  form,
  message,
  onCancelEdit,
  onSubmit,
  onUpdateField,
}: QuestFormProps) {
  return (
    <form className="quest-card space-y-3 rounded-3xl p-4" onSubmit={onSubmit}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-black">
          {editingId ? "Edit teaching quest" : "Open a teaching quest"}
        </h2>
        {editingId ? (
          <button
            type="button"
            className="flex items-center gap-1 rounded-2xl bg-slate-100 px-2.5 py-2 text-xs font-black text-slate-600"
            onClick={onCancelEdit}
          >
            <X size={14} aria-hidden="true" />
            Cancel
          </button>
        ) : null}
      </div>

      <label className="block">
        <span className="text-xs font-black uppercase text-slate-500">
          Quest title
        </span>
        <input
          className="soft-input mt-2 h-11 w-full rounded-2xl px-3 text-sm font-semibold outline-none focus:border-teal-600"
          placeholder="e.g. Portfolio feedback"
          value={form.title}
          onChange={(event) => onUpdateField("title", event.target.value)}
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs font-black uppercase text-slate-500">
            Category
          </span>
          <select
            className="soft-input mt-2 h-11 w-full rounded-2xl px-3 text-sm font-semibold outline-none focus:border-teal-600"
            value={form.category}
            onChange={(event) => onUpdateField("category", event.target.value)}
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
              onUpdateField(
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
      </div>

      <label className="block">
        <span className="text-xs font-black uppercase text-slate-500">
          Delivery
        </span>
        <div className="mt-2 grid grid-cols-2 gap-2">
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
                onClick={() => onUpdateField("deliveryType", option.type)}
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
      </label>

      <label className="block">
        <span className="text-xs font-black uppercase text-slate-500">
          Credit reward
        </span>
        <input
          type="number"
          min="1"
          className="soft-input mt-2 h-11 w-full rounded-2xl px-3 text-sm font-semibold outline-none focus:border-teal-600"
          inputMode="numeric"
          value={form.credits}
          onChange={(event) =>
            onUpdateField("credits", Number(event.target.value))
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
          onChange={(event) => onUpdateField("description", event.target.value)}
        />
      </label>

      {message ? (
        <div
          className={`rounded-2xl px-3 py-2 text-sm font-bold ${
            message.includes("first")
              ? "bg-rose-50 text-rose-800"
              : "bg-teal-100 text-teal-800"
          }`}
        >
          {message}
        </div>
      ) : null}

      <button
        type="submit"
        className="quest-button flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black"
      >
        <Save size={16} aria-hidden="true" />
        {editingId ? "Save quest" : "Open quest"}
      </button>
    </form>
  );
}

type EmptyPanelProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

function EmptyPanel({ icon: Icon, title, description }: EmptyPanelProps) {
  return (
    <section className="rounded-3xl border border-dashed border-slate-950/15 bg-white/70 p-5 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
        <Icon size={20} aria-hidden="true" />
      </div>
      <p className="mt-3 text-sm font-black">{title}</p>
      <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
        {description}
      </p>
    </section>
  );
}

export default TeachPage;
