import { NextResponse } from "next/server";

const campaigns = [
  {
    id: 1,
    name: "WhatsApp August Campaign",
    type: "WhatsApp",
    audience: "Customers",
    budget: 5000,
    status: "Active",
  },
];

export async function GET() {
  return NextResponse.json(campaigns);
}

export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json({
    success: true,
    data: body,
    message: "Campaign Created",
  });
}