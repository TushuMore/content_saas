import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // 👈 ADD THIS
import { connectDB } from "@/lib/db";
import Content from "@/models/Content";

export async function POST(req: Request) {
  await connectDB();

  const session = await getServerSession(authOptions); // 👈 FIX

  console.log("SESSION:", session); // 🔥 debug

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const newContent = await Content.create({
    title: body.title,
    content: body.content,
    platform: body.platform,
    userId: session.user.id, // ✅ NOW WORKS
  });

  return Response.json(newContent);
}

export async function GET() {
  await connectDB();

  const session = await getServerSession(authOptions); // 👈 FIX

  if (!session) {
    return Response.json([], { status: 401 });
  }

  const data = await Content.find({
    userId: session.user.id, // ✅ FILTER WORKS
  });

  return Response.json(data);
}