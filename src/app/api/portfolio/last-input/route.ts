import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Portfolio } from "@/lib/models/Portfolio";
import { verifyAuth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const decoded = await verifyAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
    }

    await connectDB();
    const portfolio = await Portfolio.findOne({ userId: decoded.id })
      .select("input")
      .sort("-createdAt")
      .lean();

    if (!portfolio) {
      return NextResponse.json({ success: true, data: { input: null } }, { status: 200 });
    }

    return NextResponse.json({ success: true, data: { input: portfolio.input } }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
