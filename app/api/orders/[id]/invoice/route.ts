import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const invoice = await prisma.order.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return NextResponse.json(invoice);
}