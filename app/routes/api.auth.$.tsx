// Adjust the path as necessary
import { auth } from "@/lib/auth";
import { Route } from "./+types/api.auth.$";

export async function loader({ request }: Route.LoaderArgs) {
  return auth.handler(request);
}
export async function action({ request }: Route.ActionArgs) {
  return auth.handler(request);
}
