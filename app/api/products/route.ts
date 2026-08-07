import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch products",
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

    if (
      !body.name ||
      !body.productCode
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Product Name and Product Code are required.",
        },
        {
          status: 400,
        }
      );
    }

    const product =
      await prisma.product.create({
        data: {
          productCode:
            body.productCode,

          name: body.name,

          category:
            body.category,

          brand:
            body.brand || null,

          description:
            body.description ||
            null,

          mrp: Number(body.mrp),

          dp: Number(body.dp),

          gst:
            Number(body.gst) || 18,

          stock:
            Number(body.stock) ||
            0,

          minStock:
            Number(
              body.minStock
            ) || 10,

          image:
            body.image || null,

          active: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: product,
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
        message:
          "Unable to create product.",
      },
      {
        status: 500,
      }
    );
  }
}