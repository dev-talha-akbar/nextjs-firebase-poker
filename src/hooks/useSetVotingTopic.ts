import { db } from "@/firebase/db";
import { PlanningPokerSession } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";

export function useSetVotingTopic({
  sessionId,
  topicText,
}: {
  sessionId: PlanningPokerSession["id"];
  topicText: string;
}) {
  const setTopic = useCallback(async () => {
    await updateDoc(doc(db, "planning_poker_sessions", sessionId), {
      currentTopic: topicText,
      votingStatus: "new",
    });
  }, [sessionId, topicText]);

  return setTopic;
}
