// app/api/getPlan/route.js
import dbConnect from "@/backend/db";
import User from "@/backend/models/user";

export async function GET(req) {
  await dbConnect();

  try {
    // ✅ Extract query params from request
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json({ plan: "standard" }); // default if not found
    }

    return Response.json({ plan: user.plan });
  } catch (error) {
    console.error("getPlan API error:", error);
    return Response.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
