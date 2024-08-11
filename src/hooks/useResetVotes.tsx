import { useCallback } from "react";
import { resetSession } from "@/lib/firebase/firestore";
import { PlanningPokerSession } from "@/types";

export function useResetVotes({
  sessionId,
}: {
  sessionId: PlanningPokerSession["id"];
}) {
  return useCallback(async () => {
    await resetSession({ sessionId });
  }, [sessionId]);
}
