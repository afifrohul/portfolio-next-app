import { SiteHeader } from "@/components/site-header";
import {
  CircleUserRoundIcon,
  CogIcon,
  FolderGit2Icon,
  GraduationCapIcon,
  TableOfContentsIcon,
  UserPenIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import DashboardCard from "@/components/dashboard-card";

export default async function Dashboard() {
  const supabase = await createClient();

  const [profiles, abouts, educations, experiences, skills, projects] =
    await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("abouts").select("*", { count: "exact", head: true }),
      supabase.from("educations").select("*", { count: "exact", head: true }),
      supabase.from("experiences").select("*", { count: "exact", head: true }),
      supabase.from("skills").select("*", { count: "exact", head: true }),
      supabase.from("projects").select("*", { count: "exact", head: true }),
    ]);

  const counts = {
    profiles: profiles.count ?? 0,
    abouts: abouts.count ?? 0,
    educations: educations.count ?? 0,
    experiences: experiences.count ?? 0,
    skills: skills.count ?? 0,
    projects: projects.count ?? 0,
  };

  return (
    <>
      <SiteHeader name="Dashboard" />
      <div className="space-y-4 p-4">
        <div className="border rounded-lg p-4">
          <p className="italic text-sm">Welcome to your dashboard!</p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <DashboardCard
            icon={<CircleUserRoundIcon className="w-4 h-4" />}
            title="Profiles"
            count={counts.abouts}
            desc="Total profiles"
          />
          <DashboardCard
            icon={<UserPenIcon className="w-4 h-4" />}
            title="Abouts"
            count={counts.abouts}
            desc="Total abouts"
          />
          <DashboardCard
            icon={<GraduationCapIcon className="w-4 h-4" />}
            title="Educations"
            count={counts.educations}
            desc="Total educations"
          />
          <DashboardCard
            icon={<TableOfContentsIcon className="w-4 h-4" />}
            title="Experiences"
            count={counts.experiences}
            desc="Total experiences"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <DashboardCard
              icon={<CogIcon className="w-4 h-4" />}
              title="Skills"
              count={counts.skills}
              desc="Total skills"
            />
            <DashboardCard
              icon={<FolderGit2Icon className="w-4 h-4" />}
              title="Projects"
              count={counts.projects}
              desc="Total projects"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center border p-4 rounded-lg">
              <blockquote className="border-l-2 pl-6 italic text-sm">
                &quot;Indeed, with difficulty comes easiness. When you have
                finished one good thing, continue to work hard for another. And
                put your hope only in your God!&quot; <br />{" "}
                <span className="font-medium">Q.S. Al Insyirah (94:6-8)</span>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
