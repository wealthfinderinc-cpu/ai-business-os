import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error("GET Customers:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch customers",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    if (!body.fullName || !body.mobile) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Full Name and Mobile are required.",
        },
        {
          status: 400,
        }
      );
    }

    const customer =
      await prisma.customer.create({
        data: {
          customerId:
            body.customerId ??
            `CUS${Date.now()}`,

          fullName: body.fullName,

          mobile: body.mobile,

          email: body.email || null,

          city: body.city || null,

          state: body.state || null,

          address:
            body.address || null,

          active: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: customer,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST Customer:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to create customer.",
      },
      {
        status: 500,
      }
    );
  }
}