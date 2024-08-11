import { useCallback } from "react";
import { setSessionTopic } from "@/lib/firebase/firestore";
import { PlanningPokerSession } from "@/types";

export function useSetVotingTopic({
  sessionId,
  topicText,
}: {
  sessionId: PlanningPokerSession["id"];
  topicText: string;
}) {
  return useCallback(async () => {
    await setSessionTopic({ sessionId, topicText });
  }, [sessionId, topicText]);
}
