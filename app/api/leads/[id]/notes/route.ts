import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    const notes = await prisma.leadNote.findMany({
      where: {
        leadId: Number(id),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notes);
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

export async function POST(
  request: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const note = await prisma.leadNote.create({
      data: {
        leadId: Number(id),
        note: body.note,
      },
    });

    return NextResponse.json({
      success: true,
      data: note,
    });
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