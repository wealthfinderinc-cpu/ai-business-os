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

    const order = await prisma.order.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        customer: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(order);
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

export async function PUT(
  request: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const order = await prisma.order.update({
      where: {
        id: Number(id),
      },
      data: {
        amount: Number(body.amount),
        paymentStatus: body.paymentStatus,
        orderStatus: body.orderStatus,
        notes: body.notes || null,
      },
      include: {
        customer: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: order,
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
  request: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    await prisma.order.delete({
      where: {
        id: Number(id),
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