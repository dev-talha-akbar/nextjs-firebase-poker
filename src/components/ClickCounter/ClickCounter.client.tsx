"use client";

import { db } from "@/firebase/db";
import { Button } from "@nextui-org/react";
import { doc, increment, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const clicksDocRef = doc(db, "test", "clicks");

export const ClickCounter = ({ initialCount, incrementCount }: any) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "test", "clicks"), (doc) => {
      if (doc.exists()) {
        setCount(doc.get("count"));
      }
    });

    return unsub;
  }, []);

  return (
    <>
      <span>Click Count: {count}</span>
      <Button onClick={() => incrementCount()}>Click</Button>
    </>
  );
};
