import { Plus } from "lucide-react";
import { type FormEvent, useState } from "react";
import type { Skill, SkillListingInput } from "../types";

type TeachPageProps = {
  onAddSkill: (listing: SkillListingInput) => void;
};

const initialForm: SkillListingInput = {
  title: "",
  category: "Design",
  credits: 12,
  format: "Async",
  level: "Beginner",
  description: "",
};

function TeachPage({ onAddSkill }: TeachPageProps) {
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
      <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm shadow-stone-200/60">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
            <Plus size={19} aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Offer a skill</h2>
            <p className="mt-1 text-sm text-slate-500">
              Create a temporary listing for the demo session.
            </p>
          </div>
        </div>
      </section>

      <form
        className="space-y-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm shadow-stone-200/60"
        onSubmit={handleSubmit}
      >
        <label className="block">
          <span className="text-xs font-semibold uppercase text-slate-500">
            Skill title
          </span>
          <input
            className="mt-2 h-11 w-full rounded-lg border border-stone-200 px-3 text-sm outline-none focus:border-emerald-600"
            placeholder="e.g. Portfolio feedback"
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase text-slate-500">
            Category
          </span>
          <select
            className="mt-2 h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none focus:border-emerald-600"
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

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs font-semibold uppercase text-slate-500">
              Format
            </span>
            <select
              className="mt-2 h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none focus:border-emerald-600"
              value={form.format}
              onChange={(event) =>
                updateField("format", event.target.value as Skill["format"])
              }
            >
              <option>Async</option>
              <option>Live</option>
              <option>Hybrid</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase text-slate-500">
              Level
            </span>
            <select
              className="mt-2 h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none focus:border-emerald-600"
              value={form.level}
              onChange={(event) =>
                updateField("level", event.target.value as Skill["level"])
              }
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="text-xs font-semibold uppercase text-slate-500">
            Credit price
          </span>
          <input
            type="number"
            min="1"
            className="mt-2 h-11 w-full rounded-lg border border-stone-200 px-3 text-sm outline-none focus:border-emerald-600"
            placeholder="12"
            inputMode="numeric"
            value={form.credits}
            onChange={(event) =>
              updateField("credits", Number(event.target.value))
            }
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase text-slate-500">
            Description
          </span>
          <textarea
            className="mt-2 min-h-24 w-full resize-none rounded-lg border border-stone-200 px-3 py-3 text-sm leading-6 outline-none focus:border-emerald-600"
            placeholder="Describe what learners will receive."
            value={form.description}
            onChange={(event) =>
              updateField("description", event.target.value)
            }
          />
        </label>

        {message ? (
          <div
            className={`rounded-lg px-3 py-2 text-sm font-medium ${
              message.startsWith("Listing")
                ? "bg-emerald-50 text-emerald-800"
                : "bg-rose-50 text-rose-800"
            }`}
          >
            {message}
          </div>
        ) : null}

        <button
          type="submit"
          className="w-full rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
        >
          Add listing
        </button>
      </form>
    </div>
  );
}

export default TeachPage;
