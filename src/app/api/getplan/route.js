import dbConnect from "@/backend/db";
import User from "@/backend/models/user";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ plan: "standard" }); // Default plan
    }

    return res.status(200).json({ plan: user.plan });
  }

  res.status(405).json({ message: "Method not allowed" });
}
