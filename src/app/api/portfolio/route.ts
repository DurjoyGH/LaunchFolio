import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Portfolio } from "@/lib/models/Portfolio";
import { User } from "@/lib/models/User";
import { verifyAuth } from "@/lib/auth";
import { planPortfolio } from "@/lib/ai/portfolio.planner";
import { generateContent } from "@/lib/ai/content.generator";
import { sendEmail, portfolioReadyEmail, generationFailedEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const decoded = await verifyAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
    }

    await connectDB();
    const input = await req.json();

    const portfolio = await Portfolio.create({
      userId: decoded.id,
      input,
      status: "queued",
    });

    // Start generation asynchronously
    generatePortfolioInBackground(portfolio._id.toString(), decoded.id);

    return NextResponse.json(
      {
        success: true,
        message: "Portfolio generation started",
        data: { portfolioId: portfolio._id, status: "queued" },
      },
      { status: 202 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const decoded = await verifyAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
    }

    await connectDB();
    const portfolios = await Portfolio.find({ userId: decoded.id })
      .select("status input.name input.title input.customDomain deployment createdAt deployedAt")
      .sort("-createdAt")
      .limit(20)
      .lean();

    return NextResponse.json({ success: true, data: { portfolios } }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

async function generatePortfolioInBackground(portfolioId: string, userId: string) {
  try {
    await connectDB();
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) throw new Error("Portfolio not found");

    const user = await User.findById(userId).lean();

    // 1. AI Planning
    await Portfolio.findByIdAndUpdate(portfolioId, { status: "generating" });
    const blueprint = await planPortfolio(portfolio.input);
    const content = await generateContent(portfolio.input, blueprint);
    const fullBlueprint = { ...blueprint, content };
    await Portfolio.findByIdAndUpdate(portfolioId, { blueprint: fullBlueprint });

    // 2. Set as Deployed instantly (Headless mode)
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const slug = portfolio.input.customDomain || portfolioId;
    const deployUrl = `${frontendUrl}/p/${slug}`;

    await Portfolio.findByIdAndUpdate(portfolioId, {
      status: "deployed",
      "deployment.deployUrl": deployUrl,
      deployedAt: new Date(),
    });

    // 5. Notify user
    if (user?.email) {
      await sendEmail({
        to: user.email,
        subject: "🚀 Your portfolio is live!",
        html: portfolioReadyEmail(user.name, deployUrl),
      });
    }
  } catch (err: any) {
    console.error(`[AI Generation] Job failed:`, err.message);
    await Portfolio.findByIdAndUpdate(portfolioId, {
      status: "failed",
      "error.message": err.message,
      "error.at": new Date(),
    });

    try {
      const portfolio = await Portfolio.findById(portfolioId).lean();
      const user = portfolio ? await User.findById(portfolio.userId).lean() : null;
      if (user?.email) {
        await sendEmail({
          to: user.email,
          subject: "Portfolio generation failed",
          html: generationFailedEmail(user.name),
        });
      }
    } catch (emailErr: any) {
      console.error("Failure notification email failed:", emailErr.message);
    }
  }
}
