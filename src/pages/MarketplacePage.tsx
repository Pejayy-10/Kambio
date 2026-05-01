import { Gem, Search, SearchX, Star } from "lucide-react";
import { useMemo, useState } from "react";
import EmptyState from "../components/EmptyState";
import type { Skill } from "../types";

type MarketplacePageProps = {
  skills: Skill[];
  onSelectSkill: (skill: Skill) => void;
};

function MarketplacePage({ skills, onSelectSkill }: MarketplacePageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(skills.map((skill) => skill.category))),
    ];
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
      <section className="quest-card-dark float-in rounded-3xl p-4 text-white">
        <p className="flex items-center gap-1.5 text-xs font-black uppercase text-lime-200">
          <Gem size={14} aria-hidden="true" />
          Skill marketplace
        </p>
        <h2 className="mt-2 text-2xl font-black leading-tight">
          Pick a quest, spend credits, learn faster.
        </h2>
      </section>

      <label className="soft-input flex h-12 items-center gap-3 rounded-2xl px-3 text-slate-500">
        <Search size={18} aria-hidden="true" />
        <input
          className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
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
              className={`shrink-0 rounded-2xl border px-3 py-2 text-sm font-black transition active:scale-95 ${
                isActive
                  ? "border-slate-950 bg-slate-950 text-white shadow-[0_4px_0_#09bc8a]"
                  : "border-slate-950/10 bg-white/75 text-slate-600"
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
            className="quest-card float-in rounded-3xl p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-black text-teal-800">
                  {skill.category}
                </span>
                <h2 className="mt-3 text-base font-black">{skill.title}</h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {skill.teacher} / {skill.deliveryType}
                </p>
              </div>
              <div className="rounded-2xl bg-amber-100 px-3 py-2 text-right text-amber-950">
                <p className="text-lg font-black">{skill.credits}</p>
                <p className="text-xs font-bold">credits</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 font-black text-amber-700">
                <Star size={15} fill="currentColor" aria-hidden="true" />
                {skill.rating}
              </span>
              <span className="font-medium text-slate-500">{skill.duration}</span>
              <button
                className="quest-button rounded-2xl px-4 py-2 font-black"
                onClick={() => onSelectSkill(skill)}
              >
                View
              </button>
            </div>
          </article>
        ))}
      </section>

      {filteredSkills.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No matching skills"
          description="Try a different search term or category filter."
        />
      ) : null}
    </div>
  );
}

export default MarketplacePage;
