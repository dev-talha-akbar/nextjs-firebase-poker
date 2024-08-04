"use client";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
  Input,
  Select,
  SelectItem,
  Spinner,
  User,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PlanningPoker() {
  const participants: number = 2;
  const [isVoting, setIsVoting] = useState(false);
  const [votingEnded, setVotingEnded] = useState(false);
  const [voteSubmitted, setVoteSubmitted] = useState(false);

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
    <main className="flex flex-col min-h-screen bg-gradient-to-l from-white via-gray-200 to-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex flex-col gap-1 p-4">
          <h2 className="text-xl font-bold">
            Planning poker <Chip>1 participants</Chip>
          </h2>
          <div className="flex gap-2">
            <span className="text-gray-600">Session</span>
            <span>Planning poker | 03/08/2024</span>
          </div>
        </div>
        <div className="flex flex-col">
          <User name="Jane Doe" />
        </div>
      </div>
      {participants === 1 && (
        <div className="flex flex-1 items-center justify-center ">
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-extrabold leading-none tracking-tight">
              Nobody here beside you.
            </h2>
            <p>
              Before you can begin voting, you need to invite other
              participants.
            </p>
            <div className="flex gap-2">
              <Input value={window.location.href} />
              <Button variant="bordered" color="primary">
                Copy invitation
              </Button>
            </div>
          </div>
        </div>
      )}
      {participants === 2 && (
        <div className="flex flex-col flex-1 items-center justify-center gap-12">
          {!isVoting && (
            <h2 className="text-xl font-bold leading-none tracking-tight">
              2 participants in this round. Voting yet to begin.
            </h2>
          )}
          {isVoting && (
            <motion.div
              variants={container}
              initial="initial"
              animate="animate"
              transition={{ delay: 1, staggerChildren: 0.4 }}
              className="flex flex-col gap-8 items-center justify-center"
            >
              <motion.div variants={item} className="flex gap-2">
                <span className="text-gray-600">Topic</span>
                <span className="text-primary">SPG-3894</span>
              </motion.div>
              <motion.div variants={container} className="flex flex-col gap-4">
                <motion.div
                  variants={item}
                  className="flex gap-4 items-center justify-center"
                >
                  <h2 className="text-xl text-center font-bold leading-none tracking-tight">
                    Voting in progress
                  </h2>

                  <Chip variant="solid" color="primary">
                    2/5 voted
                  </Chip>
                </motion.div>
                <motion.p variants={item} className="text-sm text-gray-600">
                  You have not yet voted. Choose your card at the bottom of the
                  screen.
                </motion.p>
              </motion.div>
            </motion.div>
          )}
          <motion.div
            layout
            className="flex flex-wrap justify-center max-w-[700px] gap-12"
          >
            {Array(5)
              .fill("")
              .map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  {isVoting && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <div className={`card ${votingEnded ? "revealed" : ""}`}>
                        <div className="front">
                          <div className="main suit">13</div>
                        </div>
                        <div className="back"></div>
                      </div>
                    </motion.div>
                  )}
                  <div className="flex justify-between h-12 gap-4">
                    <User
                      name="Jane Smith Doe"
                      description="Moderator"
                      classNames={{ name: votingEnded ? "font-bold" : "" }}
                    />
                    {isVoting && !votingEnded && (
                      <Spinner size="sm" color="primary" />
                    )}
                  </div>
                </div>
              ))}
          </motion.div>
        </div>
      )}
      <div className="flex sticky bottom-0 py-12 justify-center">
        <Card>
          <CardBody>
            <div className="flex gap-4">
              <Button
                className="h-14"
                onClick={() => {
                  if (!isVoting) {
                    setIsVoting(true);
                  } else {
                    setVotingEnded(true);
                  }
                }}
                variant={
                  !isVoting || (isVoting && voteSubmitted) ? "solid" : "light"
                }
                color="primary"
                isDisabled={isVoting && !voteSubmitted}
              >
                {!isVoting ? "Begin voting" : "End voting"}
              </Button>
              <Divider className="mx-2" orientation="vertical" />
              <Select
                className="w-64"
                label="Select your card"
                isDisabled={!isVoting || voteSubmitted}
              >
                <SelectItem key={1}>1</SelectItem>
                <SelectItem key={2}>2</SelectItem>
              </Select>
              <Button
                className="h-14"
                variant={isVoting && !voteSubmitted ? "solid" : "light"}
                color="primary"
                isDisabled={!isVoting || votingEnded}
                onClick={() => setVoteSubmitted(!voteSubmitted)}
              >
                {voteSubmitted && !votingEnded ? "Retract vote" : "Submit vote"}
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
