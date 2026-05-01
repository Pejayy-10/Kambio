import { Search, Star } from "lucide-react";
import type { Skill } from "../types";

type MarketplacePageProps = {
  skills: Skill[];
};

function MarketplacePage({ skills }: MarketplacePageProps) {
  return (
    <div className="space-y-4">
      <label className="flex h-11 items-center gap-3 rounded-lg border border-stone-200 bg-white px-3 text-slate-500">
        <Search size={18} aria-hidden="true" />
        <input
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          placeholder="Search skills"
        />
      </label>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {["All", "Design", "Productivity", "Communication"].map((category) => (
          <button
            key={category}
            className="shrink-0 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-slate-600"
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      <section className="space-y-3">
        {skills.map((skill) => (
          <article
            key={skill.id}
            className="rounded-lg border border-stone-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="rounded-lg bg-stone-100 px-2 py-1 text-xs font-semibold text-slate-600">
                  {skill.category}
                </span>
                <h2 className="mt-3 text-base font-semibold">{skill.title}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {skill.teacher} · {skill.format}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">{skill.credits}</p>
                <p className="text-xs text-slate-500">credits</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-amber-700">
                <Star size={15} fill="currentColor" aria-hidden="true" />
                {skill.rating}
              </span>
              <span className="text-slate-500">{skill.duration}</span>
              <button className="rounded-lg bg-emerald-700 px-3 py-2 font-semibold text-white">
                Request
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default MarketplacePage;
