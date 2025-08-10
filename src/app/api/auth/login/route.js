import Registration from "@/backend/models/register";
import { NextResponse } from "next/server";
import dbConnect from "@/backend/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await dbConnect()

        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Email and password are required" },
                { status: 400 }
            )
        }

        const user = await Registration.findOne({ email })
        if (!user) {
            return NextResponse.json(
                { success: false, message: "Invalid email or password" },
                { status: 401 }
            )
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, message: "Invalid email or password" },
                { status: 401 }
            );
        }

        const userData = user.toObject();
        delete userData.password;

        return NextResponse.json(
            { success: true, message: "Login successful", user: userData },
            { status: 200 }
        );


    } catch (error) {
        console.log("Login Error:", error)
        return NextResponse.json(
            { success: false, message: "Something went wrong", error: error.message },
            { status: 500 }
        )
    }
}