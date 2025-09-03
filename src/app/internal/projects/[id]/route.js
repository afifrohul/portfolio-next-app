import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PUT(req, { params }) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    const { data: oldProject, error: oldError } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (oldError || !oldProject) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const desc = formData.get("desc");
    const link = formData.get("link");
    const skillsRaw = formData.get("project_skills");
    const project_skills = skillsRaw ? JSON.parse(skillsRaw) : [];
    const newFile = formData.get("file");

    let imageUrl = oldProject.image;

    if (newFile && newFile.size > 0) {
      const randomStr = Math.random().toString(36).substring(2, 8);
      const fileName = `${Date.now()}-${randomStr}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(`project/${fileName}`, newFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError.message);
        return NextResponse.json(
          { success: false, message: uploadError.message },
          { status: 500 }
        );
      }

      const { data: publicUrlData } = supabase.storage
        .from("portfolio")
        .getPublicUrl(`project/${fileName}`);

      imageUrl = publicUrlData.publicUrl;

      if (oldProject.image) {
        const oldPath = oldProject.image.split("portfolio/")[1];
        await supabase.storage.from("portfolio").remove([oldPath]);
      }
    }

    const { data: updatedProject, error: updateError } = await supabase
      .from("projects")
      .update({
        title,
        desc,
        link,
        image: imageUrl,
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

    if (Array.isArray(project_skills)) {
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

      if (project_skills.length > 0) {
        const pivotInserts = project_skills.map((skill_id) => ({
          project_id: id,
          skill_id,
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
      { success: false, message: "Internal Server Error" },
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

    // Ambil data lama untuk dapatkan path file
    const { data: existing, error: fetchError } = await supabase
      .from("projects")
      .select("id, image")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        { success: false, message: "Data not found" },
        { status: 404 }
      );
    }

    // Hapus data project dari database
    const { error: deleteError, count } = await supabase
      .from("projects")
      .delete({ count: "exact" })
      .eq("id", id);

    if (deleteError) {
      console.error("Supabase error:", deleteError.message);
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

    // Jika ada gambar, hapus dari storage
    if (existing.image) {
      const pathToRemove = existing.image.split("portfolio/")[1];
      if (pathToRemove) {
        const { error: removeError } = await supabase.storage
          .from("portfolio")
          .remove([pathToRemove]);

        if (removeError) {
          console.error("Supabase storage remove error:", removeError.message);
        }
      }
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
