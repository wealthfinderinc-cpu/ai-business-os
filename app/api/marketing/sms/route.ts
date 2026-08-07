import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json({
    success: true,
    provider: "SMS",
    message: body.message,
    recipients: body.recipients ?? [],
  });
}