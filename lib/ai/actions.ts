import { prisma } from "@/lib/prisma";

export const aiActions = {

  async createCustomer(data: {

    fullName: string;

    mobile: string;

    email?: string;

    city?: string;

    state?: string;

    address?: string;

  }) {

    return prisma.customer.create({

      data,

    });

  },

  async createLead(data: {

    fullName: string;

    mobile: string;

    email?: string;

    source?: string;

    status?: string;

  }) {

    return prisma.lead.create({

      data,

    });

  },

  async createTask(data: {

    title: string;

    description?: string;

    dueDate?: Date;

    assignedToId?: number;

  }) {

    return prisma.task.create({

      data,

    });

  },

  async createFollowUp(data: {

    customerId: number;

    notes: string;

    followUpDate: Date;

  }) {

    return prisma.followUp.create({

      data,

    });

  },

  async updateCustomerStatus(

    customerId: number,

    status: string

  ) {

    return prisma.customer.update({

      where: {

        id: customerId,

      },

      data: {

        status,

      },

    });

  },

  async assignLead(

    leadId: number,

    employeeId: number

  ) {

    return prisma.lead.update({

      where: {

        id: leadId,

      },

      data: {

        assignedToId: employeeId,

      },

    });

  },  async createOrder(data: {

    customerId: number;

    totalAmount: number;

    status?: string;

  }) {

    return prisma.order.create({

      data: {

        customerId: data.customerId,

        totalAmount: data.totalAmount,

        status: data.status ?? "PENDING",

      },

    });

  },

  async createInvoice(data: {

    orderId: number;

    invoiceNumber: string;

    amount: number;

  }) {

    return prisma.invoice.create({

      data,

    });

  },

  async scheduleMeeting(data: {

    title: string;

    meetingDate: Date;

    customerId?: number;

    employeeId?: number;

    notes?: string;

  }) {

    return prisma.meeting.create({

      data,

    });

  },

  async createReminder(data: {

    title: string;

    reminderDate: Date;

    description?: string;

  }) {

    return prisma.reminder.create({

      data,

    });

  },

  async updateInventory(

    inventoryId: number,

    quantity: number

  ) {

    return prisma.inventory.update({

      where: {

        id: inventoryId,

      },

      data: {

        quantity,

      },

    });

  },

  async closeLead(

    leadId: number

  ) {

    return prisma.lead.update({

      where: {

        id: leadId,

      },

      data: {

        status: "CLOSED",

      },

    });

  },

  async convertLeadToCustomer(

    leadId: number

  ) {

    const lead =
      await prisma.lead.findUnique({

        where: {

          id: leadId,

        },

      });

    if (!lead) {

      throw new Error(
        "Lead not found."
      );

    }

    const customer =
      await prisma.customer.create({

        data: {

          fullName: lead.fullName,

          mobile: lead.mobile,

          email: lead.email,

        },

      });

    await prisma.lead.update({

      where: {

        id: leadId,

      },

      data: {

        status: "CONVERTED",

      },

    });

    return customer;

  },

  async deleteCustomer(

    customerId: number

  ) {

    return prisma.customer.delete({

      where: {

        id: customerId,

      },

    });

  },

  async deleteLead(

    leadId: number

  ) {

    return prisma.lead.delete({

      where: {

        id: leadId,

      },

    });

  },};

export type AIActionName =
  keyof typeof aiActions;

export async function executeAction(
  action: AIActionName,
  args?: any
) {

  switch (action) {

    case "createCustomer":

      return aiActions.createCustomer(
        args
      );

    case "createLead":

      return aiActions.createLead(
        args
      );

    case "createTask":

      return aiActions.createTask(
        args
      );

    case "createFollowUp":

      return aiActions.createFollowUp(
        args
      );

    case "updateCustomerStatus":

      return aiActions.updateCustomerStatus(
        args.customerId,
        args.status
      );

    case "assignLead":

      return aiActions.assignLead(
        args.leadId,
        args.employeeId
      );

    case "createOrder":

      return aiActions.createOrder(
        args
      );

    case "createInvoice":

      return aiActions.createInvoice(
        args
      );

    case "scheduleMeeting":

      return aiActions.scheduleMeeting(
        args
      );

    case "createReminder":

      return aiActions.createReminder(
        args
      );

    case "updateInventory":

      return aiActions.updateInventory(
        args.inventoryId,
        args.quantity
      );

    case "closeLead":

      return aiActions.closeLead(
        args.leadId
      );

    case "convertLeadToCustomer":

      return aiActions.convertLeadToCustomer(
        args.leadId
      );

    case "deleteCustomer":

      return aiActions.deleteCustomer(
        args.customerId
      );

    case "deleteLead":

      return aiActions.deleteLead(
        args.leadId
      );

    default:

      throw new Error(
        `Unknown AI Action: ${action}`
      );

  }

}

export const aiActionDefinitions = [

  {
    name: "createCustomer",
    description: "Create a new customer."
  },

  {
    name: "createLead",
    description: "Create a new lead."
  },

  {
    name: "createTask",
    description: "Create a task."
  },

  {
    name: "createFollowUp",
    description: "Create a follow-up."
  },

  {
    name: "updateCustomerStatus",
    description: "Update customer status."
  },

  {
    name: "assignLead",
    description: "Assign a lead to an employee."
  },

  {
    name: "createOrder",
    description: "Create a sales order."
  },

  {
    name: "createInvoice",
    description: "Generate an invoice."
  },

  {
    name: "scheduleMeeting",
    description: "Schedule a meeting."
  },

  {
    name: "createReminder",
    description: "Create a reminder."
  },

  {
    name: "updateInventory",
    description: "Update inventory quantity."
  },

  {
    name: "closeLead",
    description: "Close an existing lead."
  },

  {
    name: "convertLeadToCustomer",
    description: "Convert a lead into a customer."
  },

  {
    name: "deleteCustomer",
    description: "Delete a customer."
  },

  {
    name: "deleteLead",
    description: "Delete a lead."
  },

];