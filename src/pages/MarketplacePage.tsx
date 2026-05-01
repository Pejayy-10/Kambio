import { Search, Star } from "lucide-react";
import { useMemo, useState } from "react";
import type { Skill } from "../types";

type MarketplacePageProps = {
  skills: Skill[];
  onSelectSkill: (skill: Skill) => void;
};

function MarketplacePage({ skills, onSelectSkill }: MarketplacePageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(skills.map((skill) => skill.category)))];
  }, [skills]);

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesSearch = skill.title
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
      const matchesCategory =
        activeCategory === "All" || skill.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [activeCategory, searchTerm, skills]);

  return (
    <div className="space-y-4">
      <label className="flex h-11 items-center gap-3 rounded-lg border border-stone-200 bg-white px-3 text-slate-500">
        <Search size={18} aria-hidden="true" />
        <input
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          placeholder="Search skills"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </label>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((category) => {
          const isActive = category === activeCategory;

          return (
          <button
            key={category}
            className={`shrink-0 rounded-lg border px-3 py-2 text-sm font-medium ${
              isActive
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-stone-200 bg-white text-slate-600"
            }`}
            type="button"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
          );
        })}
      </div>

      <section className="space-y-3">
        {filteredSkills.map((skill) => (
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
                  {skill.teacher} / {skill.format}
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
              <button
                className="rounded-lg bg-emerald-700 px-3 py-2 font-semibold text-white"
                onClick={() => onSelectSkill(skill)}
              >
                View
              </button>
            </div>
          </article>
        ))}
      </section>

      {filteredSkills.length === 0 ? (
        <section className="rounded-lg border border-dashed border-stone-300 bg-white p-5 text-center">
          <p className="text-sm font-semibold">No matching skills</p>
          <p className="mt-1 text-sm text-slate-500">
            Try a different search or category.
          </p>
        </section>
      ) : null}
    </div>
  );
}

export default MarketplacePage;
