import { CheckCircle2 } from "lucide-react";
import type { EarnTask } from "../types";

type EarnPageProps = {
  completedTaskIds: string[];
  tasks: EarnTask[];
  onCompleteTask: (task: EarnTask) => void;
};

function EarnPage({ completedTaskIds, tasks, onCompleteTask }: EarnPageProps) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const isCompleted = completedTaskIds.includes(task.id);

        return (
          <article
            key={task.id}
            className="rounded-lg border border-stone-200 bg-white p-4"
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  isCompleted
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-indigo-50 text-indigo-700"
                }`}
              >
                <CheckCircle2 size={19} aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{task.title}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {task.category} / {task.effort}
                </p>
              </div>
              <div className="text-right">
                <p className="text-base font-semibold text-emerald-700">
                  +{task.credits}
                </p>
                <p className="text-xs text-slate-500">credits</p>
              </div>
            </div>
            <button
              className={`mt-4 w-full rounded-lg px-4 py-3 text-sm font-semibold ${
                isCompleted
                  ? "bg-stone-200 text-slate-500"
                  : "border border-slate-950 text-slate-950"
              }`}
              disabled={isCompleted}
              onClick={() => onCompleteTask(task)}
            >
              {isCompleted ? "Completed" : "Complete task"}
            </button>
          </article>
        );
      })}
    </div>
  );
}

export default EarnPage;
