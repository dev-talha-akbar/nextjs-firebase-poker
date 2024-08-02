import { db } from "@/firebase/db";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { ClickCounter } from "./ClickCounter.client";

const clicksDocRef = doc(db, "test", "clicks");

export default async function ClickCounterContainer() {
  async function getInitialCount() {
    const doc = await getDoc(clicksDocRef);

    if (doc.exists()) {
      return doc.get("count");
    }
  }

  async function incrementCount() {
    "use server";
    await updateDoc(clicksDocRef, {
      count: increment(1),
    });
  }

  const initialCount = await getInitialCount();

  return (
    <ClickCounter initialCount={initialCount} incrementCount={incrementCount} />
  );
}
