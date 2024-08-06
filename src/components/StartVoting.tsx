import { useUpdateVotingStatus } from "@/hooks/useUpdateVotingStatus";
import { PlanningPokerSession } from "@/types";
import { Button } from "@nextui-org/react";

export function StartVoting({
  sessionId,
}: {
  sessionId: PlanningPokerSession["id"];
}) {
  const updateVotingStatus = useUpdateVotingStatus({
    sessionId,
    votingStatus: "started",
  });

  return (
    <Button
      className="h-auto"
      variant="solid"
      color="primary"
      onClick={updateVotingStatus}
    >
      Start voting
    </Button>
  );
}
