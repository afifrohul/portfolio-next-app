import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PUT(req, { params }) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Update data project utama
    const { data: updatedProject, error: updateError } = await supabase
      .from("projects")
      .update({
        title: body.title,
        desc: body.desc,
        image: null,
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("Supabase update error:", updateError.message);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    if (body.project_skills && Array.isArray(body.project_skills)) {
      const { error: deleteError } = await supabase
        .from("project_skills")
        .delete()
        .eq("project_id", id);

      if (deleteError) {
        console.error("Supabase delete pivot error:", deleteError.message);
        return NextResponse.json(
          { error: deleteError.message },
          { status: 500 }
        );
      }

      const pivotInserts = body.project_skills.map((skill_id) => ({
        project_id: id,
        skill_id: skill_id,
      }));

      const { error: insertError } = await supabase
        .from("project_skills")
        .insert(pivotInserts);

      if (insertError) {
        console.error("Supabase insert pivot error:", insertError.message);
        return NextResponse.json(
          { error: insertError.message },
          { status: 500 }
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
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Supabase fetch error:", fetchError.message);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    return NextResponse.json(projectWithSkills, {
      message: "Updated successfully",
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const supabase = await createClient();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      console.error("Supabase error:", error.message, error.details);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
