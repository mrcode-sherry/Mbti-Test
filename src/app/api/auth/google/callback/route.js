import { NextResponse } from "next/server";
import dbConnect from "@/backend/db";
import Register from "@/backend/models/register";

export async function GET(req) {
  try {
    const { searchParams, origin } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(`${origin}/login?error=google_no_code`);
    }

    // 1) Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
        grant_type: "authorization_code",
      }).toString(),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData?.access_token) {
      console.error("Google Token Error:", tokenData);
      return NextResponse.redirect(`${origin}/login?error=google_token_failed`);
    }

    // 2) Get user info
    const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
      cache: "no-store",
    });

    const profile = await profileRes.json();

    if (!profile?.email) {
      console.error("Google Profile Error:", profile);
      return NextResponse.redirect(`${origin}/login?error=google_no_email`);
    }

    // 3) Upsert user
    await dbConnect();

    const email = profile.email.toLowerCase().trim();
    const name =
      profile.name ||
      profile.given_name ||
      email.split("@")[0] ||
      "User";

    let user = await Register.findOne({ email });

    if (!user) {
      user = await Register.create({
        name,
        email,
        provider: "google",
        googleId: profile.sub || null,
      });
    } else {
      if (!user.provider || user.provider === "credentials") {
        user.provider = "google";
      }
      if (!user.googleId && profile.sub) {
        user.googleId = profile.sub;
      }
      await user.save();
    }

    // 4) Redirect back to frontend with user info
    const base = process.env.NEXT_PUBLIC_BASE_URL || origin;
    const url = new URL(`${base}/auth/success`);
    url.searchParams.set("name", name);
    url.searchParams.set("email", email);

    return NextResponse.redirect(url.toString());
  } catch (err) {
    console.error("Google OAuth Error:", err);
    const { origin } = new URL(req.url);
    return NextResponse.redirect(`${origin}/login?error=google_unknown`);
  }
}
