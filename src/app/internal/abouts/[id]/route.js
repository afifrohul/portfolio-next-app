import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PUT(req, { params }) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("abouts")
      .update({ desc: body.desc })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error.message, error.details);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { message: "Updated successfully" });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const supabase = await createClient();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabase.from("abouts").delete().eq("id", id);

    if (error) {
      console.error("Supabase error:", error.message, error.details);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
