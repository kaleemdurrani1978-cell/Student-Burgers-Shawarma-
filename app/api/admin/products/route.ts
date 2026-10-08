import { NextRequest, NextResponse } from 'next/server';
import { getProducts, upsertProduct, deleteProduct } from '@/lib/db';

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json({ success: true, products });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to load products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const product = await req.json();
    if (!product.id || !product.nameEn || !product.price) {
      return NextResponse.json({ success: false, error: 'Missing required product fields' }, { status: 400 });
    }

    const saved = await upsertProduct(product);
    return NextResponse.json({ success: true, product: saved });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to save product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
    }

    const deleted = await deleteProduct(id);
    return NextResponse.json({ success: deleted });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
}
