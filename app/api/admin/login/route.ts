import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const expectedKey = process.env.ADMIN_SECRET_KEY || 'student_lahore_2026';

    if (password !== expectedKey) {
      return NextResponse.json({ success: false, error: 'Invalid password or PIN' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, message: 'Authentication successful' });

    // Set secure HTTP-only cookie for session
    response.cookies.set({
      name: 'student_admin_session',
      value: 'authenticated_owner',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.delete('student_admin_session');
  return response;
}
