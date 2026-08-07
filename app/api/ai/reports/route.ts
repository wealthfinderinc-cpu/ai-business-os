import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: 1,
      title: "Sales Report",
    },
    {
      id: 2,
      title: "Customer Report",
    },
    {
      id: 3,
      title: "Finance Report",
    },
  ]);
}