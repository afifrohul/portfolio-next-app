import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function extractFilePath(publicUrl) {
  const parts = publicUrl.split("/storage/v1/object/public/");
  if (parts.length !== 2) return null;
  return parts[1].substring(parts[1].indexOf("/") + 1);
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
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

      const fileName = `${Date.now()}-${file.name}`;
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
  try {
    const { id } = params;
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

    if (oldImage?.src) {
      const oldPath = extractFilePath(oldImage.src);
      if (oldPath) {
        await supabase.storage.from("portfolio").remove([oldPath]);
      }
    }

    const { error } = await supabase.from("images").delete().eq("id", id);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Profile deleted" },
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
