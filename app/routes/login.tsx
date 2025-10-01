import { LoginForm } from "@/components/forms/login-form";
import { signInUser } from "@/server/users.server";
import { useEffect } from "react";
import type { Route } from "./+types/login";
import { toast } from "sonner";
import { useNavigate } from "react-router";
export const action = async ({ request }: Route.LoaderArgs) => {
  const formData = await request.formData();
  const values = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const response = await signInUser(values.email, values.password);
  return response;
};

export default function Page({ actionData }: Route.ComponentProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!actionData) {
      return;
    }
    if ("success" in actionData && !actionData.success) {
      toast.error(actionData.message);
    } else {
      navigate("/dashboard");
    }
  }, [actionData]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
