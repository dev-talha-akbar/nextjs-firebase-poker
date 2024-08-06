import { PlanningPokerSession } from "@/types";
import { PokerInfo } from "./PokerInfo";
import { PokerCard } from "./PokerCard";
import { Participant } from "./Participant";
import { motion } from "framer-motion";
import { Spinner } from "@nextui-org/react";

export function PokerContainer({ session }: { session: PlanningPokerSession }) {
  const { participants, votingStatus, votes, currentModerator } = session;
  return (
    <>
      <PokerInfo session={session} />
      <motion.div
        layout
        className="flex flex-wrap justify-center max-w-[700px] gap-12"
      >
        {participants.map(({ uid, displayName }) => (
          <div key={uid} className="flex flex-col items-center gap-4">
            {["started", "ended", "review"].includes(votingStatus) && (
              <PokerCard revealed={votingStatus === "ended"}>
                {votes[uid]}
              </PokerCard>
            )}
            <div className="flex justify-between h-12 gap-4">
              <Participant
                displayName={displayName}
                description={
                  currentModerator === uid ? "Moderator" : "Participant"
                }
                classNames={{
                  name: votingStatus === "ended" ? "font-bold" : "",
                }}
              />
              {votingStatus === "started" && !votes[uid] && (
                <Spinner size="sm" color="primary" />
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
}
