// frontend/app/api/get-product/route.ts
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { barcode } = await request.json();

  // ダミーデータの返却
  const products = {
    '1234567890123': { name: 'ペプシコーラ', price: 140.00 },
  };

  const product = products[barcode] || null;
  if (product) {
    return NextResponse.json(product);
  } else {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
}
