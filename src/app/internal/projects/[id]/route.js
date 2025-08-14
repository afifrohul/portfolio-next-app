import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PUT(req, { params }) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { id } = await params;

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
      return NextResponse.json(
        { success: false, message: updateError.message },
        { status: 400 }
      );
    }

    if (body.project_skills && Array.isArray(body.project_skills)) {
      const { error: deleteError } = await supabase
        .from("project_skills")
        .delete()
        .eq("project_id", id);

      if (deleteError) {
        console.error("Supabase delete pivot error:", deleteError.message);
        return NextResponse.json(
          { success: false, message: deleteError.message },
          { status: 400 }
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
          { success: false, message: insertError.message },
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
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Supabase fetch error:", fetchError.message);
      return NextResponse.json(
        { success: false, message: fetchError.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Updated successfully", projectWithSkills },
      { status: 200 }
    );
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const supabase = await createClient();

  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const { data: existing, error: fetchError } = await supabase
      .from("projects")
      .select("id")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        { success: false, message: "Data not found" },
        { status: 404 }
      );
    }

    const { error: deleteError, count } = await supabase
      .from("projects")
      .delete({ count: "exact" })
      .eq("id", id);

    if (deleteError) {
      console.error(
        "Supabase error:",
        deleteError.message,
        deleteError.details
      );
      return NextResponse.json(
        { success: false, message: deleteError.message },
        { status: 400 }
      );
    }

    if (count === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "You don't have permission to delete this item",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
