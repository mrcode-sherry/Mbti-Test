import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.DATABASE_URL;
  return NextResponse.json({
    DATABASE_URL_exists: !!url,
    DATABASE_URL_prefix: url ? url.substring(0, 40) + "..." : "MISSING",
  });
}
