"use client";

import { Participant } from "@/components/Participant";
import { PokerContainer } from "@/components/PokerContainer";
import { SingleParticipantInfo } from "@/components/SingleParticipantInfo";
import { db } from "@/firebase/db";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { PlanningPokerSession } from "@/types";
import { Button, Chip, Input, Spinner } from "@nextui-org/react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

import { VotingControlPanel } from "@/components/VotingControlPanel";
import { copyInvitationToClipboard } from "@/utils/copyToClipboard";
import { JoinSession } from "@/components/JoinSession";
import { SetTopic } from "@/components/SetVotingTopic";

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
      if (
        typeof params.id === "string" &&
        currentUser &&
        currentUser.displayName
      ) {
        await updateDoc(doc(db, "planning_poker_sessions", params.id), {
          participants: arrayUnion({
            uid: currentUser.uid,
            displayName: currentUser.displayName,
          }),
        });
      }
    }

    joinSession();
  }, [params.id, currentUser, currentUser?.displayName]);

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

  const { participants, sessionName, votingStatus, currentModerator } = session;
  const isModerator = currentUser?.uid === currentModerator;

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-l from-white via-gray-200 to-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <h2 className="flex text-xl font-bold">Planning poker</h2>
            <Chip variant="light">
              <div className="flex gap-2">
                <span className="text-gray-600">Session</span>
                <span>{sessionName}</span>
              </div>
            </Chip>
          </div>
          <div className="flex gap-2">
            <Chip variant="bordered" color="primary">
              <div className="flex gap-2 items-center">
                <span>Topic</span>
                {votingStatus !== "setTopic" ? (
                  <span>{session.currentTopic}</span>
                ) : (
                  <Spinner size="sm" />
                )}
              </div>
            </Chip>
            <Chip variant="dot" color="success">
              {participants.length} participants
            </Chip>
            <Chip
              variant="bordered"
              className="cursor-pointer"
              onClick={copyInvitationToClipboard}
            >
              Copy invite
            </Chip>
          </div>
        </div>
        {currentUser && (
          <div className="flex flex-col">
            <Participant displayName={currentUser.displayName} />
          </div>
        )}
      </div>
      {!currentUser && <JoinSession />}
      {currentUser && participants.length === 1 && <SingleParticipantInfo />}
      {currentUser && participants.length > 1 && (
        <>
          <div className="flex flex-col flex-1 items-center justify-center gap-12">
            {isModerator && votingStatus === "setTopic" && (
              <SetTopic session={session} />
            )}
            {isModerator && votingStatus !== "setTopic" && (
              <PokerContainer session={session} />
            )}
            {!isModerator && <PokerContainer session={session} />}
          </div>
          <VotingControlPanel session={session} />
        </>
      )}
    </main>
  );
}
