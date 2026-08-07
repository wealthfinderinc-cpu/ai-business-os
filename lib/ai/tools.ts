import { prisma } from "@/lib/prisma";

export const aiTools = {

  async getDashboardSummary() {

    const [

      customers,

      leads,

      products,

      orders,

      employees,

      expenses,

    ] = await Promise.all([

      prisma.customer.count(),

      prisma.lead.count(),

      prisma.product.count(),

      prisma.order.count(),

      prisma.employee.count(),

      prisma.expense.aggregate({

        _sum: {
          amount: true,
        },

      }),

    ]);

    return {

      customers,

      leads,

      products,

      orders,

      employees,

      totalExpense:
        expenses._sum.amount ?? 0,

    };

  },

  async searchCustomers(
    keyword: string
  ) {

    return prisma.customer.findMany({

      where: {

        OR: [

          {

            fullName: {

              contains: keyword,

              mode: "insensitive",

            },

          },

          {

            mobile: {

              contains: keyword,

            },

          },

          {

            email: {

              contains: keyword,

              mode: "insensitive",

            },

          },

        ],

      },

      take: 20,

    });

  },

  async searchLeads(
    keyword: string
  ) {

    return prisma.lead.findMany({

      where: {

        OR: [

          {

            fullName: {

              contains: keyword,

              mode: "insensitive",

            },

          },

          {

            mobile: {

              contains: keyword,

            },

          },

        ],

      },

      take: 20,

    });

  },

  async searchProducts(
    keyword: string
  ) {

    return prisma.product.findMany({

      where: {

        OR: [

          {

            name: {

              contains: keyword,

              mode: "insensitive",

            },

          },

          {

            productCode: {

              contains: keyword,

            },

          },

        ],

      },

      take: 20,

    });

  },

  async lowStockProducts() {

    return prisma.inventory.findMany({

      where: {

        quantity: {

          lte: 10,

        },

      },

      include: {

        product: true,

      },

    });

  },import { prisma } from "@/lib/prisma";

export const aiTools = {

  async getDashboardSummary() {

    const [

      customers,

      leads,

      products,

      orders,

      employees,

      expenses,

    ] = await Promise.all([

      prisma.customer.count(),

      prisma.lead.count(),

      prisma.product.count(),

      prisma.order.count(),

      prisma.employee.count(),

      prisma.expense.aggregate({

        _sum: {
          amount: true,
        },

      }),

    ]);

    return {

      customers,

      leads,

      products,

      orders,

      employees,

      totalExpense:
        expenses._sum.amount ?? 0,

    };

  },

  async searchCustomers(
    keyword: string
  ) {

    return prisma.customer.findMany({

      where: {

        OR: [

          {

            fullName: {

              contains: keyword,

              mode: "insensitive",

            },

          },

          {

            mobile: {

              contains: keyword,

            },

          },

          {

            email: {

              contains: keyword,

              mode: "insensitive",

            },

          },

        ],

      },

      take: 20,

    });

  },

  async searchLeads(
    keyword: string
  ) {

    return prisma.lead.findMany({

      where: {

        OR: [

          {

            fullName: {

              contains: keyword,

              mode: "insensitive",

            },

          },

          {

            mobile: {

              contains: keyword,

            },

          },

        ],

      },

      take: 20,

    });

  },

  async searchProducts(
    keyword: string
  ) {

    return prisma.product.findMany({

      where: {

        OR: [

          {

            name: {

              contains: keyword,

              mode: "insensitive",

            },

          },

          {

            productCode: {

              contains: keyword,

            },

          },

        ],

      },

      take: 20,

    });

  },

  async lowStockProducts() {

    return prisma.inventory.findMany({

      where: {

        quantity: {

          lte: 10,

        },

      },

      include: {

        product: true,

      },

    });

  },  async getRevenueSummary() {

    const orders =
      await prisma.order.aggregate({

        _sum: {
          totalAmount: true,
        },

        _count: {
          id: true,
        },

      });

    return {

      totalRevenue:
        orders._sum.totalAmount ?? 0,

      totalOrders:
        orders._count.id,

    };

  },

  async getExpenseSummary() {

    const expenses =
      await prisma.expense.aggregate({

        _sum: {
          amount: true,
        },

      });

    return {

      totalExpense:
        expenses._sum.amount ?? 0,

    };

  },

  async getProfitSummary() {

    const [

      revenue,

      expense,

    ] = await Promise.all([

      prisma.order.aggregate({

        _sum: {
          totalAmount: true,
        },

      }),

      prisma.expense.aggregate({

        _sum: {
          amount: true,
        },

      }),

    ]);

    const totalRevenue =
      revenue._sum.totalAmount ?? 0;

    const totalExpense =
      expense._sum.amount ?? 0;

    return {

      revenue: totalRevenue,

      expense: totalExpense,

      profit:
        totalRevenue -
        totalExpense,

    };

  },

  async searchEmployees(
    keyword: string
  ) {

    return prisma.employee.findMany({

      where: {

        OR: [

          {

            fullName: {

              contains: keyword,

              mode: "insensitive",

            },

          },

          {

            employeeCode: {

              contains: keyword,

            },

          },

          {

            email: {

              contains: keyword,

              mode: "insensitive",

            },

          },

        ],

      },

      take: 20,

    });

  },

  async recentOrders() {

    return prisma.order.findMany({

      orderBy: {

        createdAt: "desc",

      },

      take: 10,

      include: {

        customer: true,

      },

    });

  },

  async topCustomers() {

    return prisma.customer.findMany({

      take: 10,

      orderBy: {

        createdAt: "desc",

      },

      include: {

        orders: true,

      },

    });

  },

  async inventoryValue() {

    const items =
      await prisma.inventory.findMany({

        include: {

          product: true,

        },

      });

    return items.reduce(

      (sum, item) =>

        sum +
        item.quantity *
        item.product.price,

      0

    );

  },