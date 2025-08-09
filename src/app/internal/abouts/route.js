import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET - Ambil semua abouts
export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("abouts").select("*");

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
      console.error("Supabase error:", error.message, error.details);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      data,
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
