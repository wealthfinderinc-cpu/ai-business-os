import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      select: {
        status: true,
        source: true,
        createdAt: true,
      },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load chart data",
      },
      {
        status: 500,
      }
    );
  }
}