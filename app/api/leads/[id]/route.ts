import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LeadStatus } from "@prisma/client";

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

    const lead = await prisma.lead.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        customer: true,
        assignedTo: true,
        followUps: true,
        notes: true,
      },
    });

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch lead",
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
    const { id } = await params;

    const body = await request.json();

    const lead = await prisma.lead.update({
      where: {
        id: Number(id),
      },
      data: {
        fullName: body.fullName,
        mobile: body.mobile,
        email: body.email || null,
        city: body.city || null,
        source: body.source || null,
        remarks: body.remarks || null,
        status: (body.status as LeadStatus) || LeadStatus.NEW,
      },
    });

    return NextResponse.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update lead",
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

    await prisma.lead.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete lead",
      },
      {
        status: 500,
      }
    );
  }
}