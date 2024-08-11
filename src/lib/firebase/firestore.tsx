import {
  addDoc,
  arrayUnion,
  collection,
  deleteField,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "./clientApp";
import { User } from "firebase/auth";
import { PlanningPokerSession } from "@/types";

export async function createSession({ currentUser }: { currentUser?: User }) {
  return await addDoc(collection(db, "planning_poker_sessions"), {
    sessionName: `Planning Poker | ${new Date().toLocaleDateString()}`,
    owner: currentUser?.uid,
    currentModerator: currentUser?.uid,
    participants: [],
    votes: {},
    votingStatus: "setTopic",
  });
}

export async function getSession({
  sessionId,
}: {
  sessionId: PlanningPokerSession["id"];
}) {
  const session = await getDoc(doc(db, "planning_poker_sessions", sessionId));

  return session.data() as PlanningPokerSession;
}

export async function joinSession({
  sessionId,
  currentUser,
}: {
  sessionId: PlanningPokerSession["id"];
  currentUser: User;
}) {
  await updateDoc(doc(db, "planning_poker_sessions", sessionId), {
    participants: arrayUnion({
      uid: currentUser.uid,
      displayName: currentUser.displayName,
    }),
  });
}

export async function setSessionTopic({
  sessionId,
  topicText,
}: {
  sessionId: PlanningPokerSession["id"];
  topicText: string;
}) {
  await updateDoc(doc(db, "planning_poker_sessions", sessionId), {
    currentTopic: topicText,
    votingStatus: "new",
  });
}

export async function resetSession({
  sessionId,
}: {
  sessionId: PlanningPokerSession["id"];
}) {
  await updateDoc(doc(db, "planning_poker_sessions", sessionId), {
    votingStatus: "setTopic",
    votes: {},
    currentTopic: "",
  });
}

export async function updateVotingStatus({
  sessionId,
  votingStatus,
}: {
  sessionId: PlanningPokerSession["id"];
  votingStatus: PlanningPokerSession["votingStatus"];
}) {
  await updateDoc(doc(db, "planning_poker_sessions", sessionId), {
    votingStatus,
  });
}

export async function updateMyVote({
  sessionId,
  currentUser,
  newVote,
}: {
  sessionId: PlanningPokerSession["id"];
  currentUser: User;
  newVote?: string;
}) {
  await updateDoc(doc(db, "planning_poker_sessions", sessionId), {
    [`votes.${currentUser.uid}`]:
      typeof newVote !== "undefined" ? newVote : deleteField(),
  });
}
