import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch orders",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.customerId || !body.amount) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer and Amount are required",
        },
        {
          status: 400,
        }
      );
    }

    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`,
        customerId: Number(body.customerId),
        amount: Number(body.amount),
        paymentStatus: "Pending",
        orderStatus: "New",
        notes: body.notes || null,
      },
      include: {
        customer: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: order,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create order",
      },
      {
        status: 500,
      }
    );
  }
}