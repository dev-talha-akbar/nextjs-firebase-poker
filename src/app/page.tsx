import { CreateQuickPlanningPokerSession } from "@/components/CreateQuickPlanningPokerSession";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24 bg-gradient-to-t from-white via-gray-200 to-white">
      <div className="flex justify-center">
        <div className="flex gap-2">
          <img src="logo.svg" className="w-6" />
          <span className="text-3xl font-extrabold leading-none tracking-tight">
            Poker
          </span>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <CreateQuickPlanningPokerSession />
      </div>
    </main>
  );
}
