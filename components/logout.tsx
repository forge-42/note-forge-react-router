"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

export function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authClient.signOut();
    navigate("/");
  };

  return (
    <Button variant={"outline"} onClick={handleLogout}>
      Logout
    </Button>
  );
}
