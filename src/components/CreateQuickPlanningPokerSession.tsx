"use client";

import { useRouter } from "next/navigation";
import { SignInAsGuest } from "./SignInAsGuest";
import { createSession } from "@/lib/firebase/firestore";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export function CreateQuickPlanningPokerSession() {
  const router = useRouter();
  const currentUser = useCurrentUser();

  const handleSignIn = async () => {
    const session = await createSession({
      currentUser,
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
      <SignInAsGuest mainActionText="Create session" onSignIn={handleSignIn} />
    </div>
  );
}
