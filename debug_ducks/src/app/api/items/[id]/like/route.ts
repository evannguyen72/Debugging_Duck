import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../../config/mongodb";
import Item from "@/models/itemSchema";
import { auth } from "@/auth"; // Or wherever you export `auth()`

export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!session || !userEmail) return new NextResponse("Unauthorized", { status: 401 });

  const itemId = context.params.id;

  try {
    await connectMongoDB();

    const item = await Item.findById(itemId);
    if (!item) {
        return new NextResponse("Item not found", { status: 404 });
    }   

    if (item.likedBy.includes(userEmail)) {
        return new NextResponse("You already liked this item", { status: 400 });
    } 

    item.likeCount += 1;
    item.likedBy.push(userEmail);

    await item.save();

    return NextResponse.json({ item });
  } catch (err) {
    console.error("Like failed", err);
    return new NextResponse("Failed to like item", { status: 500 });
  }
}