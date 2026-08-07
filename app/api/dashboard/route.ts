import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    const [
      totalLeads,
      todayLeads,
      contacted,
      followUp,
      qualified,
      converted,
      lost,
      todayFollowUps,
      overdueFollowUps,
    ] = await Promise.all([
      prisma.lead.count(),

      prisma.lead.count({
        where: {
          createdAt: {
            gte: today,
            lt: tomorrow,
          },
        },
      }),

      prisma.lead.count({
        where: {
          status: "Contacted",
        },
      }),

      prisma.lead.count({
        where: {
          status: "Follow Up",
        },
      }),

      prisma.lead.count({
        where: {
          status: "Qualified",
        },
      }),

      prisma.lead.count({
        where: {
          status: "Converted",
        },
      }),

      prisma.lead.count({
        where: {
          status: "Lost",
        },
      }),

      prisma.followUp.count({
        where: {
          completed: false,
          followUpAt: {
            gte: today,
            lt: tomorrow,
          },
        },
      }),

      prisma.followUp.count({
        where: {
          completed: false,
          followUpAt: {
            lt: today,
          },
        },
      }),
    ]);

    return NextResponse.json({
      totalLeads,
      todayLeads,
      contacted,
      followUp,
      qualified,
      converted,
      lost,
      todayFollowUps,
      overdueFollowUps,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Dashboard API Error",
      },
      {
        status: 500,
      }
    );
  }
}