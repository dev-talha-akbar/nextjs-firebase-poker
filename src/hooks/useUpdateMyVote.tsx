import { db } from "@/firebase/db";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { PlanningPokerSession } from "@/types";

export function useUpdateMyVote({
  sessionId,
  newVote,
}: {
  sessionId: PlanningPokerSession["id"];
  newVote?: string;
}) {
  const currentUser = useCurrentUser();
  const updateMyVote = useCallback(async () => {
    if (currentUser) {
      await updateDoc(doc(db, "planning_poker_sessions", sessionId), {
        [`votes.${currentUser.uid}`]:
          typeof newVote !== "undefined" ? newVote : deleteField(),
      });
    }
  }, [sessionId, currentUser, newVote]);

  return updateMyVote;
}
