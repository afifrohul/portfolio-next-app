import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("educations").select("*");

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

export async function POST(req) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    const { data, error } = await supabase
      .from("educations")
      .insert([
        {
          company: body.company,
          location: body.location,
          departement: body.departement,
          start_month: body.start_month,
          start_year: body.start_year,
          end_month: body.end_month || null,
          end_year: body.end_year || null,
          gpa: body.gpa || null,
        },
      ])
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
