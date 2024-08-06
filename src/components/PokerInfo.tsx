import { useCurrentUser } from "@/hooks/useCurrentUser";
import { PlanningPokerSession } from "@/types";
import { Chip } from "@nextui-org/react";
import { motion } from "framer-motion";

export function PokerInfo({ session }: { session: PlanningPokerSession }) {
  const currentUser = useCurrentUser();
  const { votingStatus, participants, votes } = session;

  const container = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { ease: "easeInOut" } },
  };

  return (
    <>
      {false && (
        <motion.div variants={item} className="flex gap-2">
          <span className="text-gray-600">Topic</span>
          <span className="text-primary">SPG-3894</span>
        </motion.div>
      )}

      {votingStatus === "new" && (
        <h2 className="text-xl font-bold leading-none tracking-tight">
          {participants.length} participants in this round. Voting yet to begin.
        </h2>
      )}
      {votingStatus === "started" && (
        <motion.div
          variants={container}
          initial="initial"
          animate="animate"
          transition={{ delay: 1, staggerChildren: 0.4 }}
          className="flex flex-col gap-8 items-center justify-center"
        >
          <motion.div variants={container} className="flex flex-col gap-4">
            <motion.div
              variants={item}
              className="flex gap-4 items-center justify-center"
            >
              <h2 className="text-xl text-center font-bold leading-none tracking-tight">
                Voting in progress
              </h2>

              <Chip variant="solid" color="primary">
                {Object.keys(votes).length}/{participants.length} voted
              </Chip>
            </motion.div>
            {currentUser && !votes[currentUser?.uid] && (
              <motion.p variants={item} className="text-sm text-gray-600">
                You have not yet voted. Choose your card at the bottom of the
                screen.
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
      {votingStatus === "ended" && (
        <motion.div variants={container} initial="initial" animate="animate">
          <motion.div
            variants={item}
            className="flex gap-4 items-center justify-center"
          >
            <h2 className="text-xl text-center font-bold leading-none tracking-tight">
              Voting ended
            </h2>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
