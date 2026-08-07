import { api } from '@/lib/api';
import { StockItem, Warehouse, Transfer, Purchase, Supplier } from '@/types/inventory';

export const InventoryService = {
  async listStock(): Promise<StockItem[]> { return api.get('/inventory/stock'); },
  async createStock(data: Partial<StockItem>) { return api.post('/inventory/stock', data); },
  async updateStock(id: string, data: Partial<StockItem>) { return api.put(`/inventory/stock/${id}`, data); },

  async listWarehouses(): Promise<Warehouse[]> { return api.get('/inventory/warehouses'); },
  async createWarehouse(data: Partial<Warehouse>) { return api.post('/inventory/warehouses', data); },

  async listTransfers(): Promise<Transfer[]> { return api.get('/inventory/transfers'); },
  async createTransfer(data: Partial<Transfer>) { return api.post('/inventory/transfers', data); },

  async listPurchases(): Promise<Purchase[]> { return api.get('/inventory/purchases'); },
  async createPurchase(data: Partial<Purchase>) { return api.post('/inventory/purchases', data); },

  async listSuppliers(): Promise<Supplier[]> { return api.get('/inventory/suppliers'); },
  async createSupplier(data: Partial<Supplier>) { return api.post('/inventory/suppliers', data); },

  async lowStock(): Promise<StockItem[]> { return api.get('/inventory/alerts/low-stock'); },

  async reports(): Promise<any> { return api.get('/inventory/reports'); },

  async export(type: string, params?: Record<string,string>) { return api.post(`/inventory/export/${type}`, params || {}); }
};
