import { CreateQuickPlanningPokerSession } from "@/components/CreateQuickPlanningPokerSession";
import { auth } from "@/firebase/auth";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24 bg-gradient-to-l from-white via-gray-200 to-white">
      <div className="flex justify-center">
        <div className="flex gap-2">
          <img src="logo.svg" className="w-6" />
          <span className="text-3xl font-extrabold leading-none tracking-tight">
            Poker
          </span>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 items-center">
            <h2 className="text-4xl font-extrabold leading-none tracking-tight">
              Rapid planning poker.
            </h2>
            <p>Get started by naming your session or use the default one.</p>
          </div>
          <CreateQuickPlanningPokerSession />
        </div>
      </div>
    </main>
  );
}
