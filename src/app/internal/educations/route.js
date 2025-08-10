import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("educations").select("*");

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
          end_month: body.end_month,
          end_year: body.end_year,
          gpa: body.gpa,
        },
      ])
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
