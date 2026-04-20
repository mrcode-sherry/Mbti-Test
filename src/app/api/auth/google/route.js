import { NextResponse } from "next/server";

export async function GET(req) {
  // Check for required environment variables
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_OAUTH_REDIRECT_URI) {
    console.error("Missing Google OAuth environment variables");
    const { origin } = new URL(req.url);
    return NextResponse.redirect(`${origin}/login?error=config_missing`);
  }

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
  });

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
}
