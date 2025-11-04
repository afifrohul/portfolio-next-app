import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

const getSkills = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("skills").select("*");

  if (error) throw error;
  return data ?? [];
});

export async function GET() {
  try {
    const data = await getSkills();
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
    const body = await req.json();

    const { data, error } = await supabase
      .from("skills")
      .insert([{ name: body.name, icon: body.icon }])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error.message);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Created successfully", data },
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
