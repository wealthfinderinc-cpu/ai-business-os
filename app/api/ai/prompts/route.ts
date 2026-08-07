import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: 1,
      title: "Sales Script",
    },
    {
      id: 2,
      title: "WhatsApp Reply",
    },
    {
      id: 3,
      title: "Follow Up",
    },
  ]);
}