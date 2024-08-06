import { PlanningPokerSession } from "@/types";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { EndVoting } from "./EndVoting";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { StartVoting } from "./StartVoting";
import { ResetVotes } from "./ResetVotes";
import { ConfirmMyVote } from "./ConfirmMyVote";
import { ResetMyVote } from "./ResetMyVote";
import { useState } from "react";

export function VotingControlPanel({
  session,
}: {
  session: PlanningPokerSession;
}) {
  const { votingStatus, votes, currentModerator, participants } = session;

  const currentUser = useCurrentUser();
  const isModerator = currentModerator === currentUser?.uid;
  const isMyVoteConfirmed = currentUser ? !!votes[currentUser?.uid] : false;
  const hasEveryoneVoted = participants
    .map((participant) => votes[participant.uid])
    .every((vote) => typeof vote !== "undefined");

  const [selectedVote, setSelectedVote] = useState<string>("");

  return (
    <div className="flex sticky bottom-0 py-12 justify-center">
      <Card>
        <CardBody>
          <div className="flex gap-4">
            {isModerator && (
              <>
                {votingStatus === "new" && (
                  <StartVoting sessionId={session.id} />
                )}
                {votingStatus === "started" && (
                  <EndVoting
                    sessionId={session.id}
                    hasEveryoneVoted={hasEveryoneVoted}
                  />
                )}
                {votingStatus === "ended" && (
                  <ResetVotes
                    sessionId={session.id}
                    onClick={() => setSelectedVote("")}
                  />
                )}
                <Divider className="mx-2" orientation="vertical" />
              </>
            )}

            <Select
              key={votingStatus}
              className="w-64"
              label="Select your card"
              isDisabled={votingStatus !== "started" || isMyVoteConfirmed}
              value={selectedVote}
              onChange={(e) => setSelectedVote(e.target.value)}
            >
              <SelectItem key={1}>1</SelectItem>
              <SelectItem key={2}>2</SelectItem>
            </Select>
            {votingStatus === "started" && isMyVoteConfirmed ? (
              <ResetMyVote sessionId={session.id} />
            ) : (
              <ConfirmMyVote
                sessionId={session.id}
                selectedVote={selectedVote as string}
                isDisabled={votingStatus !== "started"}
              />
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
