import { useCallback } from "react";
import { updateVotingStatus } from "@/lib/firebase/firestore";
import { PlanningPokerSession } from "@/types";

export function useUpdateVotingStatus({
  sessionId,
  votingStatus,
}: {
  sessionId: PlanningPokerSession["id"];
  votingStatus: PlanningPokerSession["votingStatus"];
}) {
  return useCallback(async () => {
    await updateVotingStatus({ sessionId, votingStatus });
  }, [sessionId, votingStatus]);
}
