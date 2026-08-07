export interface StockItem {
  id: string;
  sku: string;
  name: string;
  description?: string | null;
  warehouseId?: string | null;
  quantity: number;
  reorderLevel?: number;
  barcode?: string | null;
  qr?: string | null;
  createdAt?: string;
}

export interface Warehouse {
  id: string;
  name: string;
  address?: string | null;
  contact?: string | null;
  createdAt?: string;
}

export interface Transfer {
  id: string;
  fromWarehouseId: string;
  toWarehouseId: string;
  items: { stockId: string; qty: number }[];
  status?: 'pending' | 'in-transit' | 'completed' | 'cancelled';
  createdAt?: string;
}

export interface Purchase {
  id: string;
  supplierId?: string | null;
  items: { stockId: string; qty: number; price?: number }[];
  total?: number;
  status?: 'draft' | 'ordered' | 'received' | 'cancelled';
  createdAt?: string;
}

export interface Supplier {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  createdAt?: string;
}
