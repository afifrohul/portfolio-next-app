import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

const getProfiles = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("images").select("*");

  if (error) throw error;

  return data ?? [];
});

export async function GET() {
  try {
    const data = await getProfiles();
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

    const file = formData.get("file"); // ambil File
    if (!file) {
      return NextResponse.json(
        { success: false, message: "File is required" },
        { status: 400 }
      );
    }

    const randomStr = Math.random().toString(36).substring(2, 8);
    const fileName = `${Date.now()}-${randomStr}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
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

    const { data, error } = await supabase
      .from("images")
      .insert({ src: publicUrlData.publicUrl })
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
      { success: true, message: "Profile created", data },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
