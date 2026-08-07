import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: 1,
      product: "Sample Product",
      type: "IN",
      quantity: 20,
      date: new Date(),
    },
    {
      id: 2,
      product: "Sample Product",
      type: "OUT",
      quantity: 5,
      date: new Date(),
    },
  ]);
}