import { NextRequest, NextResponse } from 'next/server';
import { getDeals, upsertDeal, deleteDeal } from '@/lib/db';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET() {
  try {
    const deals = await getDeals();
    return NextResponse.json({ success: true, deals });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to load deals' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;
  try {
    const deal = await req.json();
    if (!deal.id || !deal.nameEn || !deal.price) {
      return NextResponse.json({ success: false, error: 'Missing required deal fields' }, { status: 400 });
    }

    const saved = await upsertDeal(deal);
    return NextResponse.json({ success: true, deal: saved });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to save deal' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Deal ID required' }, { status: 400 });
    }

    const deleted = await deleteDeal(id);
    return NextResponse.json({ success: deleted });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete deal' }, { status: 500 });
  }
}
