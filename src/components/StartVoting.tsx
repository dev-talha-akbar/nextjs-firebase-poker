import { useUpdateVotingStatus } from "@/hooks/useUpdateVotingStatus";
import { PlanningPokerSession } from "@/types";
import { Button } from "@nextui-org/react";

export function StartVoting({
  sessionId,
  isSelectingIssue,
}: {
  isSelectingIssue: boolean;
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
      isDisabled={isSelectingIssue}
      color="primary"
      onClick={updateVotingStatus}
    >
      Start voting
    </Button>
  );
}
