import Registration from "@/backend/models/register";
import { NextResponse } from "next/server";
import dbConnect from "@/backend/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await dbConnect();

        const body = await req.json();

        const {
            fullName,
            email,
            countryCode,
            phoneNumber,
            password,
            maritalStatus,
            gender,
            city,
            province,
            age,
            educationType,
            schoolStatus,
            schoolInstitute,
            collegeYear,
            collegeDegree,
            collegeInstitute,
            universitySemester,
            universityDegree,
            universityInstitute
        } = body;

        // Check if email already exists
        const existingUser = await Registration.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { success: false, message: "Email is already registered" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Remove empty string fields to avoid storing useless data
        const cleanedData = Object.fromEntries(
            Object.entries({
                fullName,
                email,
                countryCode,
                phoneNumber,
                password: hashedPassword,
                maritalStatus,
                gender,
                city,
                province,
                age,
                educationType,
                schoolStatus,
                schoolInstitute,
                collegeYear,
                collegeDegree,
                collegeInstitute,
                universitySemester,
                universityDegree,
                universityInstitute
            }).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
        );

        const newUser = await Registration.create(cleanedData);

        return NextResponse.json(
            { success: true, message: "User registered successfully", userId: newUser._id },
            { status: 201 }
        );

    } catch (error) {
        console.error("Registration Error", error);
        return NextResponse.json(
            { success: false, message: "Something Went Wrong", error: error.message },
            { status: 500 }
        );
    }
}
