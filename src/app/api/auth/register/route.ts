import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/User";
import { hashPassword, signToken } from "@/lib/auth";
import { sendEmail, welcomeEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 }
      );
    }

    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed });

    const token = signToken(user);
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    // Send welcome email (non-blocking)
    sendEmail({ to: email, subject: "Welcome to LaunchFolio 🚀", html: welcomeEmail(name) });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } },
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
