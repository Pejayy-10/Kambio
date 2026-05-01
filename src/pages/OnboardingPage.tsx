import { ArrowRight, BookOpen, Coins, Handshake } from "lucide-react";
import { useState } from "react";

type OnboardingPageProps = {
  onDone: () => void;
};

const slides = [
  {
    title: "Exchange skills without direct barter.",
    description:
      "Kambio uses skill credits so teaching and learning do not need to happen between the same two people.",
    icon: Handshake,
  },
  {
    title: "Earn credits by contributing.",
    description:
      "Teach a topic, complete micro-tasks, or support a peer to build your balance.",
    icon: Coins,
  },
  {
    title: "Spend credits when you need help.",
    description:
      "Browse peer listings, request sessions, and track every credit movement in your wallet.",
    icon: BookOpen,
  },
];

function OnboardingPage({ onDone }: OnboardingPageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];
  const Icon = activeSlide.icon;
  const isLastSlide = activeIndex === slides.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      onDone();
      return;
    }

    setActiveIndex((currentIndex) => currentIndex + 1);
  };

  return (
    <main className="app-stage min-h-screen px-5 text-slate-950">
      <section className="mx-auto flex min-h-screen w-full max-w-md flex-col py-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-black uppercase text-teal-700">
            Kambio Quest
          </p>
          <button
            type="button"
            className="rounded-2xl px-3 py-2 text-sm font-black text-slate-500"
            onClick={onDone}
          >
            Skip
          </button>
        </div>

        <div className="mt-12 flex flex-1 flex-col justify-center">
          <div className="bob flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-950 text-white shadow-[0_8px_0_#09bc8a]">
            <Icon size={34} aria-hidden="true" />
          </div>
          <h1 className="mt-8 text-4xl font-black leading-tight">
            {activeSlide.title}
          </h1>
          <p className="mt-4 text-base font-medium leading-7 text-slate-600">
            {activeSlide.description}
          </p>
        </div>

        <div>
          <div className="mb-5 flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={`h-2 flex-1 rounded-full ${
                  index === activeIndex
                    ? "bg-gradient-to-r from-teal-400 to-amber-300"
                    : "bg-slate-950/12"
                }`}
                aria-label={`View onboarding step ${index + 1}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="quest-button flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-4 text-sm font-black"
            onClick={handleNext}
          >
            {isLastSlide ? "Continue" : "Next"}
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
}

export default OnboardingPage;
