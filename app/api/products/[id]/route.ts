import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product =
    await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

  return NextResponse.json(product);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

  const product =
    await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        productCode:
          body.productCode,

        name: body.name,

        category:
          body.category,

        brand:
          body.brand || null,

        description:
          body.description ||
          null,

        mrp: Number(body.mrp),

        dp: Number(body.dp),

        gst: Number(body.gst),

        stock:
          Number(body.stock),

        minStock: Number(
          body.minStock
        ),

        image:
          body.image || null,

        active: body.active,
      },
    });

  return NextResponse.json({
    success: true,
    data: product,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    success: true,
  });
}