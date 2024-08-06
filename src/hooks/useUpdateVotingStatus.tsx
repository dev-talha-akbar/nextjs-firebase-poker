import { db } from "@/firebase/db";
import { PlanningPokerSession } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";

export function useUpdateVotingStatus({
  sessionId,
  votingStatus,
}: {
  sessionId: PlanningPokerSession["id"];
  votingStatus: PlanningPokerSession["votingStatus"];
}) {
  const updateVotingStatus = useCallback(async () => {
    await updateDoc(doc(db, "planning_poker_sessions", sessionId), {
      votingStatus,
    });
  }, [sessionId, votingStatus]);

  return updateVotingStatus;
}
