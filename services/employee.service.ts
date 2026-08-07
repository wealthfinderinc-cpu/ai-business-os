export const EmployeeService = {
  getAll: async () => {
    return [] as any[];
  },
  getById: async (id: number) => null,
  create: async (data: any) => data,
  update: async (id: number, data: any) => data,
  delete: async (id: number) => null,
};

export default EmployeeService;
