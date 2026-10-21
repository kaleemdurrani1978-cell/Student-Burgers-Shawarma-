import { NextRequest, NextResponse } from 'next/server';
import { getDailySalesReport } from '@/lib/db';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(req.url);
  const month = searchParams.get('month');
  const selectedDate = searchParams.get('day');
  if (!month || !/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) {
    return NextResponse.json(
      { success: false, error: 'A valid month in YYYY-MM format is required.' },
      { status: 400 }
    );
  }
  if (selectedDate && (!/^\d{4}-\d{2}-\d{2}$/.test(selectedDate) || !selectedDate.startsWith(`${month}-`))) {
    return NextResponse.json(
      { success: false, error: 'The selected day must belong to the requested month.' },
      { status: 400 }
    );
  }

  try {
    const report = await getDailySalesReport(month, selectedDate ?? '');
    return NextResponse.json({
      success: true,
      month,
      ...report,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to calculate daily sales.' },
      { status: 500 }
    );
  }
}
