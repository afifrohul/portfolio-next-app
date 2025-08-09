import { createClient } from "@/lib/supabase/server";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NextTopLoader from "nextjs-toploader";

export default async function AdminLayout({ children }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <SidebarProvider>
        <AppSidebar user={null} />
        <main className="w-full h-full">
          <div>{children}</div>
        </main>
      </SidebarProvider>
    );
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  const userWithProfile = {
    ...user,
    profile: profile ?? null,
  };

  return (
    <SidebarProvider>
      <AppSidebar user={userWithProfile} />
      <main className="w-full h-full">
        <NextTopLoader color="#64748b" />
        <div>{children}</div>
      </main>
    </SidebarProvider>
  );
}
