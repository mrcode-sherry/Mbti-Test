import dbConnect from "@/backend/db";
import User from "@/backend/models/user";

export async function POST(req) {
  await dbConnect();
  const { email, plan } = await req.json();

  const user = await User.findOneAndUpdate(
    { email },
    { plan },
    { new: true, upsert: true }
  );

  return Response.json({ success: true, plan: user.plan });
}
