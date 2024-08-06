import { auth } from "@/firebase/auth";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  return currentUser;
}
