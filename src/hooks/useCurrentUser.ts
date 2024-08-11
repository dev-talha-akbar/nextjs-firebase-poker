import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase/clientApp";

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User>();

  // TODO: Add service worker registration here

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setCurrentUser(user !== null && user.displayName ? user : undefined);
    });
  }, []);

  return currentUser;
}
