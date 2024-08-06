"use client";

import { copyInvitationToClipboard } from "@/utils/copyToClipboard";
import { Button, Input } from "@nextui-org/react";

export function SingleParticipantInfo() {
  return (
    <div className="flex flex-1 items-center justify-center ">
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-extrabold leading-none tracking-tight">
          Nobody here beside you.
        </h2>
        <p>
          Before you can begin voting, you need to invite other participants.
        </p>
        <div className="flex gap-2">
          <Input value={window.location.href} isReadOnly />
          <Button
            variant="bordered"
            color="primary"
            onClick={copyInvitationToClipboard}
          >
            Copy invitation
          </Button>
        </div>
      </div>
    </div>
  );
}
