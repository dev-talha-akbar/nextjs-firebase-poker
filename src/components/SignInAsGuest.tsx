import { auth } from "@/firebase/auth";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button, Input } from "@nextui-org/react";
import { signInAnonymously, updateProfile } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  displayName: string;
};

export function SignInAsGuest({
  onSignIn,
  mainActionText,
}: {
  mainActionText?: string;
  onSignIn?: () => void;
}) {
  const currentUser = useCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const signInAsGuest: SubmitHandler<Inputs> = async ({ displayName }) => {
    if (!auth.currentUser) {
      const credential = await signInAnonymously(auth);

      await updateProfile(credential.user, {
        displayName,
      });

      await credential.user.reload();
    } else {
      await updateProfile(auth.currentUser, {
        displayName,
      });

      await auth.currentUser.reload();
    }

    onSignIn?.();
  };

  return (
    <form
      onSubmit={handleSubmit(signInAsGuest)}
      className="flex justify-center gap-4"
    >
      <Input
        {...register("displayName")}
        label="Enter your name"
        placeholder="Others will see you by this name"
        className="w-96"
        defaultValue={currentUser?.displayName || ""}
      />

      <Button
        className="min-h-12 h-auto w-48"
        type="submit"
        variant="solid"
        color="primary"
      >
        {mainActionText || "Sign in"}
      </Button>
    </form>
  );
}
