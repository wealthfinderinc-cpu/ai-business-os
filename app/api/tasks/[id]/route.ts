import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const task = await prisma.task.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(task);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

  const task = await prisma.task.update({
    where: {
      id: Number(id),
    },
    data: body,
  });

  return NextResponse.json(task);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.task.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    success: true,
  });
}