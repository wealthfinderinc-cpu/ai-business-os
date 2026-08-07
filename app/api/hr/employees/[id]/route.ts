import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const employee = await prisma.employee.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      department: true,
    },
  });

  return NextResponse.json(employee);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

  const employee = await prisma.employee.update({
    where: {
      id: Number(id),
    },
    data: body,
  });

  return NextResponse.json(employee);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.employee.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    success: true,
  });
}