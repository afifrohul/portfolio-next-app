import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("projects").select(`
    *,
    project_skills (
      skill:skills (
        id,
        name
      )
    )
  `);

    if (error) {
      console.error("Supabase error:", error.message, error.details);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert([
        {
          title: body.title,
          desc: body.desc,
          image: null,
        },
      ])
      .select()
      .single();

    if (projectError) {
      console.error("Supabase project insert error:", projectError.message);
      return NextResponse.json(
        { error: projectError.message },
        { status: 500 }
      );
    }

    if (body.project_skills && body.project_skills.length > 0) {
      const pivotInserts = body.project_skills.map((skill_id) => ({
        project_id: project.id,
        skill_id: skill_id,
      }));

      const { error: pivotError } = await supabase
        .from("project_skills")
        .insert(pivotInserts);

      if (pivotError) {
        console.error("Supabase pivot insert error:", pivotError.message);
        return NextResponse.json(
          { error: pivotError.message },
          { status: 500 }
        );
      }
    }

    // Query ulang project dengan relasi
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
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    return NextResponse.json(
      projectWithSkills,
      { status: 201 },
      { message: "Created successfully" }
    );
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
