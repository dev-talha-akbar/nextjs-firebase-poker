import { useSetVotingTopic } from "@/hooks/useSetVotingTopic";
import { PlanningPokerSession } from "@/types";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

export function SetTopic({ session }: { session: PlanningPokerSession }) {
  const [topicText, setTopicText] = useState("");
  const setVotingTopic = useSetVotingTopic({
    sessionId: session.id,
    topicText,
  });
  return (
    <div className="flex max-w-[500px] flex-col gap-6 items-center">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-xl font-bold leading-none tracking-tight">
          For what will you play poker now?
        </h2>
        <p>
          Before you begin voting, specify a topic for the upcoming voting
          rounds.
        </p>
      </div>
      <div className="flex gap-2">
        <Input
          className="w-[360px]"
          label="Topic"
          placeholder="Type anything or paste a link to a issue"
          onChange={(e) => setTopicText(e.target.value)}
        />
        <Button
          className="w-32 h-auto"
          variant="solid"
          color="primary"
          onClick={setVotingTopic}
        >
          Set topic
        </Button>
      </div>
    </div>
  );
}
