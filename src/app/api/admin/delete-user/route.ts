import { NextResponse } from "next/server";
import { adminSupabase } from "@/lib/supabase/admin";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const id: number = body?.id;
    const auth_user_id: string = body?.auth_user_id;

    if (!id || !auth_user_id) {
      return NextResponse.json(
        { error: "Missing id or auth_user_id" },
        { status: 400 }
      );
    }

    
    const { error: authError } =
      await adminSupabase.auth.admin.deleteUser(auth_user_id);

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 500 }
      );
    }

    
    const { error: dbError } = await adminSupabase
      .from("registration")
      .delete()
      .eq("id", id);

    if (dbError) {
      return NextResponse.json(
        { error: dbError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User deleted from auth and database",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}