import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET - Ambil semua abouts
export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("abouts").select("*");

    if (error) throw error;

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { success: false, message: err.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST - Tambah about baru
export async function POST(req) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    const { data, error } = await supabase
      .from("abouts")
      .insert([{ desc: body.desc }])
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
