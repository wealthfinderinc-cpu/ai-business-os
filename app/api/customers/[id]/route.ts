import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch customer",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const customer =
      await prisma.customer.update({
        where: {
          id: Number(id),
        },
        data: {
          fullName: body.fullName,
          mobile: body.mobile,
          email: body.email || null,
          city: body.city || null,
          state: body.state || null,
          address: body.address || null,
          active: body.active,
        },
      });

    return NextResponse.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update customer",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const customer =
      await prisma.customer.update({
        where: {
          id: Number(id),
        },
        data: body,
      });

    return NextResponse.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update customer",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.customer.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete customer",
      },
      {
        status: 500,
      }
    );
  }
}