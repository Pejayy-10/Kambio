import { Coins } from "lucide-react";

function LoadingPage() {
  return (
    <main className="app-stage min-h-screen px-6 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-between py-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bob flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-200 to-lime-200 text-slate-950 shadow-[0_6px_0_#172033]">
              <Coins size={22} aria-hidden="true" />
            </div>
            <div>
              <p className="text-lg font-black text-slate-950">Kambio</p>
              <p className="text-sm font-bold text-slate-600">
                Skill credit exchange
              </p>
            </div>
          </div>
          <span className="h-3 w-3 rounded-full bg-teal-400 shadow-[0_0_0_6px_rgba(20,184,166,0.18)]" />
        </div>

        <div className="quest-card-dark float-in rounded-3xl p-6">
          <p className="text-sm font-black uppercase text-amber-200">
            Loading workspace
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight">
            Charging your skill quest board.
          </h1>
          <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="loading-bar h-full w-2/3 rounded-full bg-gradient-to-r from-teal-300 via-lime-300 to-amber-300" />
          </div>
        </div>

        <p className="rounded-2xl bg-white/70 p-4 text-sm font-medium leading-6 text-slate-600 shadow-[0_8px_0_rgba(23,32,51,0.06)]">
          Simulating marketplace data, wallet balance, and community tasks for
          the presentation prototype.
        </p>
      </section>
    </main>
  );
}

export default LoadingPage;
