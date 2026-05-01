import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <section className="quest-card float-in rounded-2xl border-dashed p-5 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-700 shadow-[0_4px_0_rgba(23,32,51,0.12)]">
        <Icon size={20} aria-hidden="true" />
      </div>
      <p className="mt-3 text-sm font-black">{title}</p>
      <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
    </section>
  );
}

export default EmptyState;
