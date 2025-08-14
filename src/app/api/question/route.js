import Test from "@/backend/models/test";
import dbConnect from "@/backend/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const requiredFields = [
      "fullName",
      "countryCode",
      "phoneNumber",
      "maritalStatus",
      "gender",
      "city",
      "province",
      "educationType"
    ];

    // Check for missing required fields
    const missingFields = requiredFields.filter(
      (field) => !body[field] || body[field].toString().trim() === ""
    );
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required field(s): ${missingFields.join(", ")}`
        },
        { status: 400 }
      );
    }

    // Education-specific validations
    if (body.educationType === "school") {
      if (!body.schoolStatus || !body.schoolInstitute) {
        return NextResponse.json(
          {
            success: false,
            message: "For school, schoolStatus and schoolInstitute are required."
          },
          { status: 400 }
        );
      }
    }

    if (body.educationType === "college") {
      if (!body.collegeYear || !body.collegeDegree || !body.collegeInstitute) {
        return NextResponse.json(
          {
            success: false,
            message: "For college, collegeYear, collegeDegree, and collegeInstitute are required."
          },
          { status: 400 }
        );
      }
    }

    if (body.educationType === "university") {
      if (!body.universitySemester || !body.universityDegree || !body.universityInstitute) {
        return NextResponse.json(
          {
            success: false,
            message: "For university, universitySemester, universityDegree, and universityInstitute are required."
          },
          { status: 400 }
        );
      }
    }

    // Create the test document
    const newTest = new Test(body);
    await newTest.save();

    return NextResponse.json(
      { success: true, message: "Test data saved successfully", data: newTest },
      { status: 201 }
    );
  } catch (err) {
    console.error("Test API Error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to save test data", error: err.message },
      { status: 500 }
    );
  }
}
