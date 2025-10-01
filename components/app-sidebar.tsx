import * as React from "react";

import { SearchForm } from "@/components/search-form";

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import type { getNotebooks } from "@/server/notebooks.server";
import { Image } from "@unpic/react";
import { SidebarData } from "./sidebar-data";
import { Link } from "react-router";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  notebooks: Awaited<ReturnType<typeof getNotebooks>>;
}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const notebooks = props.notebooks;

  const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
      ...(notebooks.notebooks?.map((notebook) => ({
        title: notebook.name,
        url: `/dashboard/${notebook.id}`,
        items: notebook.notes.map((note) => ({
          title: note.title,
          url: `/dashboard/notebook/${notebook.id}/note/${note.id}`,
        })),
      })) ?? []),
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link to="/dashboard" className="flex items-center gap-2 pl-2">
          <Image src="/noteforge-logo.png" alt="Logo" width={32} height={32} />
          <h2>NoteForge</h2>
        </Link>

        <React.Suspense>
          <SearchForm />
        </React.Suspense>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarData data={data} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
