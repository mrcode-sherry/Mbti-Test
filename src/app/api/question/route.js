import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, ...data } = body;

    // ✅ Debug: Log received data
    console.log("📝 Received form data:", {
      email,
      fullName: data.fullName,
      fatherName: data.fatherName,
      age: data.age,
      gender: data.gender,
      currentEducationLevel: data.currentEducationLevel,
      boardInstitution: data.boardInstitution,
      testCategory: data.testCategory,
      favouriteSubjects: data.favouriteSubjects,
      weakSubjects: data.weakSubjects,
      extraCurricularActivities: data.extraCurricularActivities,
    });

    // ✅ Backend Validation - Critical data integrity checks
    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, message: "Valid email is required" }, { status: 400 });
    }

    if (!data.fullName || data.fullName.trim().length < 2) {
      return NextResponse.json({ success: false, message: "Full name must be at least 2 characters" }, { status: 400 });
    }

    if (!data.fatherName || data.fatherName.trim().length < 2) {
      return NextResponse.json({ success: false, message: "Father's name must be at least 2 characters" }, { status: 400 });
    }

    if (!data.age || isNaN(data.age) || parseInt(data.age) < 15 || parseInt(data.age) > 100) {
      return NextResponse.json({ success: false, message: "Age must be between 15 and 100" }, { status: 400 });
    }

    if (!data.gender || !['Male', 'Female', 'Other'].includes(data.gender)) {
      return NextResponse.json({ success: false, message: "Valid gender selection is required" }, { status: 400 });
    }

    if (!data.currentEducationLevel || data.currentEducationLevel.trim().length < 5) {
      return NextResponse.json({ success: false, message: "Current education level is required" }, { status: 400 });
    }

    if (!data.boardInstitution || data.boardInstitution.trim().length < 3) {
      return NextResponse.json({ success: false, message: "Board/Institution name is required" }, { status: 400 });
    }

    if (!data.mediumOfInstruction || data.mediumOfInstruction.trim().length < 3) {
      return NextResponse.json({ success: false, message: "Medium of instruction is required" }, { status: 400 });
    }

    if (!data.expectedResult || data.expectedResult.trim().length < 3) {
      return NextResponse.json({ success: false, message: "Expected result/status is required" }, { status: 400 });
    }

    // Validate arrays
    const validFavSubjects = Array.isArray(data.favouriteSubjects) ? data.favouriteSubjects.filter(s => s && s.trim().length > 0) : [];
    if (validFavSubjects.length < 1) {
      return NextResponse.json({ success: false, message: "At least one favourite subject is required" }, { status: 400 });
    }

    const validWeakSubjects = Array.isArray(data.weakSubjects) ? data.weakSubjects.filter(s => s && s.trim().length > 0) : [];
    if (validWeakSubjects.length < 1) {
      return NextResponse.json({ success: false, message: "At least one weak subject is required" }, { status: 400 });
    }

    const validActivities = Array.isArray(data.extraCurricularActivities) ? data.extraCurricularActivities.filter(a => a && a.trim().length > 0) : [];
    if (validActivities.length < 1) {
      return NextResponse.json({ success: false, message: "At least one extra-curricular activity is required" }, { status: 400 });
    }

    // Career preferences validation removed - now optional

    if (!data.testCategory || data.testCategory.trim().length < 3) {
      return NextResponse.json({ success: false, message: "Test category selection is required" }, { status: 400 });
    }

    // Dynamic import for Prisma
    let prisma;
    try {
      const { default: prismaClient } = await import("@/backend/prisma");
      prisma = prismaClient;
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return NextResponse.json(
        { success: false, message: "Database connection failed" },
        { status: 500 }
      );
    }

    // Check if record already exists
    const exists = await prisma.test.findUnique({
      where: { email }
    });

    if (exists) {
      return NextResponse.json({ success: false, message: "Record already exists for this email" }, { status: 409 });
    }

    // ✅ Prepare sanitized data for database insertion
    const dbData = {
      email: email.toLowerCase().trim(),
      // Core fields - sanitized and validated
      fullName: data.fullName.trim(),
      fatherName: data.fatherName.trim(),
      age: data.age.toString(),
      gender: data.gender,
      
      // Education details - sanitized
      currentEducationLevel: data.currentEducationLevel.trim(),
      boardInstitution: data.boardInstitution.trim(),
      mediumOfInstruction: data.mediumOfInstruction.trim(),
      expectedResult: data.expectedResult.trim(),
      
      // Academic self-report - validated arrays
      favouriteSubjects: validFavSubjects,
      weakSubjects: validWeakSubjects,
      
      // Activities & interests - validated arrays
      extraCurricularActivities: validActivities,
      
      // Family background - optional fields
      fatherOccupation: data.fatherOccupation ? data.fatherOccupation.trim() : '',
      motherOccupation: data.motherOccupation ? data.motherOccupation.trim() : '',
      socioeconomicBracket: data.socioeconomicBracket ? data.socioeconomicBracket.trim() : '',
      
      // Career preferences - now optional field
      careerPreferences: data.careerPreferences ? data.careerPreferences.trim() : '',
      
      // Test category - required field
      testCategory: data.testCategory.trim(),
      
      // Backward compatibility fields with defaults
      countryCode: data.countryCode || '+92',
      phoneNumber: data.phoneNumber || '0000000000',
      maritalStatus: data.maritalStatus || 'single',
      city: data.city || 'Not specified',
      province: data.province || 'Not specified',
      educationType: data.educationType || 'school',
      schoolStatus: data.schoolStatus || 'continue',
      schoolClass: data.schoolClass || '10',
      schoolInstitute: data.schoolInstitute || data.boardInstitution.trim(),
      collegeYear: data.collegeYear || '',
      collegeDegree: data.collegeDegree || '',
      collegeInstitute: data.collegeInstitute || '',
      universitySemester: data.universitySemester || '',
      universityDegree: data.universityDegree || '',
      hobbies: Array.isArray(data.hobbies) ? data.hobbies.filter(h => h && h.trim()) : [],
      fieldsOfInterest: Array.isArray(data.fieldsOfInterest) ? data.fieldsOfInterest : ['Career Guidance'],
      parentalExpectation: data.parentalExpectation || (data.careerPreferences ? data.careerPreferences.trim() : ''),
      budgetRange: data.budgetRange || 'Local education',
    };

    // ✅ Debug: Log data being saved to database
    console.log("💾 Saving to database:", {
      email: dbData.email,
      fullName: dbData.fullName,
      fatherName: dbData.fatherName,
      testCategory: dbData.testCategory,
      favouriteSubjectsCount: dbData.favouriteSubjects.length,
      weakSubjectsCount: dbData.weakSubjects.length,
      activitiesCount: dbData.extraCurricularActivities.length,
    });

    const newRecord = await prisma.test.create({
      data: dbData
    });

    // ✅ Debug: Log successful save
    console.log("✅ Successfully saved to DB:", {
      id: newRecord.id,
      email: newRecord.email,
      fullName: newRecord.fullName,
      testCategory: newRecord.testCategory,
    });

    return NextResponse.json({ 
      success: true, 
      message: "Record saved successfully",
      data: {
        id: newRecord.id,
        email: newRecord.email,
        testCategory: newRecord.testCategory
      }
    });
  } catch (error) {
    console.error("❌ Save Error:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      meta: error.meta
    });
    
    return NextResponse.json({ 
      success: false, 
      message: `Database error: ${error.message}` 
    }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, exists: false, message: "Email required" }, { status: 400 });
    }

    // Dynamic import for Prisma
    let prisma;
    try {
      const { default: prismaClient } = await import("@/backend/prisma");
      prisma = prismaClient;
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return NextResponse.json(
        { success: false, exists: false, message: "Database connection failed" },
        { status: 500 }
      );
    }

    const record = await prisma.test.findUnique({
      where: { email }
    });

    return NextResponse.json({
      success: true,
      exists: !!record,
      message: record ? "Record found" : "No record found"
    });
  } catch (error) {
    console.error("Check Error:", error);
    return NextResponse.json({ success: false, exists: false, message: error.message }, { status: 500 });
  }
}
