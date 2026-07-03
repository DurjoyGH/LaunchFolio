import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Portfolio } from "@/lib/models/Portfolio";
import { verifyAuth } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const decoded = await verifyAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
    }

    const resolvedParams = await params;

    await connectDB();
    const portfolio = await Portfolio.findOne({ _id: resolvedParams.id, userId: decoded.id }).lean();
    if (!portfolio) {
      return NextResponse.json({ success: false, message: "Portfolio not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { portfolio } }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const decoded = await verifyAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
    }

    const resolvedParams = await params;

    await connectDB();
    const portfolio = await Portfolio.findOneAndDelete({
      _id: resolvedParams.id,
      userId: decoded.id,
    });
    if (!portfolio) {
      return NextResponse.json({ success: false, message: "Portfolio not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Portfolio deleted successfully" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
