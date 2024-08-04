import { CreateQuickPlanningPokerSession } from "@/components/CreateQuickPlanningPokerSession";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col gap-6">
        <div className="flex justify-center">
          <img src="wellplanned.svg" className="w-48" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-extrabold leading-none tracking-tight">
            Shazam, into planning poker.
          </h2>
          <p>Get started by naming your session or use the default one.</p>
        </div>
        <CreateQuickPlanningPokerSession />
      </div>
    </main>
  );
}
