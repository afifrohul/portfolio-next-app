import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

const getProjects = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      project_skills (
        skill:skills (
          id,
          name,
          icon
        )
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
});

export async function GET() {
  try {
    const data = await getProjects();
    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { success: false, message: err.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const supabase = await createClient();
    const formData = await req.formData();

    const file = formData.get("file");
    if (!file) {
      return NextResponse.json(
        { success: false, message: "File is required" },
        { status: 400 }
      );
    }

    const title = formData.get("title");
    const desc = formData.get("desc");
    const link = formData.get("link");
    const year = formData.get("year");
    const skillsRaw = formData.get("project_skills");
    const project_skills = skillsRaw ? JSON.parse(skillsRaw) : [];

    const randomStr = Math.random().toString(36).substring(2, 8);
    const fileName = `${Date.now()}-${randomStr}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("portfolio")
      .upload(`project/${fileName}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error(uploadError);
      return NextResponse.json(
        { success: false, message: uploadError.message },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("portfolio")
      .getPublicUrl(`project/${fileName}`);

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert([
        {
          title,
          desc,
          link,
          year,
          image: publicUrlData.publicUrl,
        },
      ])
      .select()
      .single();

    if (projectError) {
      console.error("Supabase project insert error:", projectError.message);
      return NextResponse.json(
        { success: false, message: projectError.message },
        { status: 400 }
      );
    }

    if (project_skills.length > 0) {
      const pivotInserts = project_skills.map((skill_id) => ({
        project_id: project.id,
        skill_id,
      }));

      const { error: pivotError } = await supabase
        .from("project_skills")
        .insert(pivotInserts);

      if (pivotError) {
        console.error("Supabase pivot insert error:", pivotError.message);
        return NextResponse.json(
          { success: false, message: pivotError.message },
          { status: 400 }
        );
      }
    }

    const { data: projectWithSkills, error: fetchError } = await supabase
      .from("projects")
      .select(
        `
          *,
          project_skills (
            skill:skills (
              id,
              name
            )
          )
        `
      )
      .eq("id", project.id)
      .single();

    if (fetchError) {
      console.error("Supabase fetch error:", fetchError.message);
      return NextResponse.json(
        { success: false, message: fetchError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Created successfully", projectWithSkills },
      { status: 201 }
    );
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
