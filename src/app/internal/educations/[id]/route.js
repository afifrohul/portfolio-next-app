import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PUT(req, { params }) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { id } = await params;

    const { data, error } = await supabase
      .from("educations")
      .update({ ...body })
      .eq("id", id)
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
      { success: true, message: "Updated successfully", data },
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

    const { data: existing, error: fetchError } = await supabase
      .from("educations")
      .select("id")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        { success: false, message: "Data not found" },
        { status: 404 }
      );
    }

    const { error: deleteError, count } = await supabase
      .from("educations")
      .delete({ count: "exact" })
      .eq("id", id);

    if (deleteError) {
      console.error(
        "Supabase error:",
        deleteError.message,
        deleteError.details
      );
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
