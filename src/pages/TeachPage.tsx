import { Plus } from "lucide-react";

function TeachPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-stone-200 bg-white p-4">
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

      <form className="space-y-3 rounded-lg border border-stone-200 bg-white p-4">
        <label className="block">
          <span className="text-xs font-semibold uppercase text-slate-500">
            Skill title
          </span>
          <input
            className="mt-2 h-11 w-full rounded-lg border border-stone-200 px-3 text-sm outline-none focus:border-emerald-600"
            placeholder="e.g. Portfolio feedback"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase text-slate-500">
            Credit price
          </span>
          <input
            className="mt-2 h-11 w-full rounded-lg border border-stone-200 px-3 text-sm outline-none focus:border-emerald-600"
            placeholder="12"
            inputMode="numeric"
          />
        </label>
        <button
          type="button"
          className="w-full rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
        >
          Add listing
        </button>
      </form>
    </div>
  );
}

export default TeachPage;
