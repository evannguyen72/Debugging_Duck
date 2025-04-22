import connectMongoDB from "../../../../config/mongodb";
import Item from "../../../models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { generateSummary } from "@/lib/openai"; // ✅ NEW

export async function POST(request: NextRequest) {
  try {
    const { owner, title, description, url } = await request.json();

    await connectMongoDB();

    const summary = await generateSummary(description); // ✅ NEW

    const newItem = await Item.create({
      owner,
      title,
      description,
      url,
      likeCount: 0,
      likedBy: [],
      summary, // ✅ NEW
    });

    return NextResponse.json({ message: "Item added successfully", item: newItem }, { status: 201 });
  } catch (err) {
    console.error("[POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const items = await Item.find();
  return NextResponse.json({ items });
}
