import { useUpdateMyVote } from "@/hooks/useUpdateMyVote";
import { PlanningPokerSession } from "@/types";
import { Button } from "@nextui-org/react";

export function ResetMyVote({
  sessionId,
}: {
  sessionId: PlanningPokerSession["id"];
}) {
  const updateMyVote = useUpdateMyVote({
    sessionId,
    newVote: undefined,
  });

  return (
    <Button
      className="h-auto"
      variant="light"
      color="primary"
      onClick={updateMyVote}
    >
      Reset my vote
    </Button>
  );
}
