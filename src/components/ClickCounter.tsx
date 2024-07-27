"use client";

import { db } from "@/firebase/db";
import { Button } from "@nextui-org/react";
import { doc, increment, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const clicksDocRef = doc(db, "test", "clicks");

export const ClickCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(clicksDocRef, (doc) => {
      const clicksDoc = doc.data();

      if (typeof clicksDoc !== "undefined") {
        console.log("Clicks document: ", clicksDoc);
        setCount(clicksDoc.count);
      } else {
        throw new Error("Could not find clicks document in test collection");
      }
    });

    return unsub;
  });

  return (
    <>
      <span>Click Count: {count}</span>
      <Button
        onClick={async () => {
          await updateDoc(clicksDocRef, {
            count: increment(1),
          });
        }}
      >
        Click
      </Button>
    </>
  );
};
