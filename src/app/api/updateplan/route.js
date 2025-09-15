// pages/api/updatePlan.js
import dbConnect from "@/backend/db";
import User from "@/backend/models/user";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { email, plan } = req.body;

    let user = await User.findOneAndUpdate(
      { email },
      { plan },
      { new: true, upsert: true }
    );

    return res.status(200).json({ success: true, plan: user.plan });
  }

  res.status(405).json({ message: "Method not allowed" });
}
