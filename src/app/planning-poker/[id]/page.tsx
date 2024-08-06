"use client";

import { Participant } from "@/components/Participant";
import { PokerCard } from "@/components/PokerCard";
import { VotingControlPanel } from "@/components/VotingControlPanel";
import { db } from "@/firebase/db";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { PlanningPokerSession } from "@/types";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
  Input,
  Select,
  SelectItem,
  Spinner,
  User,
} from "@nextui-org/react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

export default function PlanningPoker({ params }: { params: any }) {
  const [session, setSession] = useState<PlanningPokerSession>();

  const currentUser = useCurrentUser();

  useEffect(() => {
    async function getSession() {
      if (typeof params.id === "string") {
        const sessionDoc = await getDoc(
          doc(db, "planning_poker_sessions", params.id)
        );
        setSession({
          id: params.id,
          ...sessionDoc.data(),
        } as PlanningPokerSession);
      }
    }

    getSession();
  }, [params.id]);

  useEffect(() => {
    async function joinSession() {
      if (typeof params.id === "string" && currentUser) {
        await updateDoc(doc(db, "planning_poker_sessions", params.id), {
          participants: arrayUnion({
            uid: currentUser.uid,
            displayName: currentUser.displayName,
          }),
        });
      }
    }

    joinSession();
  }, [params.id, currentUser]);

  useEffect(() => {
    return onSnapshot(
      doc(db, "planning_poker_sessions", params.id),
      (sessionDoc) => {
        setSession({
          id: params.id,
          ...sessionDoc.data(),
        } as PlanningPokerSession);
      }
    );
  }, [params.id]);

  if (!session) {
    return;
  }

  const { participants, votingStatus, votes, currentModerator, sessionName } =
    session;

  const container = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { ease: "easeInOut" } },
  };

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-l from-white via-gray-200 to-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex flex-col gap-1 p-4">
          <h2 className="text-xl font-bold">
            Planning poker <Chip>{participants.length} participants</Chip>
          </h2>
          <div className="flex gap-2">
            <span className="text-gray-600">Session</span>
            <span>{sessionName}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <Participant displayName={currentUser?.displayName || ""} />
        </div>
      </div>
      {participants.length === 1 && (
        <div className="flex flex-1 items-center justify-center ">
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-extrabold leading-none tracking-tight">
              Nobody here beside you.
            </h2>
            <p>
              Before you can begin voting, you need to invite other
              participants.
            </p>
            <div className="flex gap-2">
              <Input value={window.location.href} />
              <Button variant="bordered" color="primary">
                Copy invitation
              </Button>
            </div>
          </div>
        </div>
      )}
      {participants.length > 1 && (
        <div className="flex flex-col flex-1 items-center justify-center gap-12">
          {votingStatus === "new" && (
            <h2 className="text-xl font-bold leading-none tracking-tight">
              {participants.length} participants in this round. Voting yet to
              begin.
            </h2>
          )}
          {votingStatus === "started" && (
            <motion.div
              variants={container}
              initial="initial"
              animate="animate"
              transition={{ delay: 1, staggerChildren: 0.4 }}
              className="flex flex-col gap-8 items-center justify-center"
            >
              <motion.div variants={item} className="flex gap-2">
                <span className="text-gray-600">Topic</span>
                <span className="text-primary">SPG-3894</span>
              </motion.div>
              <motion.div variants={container} className="flex flex-col gap-4">
                <motion.div
                  variants={item}
                  className="flex gap-4 items-center justify-center"
                >
                  <h2 className="text-xl text-center font-bold leading-none tracking-tight">
                    Voting in progress
                  </h2>

                  <Chip variant="solid" color="primary">
                    {Object.keys(votes).length}/{participants.length} voted
                  </Chip>
                </motion.div>
                <motion.p variants={item} className="text-sm text-gray-600">
                  You have not yet voted. Choose your card at the bottom of the
                  screen.
                </motion.p>
              </motion.div>
            </motion.div>
          )}
          <motion.div
            layout
            className="flex flex-wrap justify-center max-w-[700px] gap-12"
          >
            {participants.map(({ uid, displayName }) => (
              <div key={uid} className="flex flex-col items-center gap-4">
                {["started", "ended", "review"].includes(votingStatus) && (
                  <PokerCard revealed={votingStatus === "ended"}>
                    {votes[uid]}
                  </PokerCard>
                )}
                <div className="flex justify-between h-12 gap-4">
                  <Participant
                    displayName={displayName}
                    description={
                      currentModerator === uid ? "Moderator" : "Participant"
                    }
                    classNames={{
                      name: votingStatus === "ended" ? "font-bold" : "",
                    }}
                  />
                  {votingStatus === "started" && !votes[uid] && (
                    <Spinner size="sm" color="primary" />
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}
      <VotingControlPanel session={session} />
    </main>
  );
}
