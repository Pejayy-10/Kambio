import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <section className="rounded-lg border border-dashed border-stone-300 bg-white p-5 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-stone-100 text-slate-600">
        <Icon size={20} aria-hidden="true" />
      </div>
      <p className="mt-3 text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
    </section>
  );
}

export default EmptyState;
