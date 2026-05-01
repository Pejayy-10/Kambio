import { CheckCircle2, Zap } from "lucide-react";
import type { EarnTask } from "../types";

type EarnPageProps = {
  completedTaskIds: string[];
  tasks: EarnTask[];
  onCompleteTask: (task: EarnTask) => void;
};

function EarnPage({ completedTaskIds, tasks, onCompleteTask }: EarnPageProps) {
  const allTasksCompleted = completedTaskIds.length === tasks.length;

  return (
    <div className="space-y-3">
      <section className="quest-card-dark float-in rounded-3xl p-5 text-white">
        <p className="flex items-center gap-1.5 text-xs font-black uppercase text-amber-200">
          <Zap size={14} aria-hidden="true" />
          Bounty board
        </p>
        <h2 className="mt-2 text-2xl font-black leading-tight">
          Complete micro-quests to refill your credit stash.
        </h2>
      </section>

      {allTasksCompleted ? (
        <section className="rounded-3xl border border-teal-200 bg-teal-50 p-4 shadow-[0_6px_0_rgba(23,32,51,0.06)]">
          <p className="text-sm font-black text-teal-900">
            All available tasks are complete.
          </p>
          <p className="mt-1 text-sm font-medium leading-6 text-teal-800">
            Your earned credits were added to the wallet for this demo session.
          </p>
        </section>
      ) : null}

      {tasks.map((task) => {
        const isCompleted = completedTaskIds.includes(task.id);

        return (
          <article
            key={task.id}
            className="quest-card float-in rounded-3xl p-4"
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-[0_4px_0_rgba(23,32,51,0.1)] ${
                  isCompleted
                    ? "bg-teal-100 text-teal-700"
                    : "bg-cyan-100 text-cyan-700"
                }`}
              >
                <CheckCircle2 size={19} aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black">{task.title}</p>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {task.category} / {task.effort}
                </p>
              </div>
              <div className="text-right">
                <p className="text-base font-black text-teal-700">
                  +{task.credits}
                </p>
                <p className="text-xs font-bold text-slate-500">credits</p>
              </div>
            </div>
            <button
              className={`mt-4 w-full rounded-2xl px-4 py-3 text-sm font-black ${
                isCompleted
                  ? "bg-stone-200 text-slate-500"
                  : "quest-button"
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
