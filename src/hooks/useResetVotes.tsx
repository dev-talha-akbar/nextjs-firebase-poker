import { db } from "@/firebase/db";
import { PlanningPokerSession } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";

export function useResetVotes({
  sessionId,
}: {
  sessionId: PlanningPokerSession["id"];
}) {
  const resetVotes = useCallback(async () => {
    await updateDoc(doc(db, "planning_poker_sessions", sessionId), {
      votingStatus: "new",
      votes: {},
    });
  }, [sessionId]);

  return resetVotes;
}
