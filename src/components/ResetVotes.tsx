import { useResetVotes } from "@/hooks/useResetVotes";
import { useUpdateVotingStatus } from "@/hooks/useUpdateVotingStatus";
import { PlanningPokerSession } from "@/types";
import { Button } from "@nextui-org/react";

export function ResetVotes({
  sessionId,
}: {
  sessionId: PlanningPokerSession["id"];
}) {
  const resetVotes = useResetVotes({
    sessionId,
  });

  return (
    <Button
      className="h-auto"
      variant="solid"
      color="primary"
      onClick={resetVotes}
    >
      Reset
    </Button>
  );
}
