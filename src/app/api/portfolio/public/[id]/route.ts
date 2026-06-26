import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Portfolio } from "@/lib/models/Portfolio";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    await connectDB();
    let query = {};
    
    // If it looks like a MongoDB ObjectId, query by _id. Otherwise treat as slug (customDomain)
    if (/^[a-f\d]{24}$/i.test(id)) {
      query = { _id: id };
    } else {
      query = { "input.customDomain": id };
    }

    const portfolio = await Portfolio.findOne(query)
      .select("input blueprint content status")
      .sort("-createdAt")
      .lean();
      
    if (!portfolio) {
      return NextResponse.json({ success: false, message: "Portfolio not found" }, { status: 404 });
    }

    // Ensure it's ready to be viewed
    if (portfolio.status !== "deployed" && portfolio.status !== "ready") {
      return NextResponse.json(
        { success: false, message: "Portfolio is not ready for viewing yet" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          input: portfolio.input,
          blueprint: portfolio.blueprint,
          content: portfolio.blueprint?.content || {},
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
