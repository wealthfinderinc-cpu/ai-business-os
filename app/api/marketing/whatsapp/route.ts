import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json({
    success: true,
    provider: "WhatsApp",
    message: body.message,
    recipients: body.recipients ?? [],
  });
}