import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/User";
import { comparePassword, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await comparePassword(password, user.password))) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = signToken(user);
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } },
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
