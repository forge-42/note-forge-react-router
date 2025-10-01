import { SignupForm } from "@/components/forms/signup-form";
import { Route } from "./+types/signup";
import { signUpUser } from "@/server/users.server";
import { useEffect } from "react";
import { toast } from "sonner";

export const action = async ({ request }: Route.LoaderArgs) => {
  const formData = await request.formData();
  const values = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
  };
  const response = await signUpUser(values.email, values.password, values.name);
  return response;
};

export default function Page({ actionData }: Route.ComponentProps) {
  useEffect(() => {
    if (!actionData) {
      return;
    }
    if (actionData.success) {
      toast.success("Please check your email for verification.");
    } else {
      toast.error(actionData.message);
    }
  }, [actionData]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
