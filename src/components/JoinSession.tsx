"use client";

import { SignInAsGuest } from "./SignInAsGuest";

export function JoinSession() {
  return (
    <div className="flex flex-1 items-center justify-center ">
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-extrabold leading-none text-center tracking-tight">
          Before you join
        </h2>
        <p className="text-center">
          Before you can join the session, please enter your name to help others
          identify you.
        </p>
        <SignInAsGuest
          onSignIn={() => window.location.reload()}
          mainActionText="Join session"
        />
      </div>
    </div>
  );
}
