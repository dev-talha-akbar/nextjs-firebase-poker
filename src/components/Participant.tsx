import { User } from "@nextui-org/react";

export function Participant({
  displayName,
  ...userProps
}: {
  displayName: string | null;
  [x: string]: any;
}) {
  return (
    <User
      name={displayName}
      avatarProps={{
        showFallback: true,
        name: displayName
          ?.split(" ")
          .map((name) => name?.[0]?.toUpperCase())
          .join(""),
      }}
      {...userProps}
    />
  );
}
