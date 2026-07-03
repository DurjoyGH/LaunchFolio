import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/User";
import { verifyAuth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const decoded = await verifyAuth();
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    await connectDB();
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: { user } },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
