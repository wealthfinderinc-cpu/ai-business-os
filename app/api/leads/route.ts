import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LeadStatus } from "@prisma/client";

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        assignedTo: true,
        customer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: leads,
    });
  } catch (error) {
    console.error("GET Leads Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch leads",
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

    if (!body.fullName || !body.mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Full Name and Mobile are required.",
        },
        {
          status: 400,
        }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        leadId: `LD-${Date.now()}`,

        fullName: body.fullName.trim(),

        mobile: body.mobile.trim(),

        email: body.email?.trim() || null,

        city: body.city?.trim() || null,

        source: body.source?.trim() || null,

        remarks: body.remarks?.trim() || null,

        status: LeadStatus.NEW,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Lead created successfully.",
        data: lead,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST Lead Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save lead.",
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const lead = await prisma.lead.update({
      where: {
        id: body.id,
      },
      data: {
        fullName: body.fullName,
        mobile: body.mobile,
        email: body.email || null,
        city: body.city || null,
        source: body.source || null,
        remarks: body.remarks || null,
        status: body.status || LeadStatus.NEW,
      },
    });

    return NextResponse.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error("PUT Lead Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update lead.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const id = Number(searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.lead.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Lead deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE Lead Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete lead.",
      },
      {
        status: 500,
      }
    );
  }
}