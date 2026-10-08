import { NextRequest, NextResponse } from 'next/server';
import { getBusinessSettings, updateBusinessSettings } from '@/lib/db';

export async function GET() {
  try {
    const settings = await getBusinessSettings();
    return NextResponse.json({ success: true, settings });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to load settings' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const updates = await req.json();
    const updated = await updateBusinessSettings(updates);
    return NextResponse.json({ success: true, settings: updated });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 });
  }
}
