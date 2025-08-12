import Register from "@/backend/models/register";
import { NextResponse } from "next/server";
import dbConnect from "@/backend/db";
import bcrypt from "bcryptjs";

// Allow only Gmail, Yahoo, Hotmail
const emailRegex = /^[\w.%+-]+@(gmail|yahoo|hotmail)\.com$/i;
// Require min 8 chars, 1 letter, 1 number, 1 special char
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();

    // 1️⃣ Validate presence
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email and password are required." },
        { status: 400 }
      );
    }

    // 2️⃣ Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 3️⃣ Validate password strength
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must be at least 8 characters long and include at least one letter, one number and one special character."
        },
        { status: 400 }
      );
    }

    // 4️⃣ Check if email already exists
    const existing = await Register.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Email is already registered. Please login." },
        { status: 400 }
      );
    }

    // 5️⃣ Hash password
    const hashed = await bcrypt.hash(password, 10);

    // 6️⃣ Create new user
    const user = await Register.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashed
    });

    return NextResponse.json(
      { success: true, message: "User registered successfully", userId: user._id },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration Error:", err);
    return NextResponse.json(
      { success: false, message: "Registration failed", error: err.message },
      { status: 500 }
    );
  }
}
