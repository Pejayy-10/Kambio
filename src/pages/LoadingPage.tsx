import { Coins } from "lucide-react";

function LoadingPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-between py-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400 text-slate-950">
              <Coins size={22} aria-hidden="true" />
            </div>
            <div>
              <p className="text-lg font-semibold">Kambio</p>
              <p className="text-sm text-slate-300">Skill credit exchange</p>
            </div>
          </div>
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase text-emerald-300">
            Loading workspace
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight">
            Preparing your exchange dashboard.
          </h1>
          <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-emerald-300 loading-bar" />
          </div>
        </div>

        <p className="text-sm leading-6 text-slate-300">
          Simulating marketplace data, wallet balance, and community tasks for
          the presentation prototype.
        </p>
      </section>
    </main>
  );
}

export default LoadingPage;
