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

    const followUps = await prisma.followUp.findMany({
      where: {
        leadId: Number(id),
      },
      orderBy: {
        followUpAt: "asc",
      },
    });

    return NextResponse.json(followUps);
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

    const followUp = await prisma.followUp.create({
      data: {
        leadId: Number(id),
        title: body.title,
        description: body.description || null,
        followUpAt: new Date(body.followUpAt),
      },
    });

    return NextResponse.json({
      success: true,
      data: followUp,
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

export async function PATCH(
  request: NextRequest,
  { params }: Context
) {
  try {
    const body = await request.json();

    const followUp = await prisma.followUp.update({
      where: {
        id: body.id,
      },
      data: {
        completed: body.completed,
      },
    });

    return NextResponse.json({
      success: true,
      data: followUp,
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

export async function DELETE(
  request: NextRequest
) {
  try {
    const body = await request.json();

    await prisma.followUp.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json({
      success: true,
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