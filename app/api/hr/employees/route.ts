import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        department: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(employees);
  } catch {
    return NextResponse.json(
      { message: "Unable to fetch employees" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const employee = await prisma.employee.create({
      data: body,
    });

    return NextResponse.json(employee);
  } catch {
    return NextResponse.json(
      { message: "Unable to create employee" },
      { status: 500 }
    );
  }
}