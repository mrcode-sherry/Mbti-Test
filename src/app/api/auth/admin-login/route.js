import { NextResponse } from 'next/server';

export async function POST(request) {
  const { username, password } = await request.json();

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    return NextResponse.json({ success: false, message: 'Server misconfiguration.' }, { status: 500 });
  }

  if (username === adminUsername && password === adminPassword) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, message: 'Invalid username or password.' }, { status: 401 });
}
