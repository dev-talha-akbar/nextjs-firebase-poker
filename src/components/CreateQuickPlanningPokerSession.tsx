"use client";

import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/db";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/auth";
import { SignInAsGuest } from "./SignInAsGuest";

export function CreateQuickPlanningPokerSession() {
  const router = useRouter();

  const createSession = async () => {
    const session = await addDoc(collection(db, "planning_poker_sessions"), {
      sessionName: `Planning Poker | ${new Date().toLocaleDateString()}`,
      owner: auth.currentUser?.uid,
      currentModerator: auth.currentUser?.uid,
      participants: [],
      votes: {},
      votingStatus: "new",
    });

    router.push(`/planning-poker/${session.id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 w-[600px] items-center">
        <h2 className="text-4xl font-extrabold leading-none tracking-tight">
          Rapid planning poker.
        </h2>
        <p>
          With almost just a click, get your very own planning poker session and
          invite your team members.
        </p>
      </div>
      <SignInAsGuest mainActionText="Create session" onSignIn={createSession} />
    </div>
  );
}
