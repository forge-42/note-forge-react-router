import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getNotebooks } from "@/server/notebooks.server";
import { href, Outlet, redirect } from "react-router";
import { Route } from "./+types/_dashboard";
import { auth } from "@/lib/auth";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const notebooks = await getNotebooks(request);
  return { notebooks };
};
export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  return (
    <SidebarProvider>
      <AppSidebar notebooks={loaderData.notebooks} />
      <main className="flex-1">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export const middleware: Route.MiddlewareFunction[] = [
  async ({ request }, next) => {
    const session = await auth.api.getSession(request);
    if (!session) {
      return redirect(href("/login"));
    }
    return next();
  },
];
