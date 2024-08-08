import { useUpdateVotingStatus } from "@/hooks/useUpdateVotingStatus";
import { PlanningPokerSession } from "@/types";
import { Button } from "@nextui-org/react";

export function EndVoting({
  hasEveryoneVoted,
  sessionId,
}: {
  hasEveryoneVoted: boolean;
  sessionId: PlanningPokerSession["id"];
}) {
  const updateVotingStatus = useUpdateVotingStatus({
    sessionId,
    votingStatus: "ended",
  });

  return (
    <Button
      className="h-auto"
      color="primary"
      variant={!hasEveryoneVoted ? "light" : "solid"}
      onClick={updateVotingStatus}
    >
      End voting
    </Button>
  );
}
