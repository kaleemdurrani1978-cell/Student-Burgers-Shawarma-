import { NextResponse } from 'next/server';
import { getDashboardStats } from '@/lib/db';

export async function GET() {
  try {
    const stats = await getDashboardStats();
    return NextResponse.json({ success: true, stats });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to calculate stats' }, { status: 500 });
  }
}
