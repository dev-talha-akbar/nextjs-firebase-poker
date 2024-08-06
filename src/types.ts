import { User } from "firebase/auth";
export interface Participant {
  uid: User["uid"];
  displayName: User["displayName"];
}
export interface PlanningPokerSession {
  id: string;
  sessionName: string;
  owner: User["uid"];
  currentModerator: User["uid"];
  participants: Participant[];
  votingStatus: "new" | "started" | "ended";
  votes: Record<User["uid"], string>;
}
