"use client";

import { Button, Card, CardBody, Input, User } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/db";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/auth";
import { signInAnonymously, updateProfile } from "firebase/auth";
import { useCurrentUser } from "@/hooks/useCurrentUser";

type Inputs = {
  displayName: string;
};

export function CreateQuickPlanningPokerSession() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const currentUser = useCurrentUser();
  const router = useRouter();

  const createSession: SubmitHandler<Inputs> = async ({ displayName }) => {
    if (!auth.currentUser) {
      await signInAnonymously(auth);
    }

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
    }

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
      <form
        onSubmit={handleSubmit(createSession)}
        className="flex justify-center gap-4"
      >
        <Input
          {...register("displayName")}
          label="Enter your name"
          placeholder="Others will see you by this name"
          className="w-96"
          value={currentUser?.displayName || ""}
        />

        <Button
          className="min-h-12 h-auto w-48"
          type="submit"
          variant="solid"
          color="primary"
        >
          Start session
        </Button>
      </form>
    </div>
  );
}
