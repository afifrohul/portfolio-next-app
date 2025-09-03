import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function extractFilePath(publicUrl) {
  const parts = publicUrl.split("/storage/v1/object/public/");
  if (parts.length !== 2) return null;
  return parts[1].substring(parts[1].indexOf("/") + 1);
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: oldImage, error: fetchError } = await supabase
      .from("images")
      .select("src")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error(fetchError);
      return NextResponse.json(
        { success: false, message: fetchError.message },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    let newSrc = null;
    const file = formData.get("file");

    if (file && file.size > 0) {
      if (oldImage?.src) {
        const oldPath = extractFilePath(oldImage.src);
        if (oldPath) {
          await supabase.storage.from("portfolio").remove([oldPath]);
        }
      }

      const randomStr = Math.random().toString(36).substring(2, 8);
      const fileName = `${Date.now()}-${randomStr}`;
      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(`profile/${fileName}`, file, {
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
        .getPublicUrl(`profile/${fileName}`);
      newSrc = publicUrlData.publicUrl;
    }

    const updateData = {};
    if (newSrc) updateData.src = newSrc;

    const { data, error } = await supabase
      .from("images")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Profile updated", data },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
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
      .from("images")
      .select("id, src")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        { success: false, message: "Data not found" },
        { status: 404 }
      );
    }

    const { error: deleteError, count } = await supabase
      .from("images")
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
    if (existing.src) {
      const pathToRemove = existing.src.split("portfolio/")[1];
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
