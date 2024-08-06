import { useUpdateMyVote } from "@/hooks/useUpdateMyVote";
import { PlanningPokerSession } from "@/types";
import { Button } from "@nextui-org/react";

export function ConfirmMyVote({
  sessionId,
  selectedVote,
  isDisabled,
}: {
  sessionId: PlanningPokerSession["id"];
  selectedVote: string;
  isDisabled: boolean;
}) {
  const updateMyVote = useUpdateMyVote({
    sessionId,
    newVote: selectedVote,
  });

  return (
    <Button
      className="h-auto"
      variant={isDisabled ? "light" : "solid"}
      isDisabled={isDisabled}
      onClick={updateMyVote}
    >
      Confirm my vote
    </Button>
  );
}
