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
  const isDisabled = !hasEveryoneVoted;
  const updateVotingStatus = useUpdateVotingStatus({
    sessionId,
    votingStatus: "ended",
  });

  return (
    <Button
      className="h-auto"
      color="primary"
      variant={isDisabled ? "light" : "solid"}
      isDisabled={isDisabled}
      onClick={updateVotingStatus}
    >
      End voting
    </Button>
  );
}
