import { NextResponse } from 'next/server';

export async function GET() {
  // Return items below reorder level (demo)
  const sample = [
    { id: 'stk_1', name: 'Widget A', quantity: 2 },
    { id: 'stk_2', name: 'Widget B', quantity: 5 }
  ];
  return NextResponse.json(sample);
}
