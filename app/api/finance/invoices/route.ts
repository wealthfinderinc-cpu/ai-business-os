import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const invoices = await prisma.order.findMany({
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(invoices);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );

  }
}