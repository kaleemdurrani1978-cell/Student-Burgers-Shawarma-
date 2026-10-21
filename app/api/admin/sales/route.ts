import { NextRequest, NextResponse } from 'next/server';
import { getOrders } from '@/lib/db';
import { requireAdmin } from '@/lib/adminAuth';

const pakistanDateFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Karachi',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function getPakistanDateKey(date: Date): string {
  const parts = Object.fromEntries(
    pakistanDateFormatter.formatToParts(date).map((part) => [part.type, part.value])
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

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
    const completedOrders = (await getOrders()).filter((order) => order.status === 'completed');
    const monthlyOrders = completedOrders.filter((order) =>
      getPakistanDateKey(new Date(order.createdAt)).startsWith(`${month}-`)
    );
    const dailySales: Record<string, { total: number; orderCount: number }> = {};

    for (const order of monthlyOrders) {
      const day = getPakistanDateKey(new Date(order.createdAt));
      const summary = dailySales[day] ?? { total: 0, orderCount: 0 };
      summary.total += order.grandTotal;
      summary.orderCount += 1;
      dailySales[day] = summary;
    }

    const dayOrders = selectedDate
      ? monthlyOrders.filter((order) => getPakistanDateKey(new Date(order.createdAt)) === selectedDate)
      : [];

    return NextResponse.json({
      success: true,
      month,
      monthlyTotal: monthlyOrders.reduce((total, order) => total + order.grandTotal, 0),
      monthlyOrderCount: monthlyOrders.length,
      dailySales,
      dayOrders,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to calculate daily sales.' },
      { status: 500 }
    );
  }
}
