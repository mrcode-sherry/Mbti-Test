import dbConnect from "@/backend/db";
import Proof from "@/backend/models/proof"; 

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { proofId } = req.body;

      if (!proofId) {
        return res.status(400).json({ success: false, message: "Proof ID is required" });
      }

      // Update proof status to "rejected"
      const updatedProof = await Proof.findByIdAndUpdate(
        proofId,
        { status: "rejected" },
        { new: true }
      );

      if (!updatedProof) {
        return res.status(404).json({ success: false, message: "Proof not found" });
      }

      return res.status(200).json({ success: true, message: "Proof rejected successfully", proof: updatedProof });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
