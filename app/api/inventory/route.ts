import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load inventory",
      },
      {
        status: 500,
      }
    );
  }
}