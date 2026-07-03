import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Contact } from "@/lib/models/Contact";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    const contact = await Contact.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Thanks for your message. We will review it soon.",
        data: { contactId: contact._id },
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
