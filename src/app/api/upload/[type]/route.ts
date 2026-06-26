import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { Readable } from "stream";

const uploadToCloudinary = (buffer: Buffer, folder: string, resourceType: "image" | "raw" = "image") =>
  new Promise((resolve, reject) => {
    const options = {
      folder,
      resource_type: resourceType,
    };
    const uploadStream = cloudinary.uploader.upload_stream(options, (err, result) =>
      err ? reject(err) : resolve(result)
    );
    Readable.from(buffer).pipe(uploadStream);
  });

export async function POST(req: Request, { params }: { params: Promise<{ type: string }> }) {
  try {
    const decoded = await verifyAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
    }

    const resolvedParams = await params;
    const { type } = resolvedParams;

    const formData = await req.formData();
    // find the first file in formData
    let file: File | null = null;
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        file = value;
        break;
      }
    }

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let result: any;
    if (type === "profile") {
      result = await uploadToCloudinary(buffer, "launchfolio/user-pic", "image");
    } else if (type === "project") {
      result = await uploadToCloudinary(buffer, "launchfolio/projects-pic", "image");
    } else if (type === "resume") {
      result = await uploadToCloudinary(buffer, "launchfolio/resumes", "raw");
    } else {
      return NextResponse.json({ success: false, message: "Invalid upload type" }, { status: 400 });
    }

    return NextResponse.json(
      {
        success: true,
        data: { url: result.secure_url, publicId: result.public_id },
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
