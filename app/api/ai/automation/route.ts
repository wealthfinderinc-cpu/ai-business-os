import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: 1,
      name: "Daily Follow Up",
      active: true,
    },
    {
      id: 2,
      name: "Lead Reminder",
      active: true,
    },
    {
      id: 3,
      name: "Birthday Wishes",
      active: false,
    },
  ]);
}