import { createAuthClient } from "better-auth/react";

const polyEnv = typeof window !== "undefined" ? window.env : process.env;

export const authClient = createAuthClient({
  baseURL: polyEnv.baseUrl,
});
