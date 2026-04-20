import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    console.log("🔍 Google OAuth Callback - Environment Check:");
    console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? "✅ Present" : "❌ Missing");
    console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "✅ Present" : "❌ Missing");
    console.log("GOOGLE_OAUTH_REDIRECT_URI:", process.env.GOOGLE_OAUTH_REDIRECT_URI);
    console.log("DATABASE_URL:", process.env.DATABASE_URL ? "✅ Present" : "❌ Missing");
    
    // Check for required environment variables
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_OAUTH_REDIRECT_URI) {
      console.error("Missing Google OAuth environment variables");
      const { origin } = new URL(req.url);
      return NextResponse.redirect(`${origin}/login?error=config_missing`);
    }

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

    // 3) Try to use Prisma, but handle gracefully if not available
    let user = null;
    console.log("💾 Attempting database save for user:", profile.email);
    
    try {
      const { default: prisma } = await import("@/backend/prisma");
      console.log("✅ Prisma client loaded successfully");
      
      const email = profile.email.toLowerCase().trim();
      const name =
        profile.name ||
        profile.given_name ||
        email.split("@")[0] ||
        "User";

      console.log("🔍 Looking for existing user with email:", email);
      user = await prisma.register.findUnique({
        where: { email }
      });

      if (!user) {
        console.log("👤 Creating new user in database");
        user = await prisma.register.create({
          data: {
            name,
            email,
            provider: "google",
            googleId: profile.sub || null,
          }
        });
        console.log("✅ User created successfully:", user.id);
      } else {
        console.log("🔄 Updating existing user");
        // Update existing user with Google info
        user = await prisma.register.update({
          where: { email },
          data: {
            provider: "google",
            googleId: profile.sub || user.googleId,
          }
        });
        console.log("✅ User updated successfully:", user.id);
      }
    } catch (dbError) {
      console.error("❌ Database error:", dbError);
      console.error("Error details:", dbError.message);
      console.error("Error stack:", dbError.stack);
      // Continue without database operations
    }

    // 4) Redirect back to frontend with user info
    const url = new URL(`${origin}/auth/success`);
    url.searchParams.set("name", profile.name || profile.given_name || profile.email.split("@")[0] || "User");
    url.searchParams.set("email", profile.email);

    return NextResponse.redirect(url.toString());
  } catch (err) {
    console.error("Google OAuth Error:", err);
    const { origin } = new URL(req.url);
    return NextResponse.redirect(`${origin}/login?error=google_unknown`);
  }
}
