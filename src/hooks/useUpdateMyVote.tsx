import { useCallback } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { PlanningPokerSession } from "@/types";
import { updateMyVote } from "@/lib/firebase/firestore";

export function useUpdateMyVote({
  sessionId,
  newVote,
}: {
  sessionId: PlanningPokerSession["id"];
  newVote?: string;
}) {
  const currentUser = useCurrentUser();

  return useCallback(async () => {
    if (currentUser) {
      await updateMyVote({
        sessionId,
        currentUser,
        newVote,
      });
    }
  }, [sessionId, currentUser, newVote]);
}
